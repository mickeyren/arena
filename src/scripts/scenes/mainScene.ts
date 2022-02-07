import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Sprite from '../objects/sprite'
import { GridEngine, Direction } from 'grid-engine'
import GameTextBox from '../objects/textbox'
import Arena from '../game'

export default class MainScene extends Phaser.Scene {
  fpsText
  private gridEngine: GridEngine

  game: Arena

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const map = this.make.tilemap({ key: 'outdoor_map' })
    const tileset = map.addTilesetImage('outdoor', 'outdoor_tileset') // key: texture key
    map.createLayer('Ground', tileset)
    map.createLayer('Fringe', tileset)

    const gameWidth = this.sys.game.canvas.width
    const gameHeight = this.sys.game.canvas.height

    const player = new Sprite(this, {
      x: 150,
      y: 50,
      numFrames: 3,
      key: 'player',
      prefix: 'knight_m_idle_anim_f',
      suffix: '.png'
    })
    player.setScale(0.5)

    new Sprite(this, {
      x: 100,
      y: 50,
      key: 'gob',
      frame: 'WarriorDownIdle.png',
      frameWidth: 48,
      frameHeight: 48,
      endFrame: 5
    })

    const playerSprite = this.add.sprite(
      80,
      80,
      'sprites',
      'knight_m_idle_anim_f0.png'
    )
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('sprites', {
        start: 0,
        end: 3,
        prefix: 'knight_m_idle_anim_f',
        suffix: '.png'
      }),
      frameRate: 8,
      repeat: -1,
      yoyo: true
    })
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('sprites', {
        start: 0,
        end: 3,
        prefix: 'knight_m_run_anim_f',
        suffix: '.png'
      }),
      frameRate: 20,
      repeat: -1,
      yoyo: true
    })

    // zoom and follow
    const camera = this.cameras.main.setBounds(0, 0, 640, 340)
    camera.zoomTo(
      2, //zoom distance
      0 // duration/speed of zoom
    )
    camera.startFollow(playerSprite)

    const gridEngineConfig = {
      characters: [
        {
          id: 'player',
          sprite: playerSprite,
          // walkingAnimationMapping: 0,
          startPosition: { x: 8, y: 8 },
          charLayer: 'Ground'
        }
      ]
    }

    this.gridEngine = (<any>this).gridEngine
    this.gridEngine.create(map, gridEngineConfig)
    // this.gridEngine.moveTo('player', new Phaser.Math.Vector2(15, 20));
    this.gridEngine.movementStarted().subscribe(({ direction }) => {
      playerSprite.anims.play('run')
    })

    this.gridEngine.movementStopped().subscribe(({ direction }) => {
      playerSprite.anims.stop()
      playerSprite.anims.play('idle')
      // playerSprite.setFrame(this.getStopFrame(direction));
    })

    this.gridEngine.directionChanged().subscribe(({ direction }) => {
      // playerSprite.setFrame(this.getStopFrame(direction));
    })

    // new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(0, 0)

    this.input.keyboard.on('keydown-I', (event) => {
      this.scene.launch('InventoryScene')
    })
    this.input.keyboard.on('keydown-ESC', (event) => {
      this.scene.sleep('InventoryScene')
      this.scene.sleep('BattleScene')
    })

    this.input.keyboard.on('keydown-B', (event) => {
      this.scene.launch('BattleScene')
    })
  }

  getStopFrame(direction) {
    return 1
    // switch (direction) {
    //   case "up":
    //     return 91;
    //   case "right":
    //     return 79;
    //   case "down":
    //     return 55;
    //   case "left":
    //     return 67;
    // }
  }

  update() {
    this.fpsText.update()

    const cursors = this.input.keyboard.createCursorKeys()
    if (cursors.left.isDown) {
      this.gridEngine.move('player', Direction.LEFT)
    } else if (cursors.right.isDown) {
      this.gridEngine.move('player', Direction.RIGHT)
    } else if (cursors.up.isDown) {
      this.gridEngine.move('player', Direction.UP)
    } else if (cursors.down.isDown) {
      this.gridEngine.move('player', Direction.DOWN)
    }
  }
}
