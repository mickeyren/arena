import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Sprite from '../objects/sprite'
import { GridEngine, Direction } from 'grid-engine'
import GameTextBox from '../objects/textbox'
import Arena from '../game'
import Input from '../input'

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

    const prisonMap = this.make.tilemap({ key: 'prison_map' })
    const prisonTileset = prisonMap.addTilesetImage('prison', 'prison_tileset') // key: texture key

    // prisonMap.createLayer('Walls', prisonTileset)
    // prisonMap.createLayer('Doors', prisonTileset)
    // prisonMap.createLayer('Decors', prisonTileset)
    // prisonMap.createLayer('Floor', prisonTileset)

    const cloudTilemap = this.make.tilemap({ key: 'cloud-city-map' })
    cloudTilemap.addTilesetImage('cloud_tileset', 'tiles')
    for (let i = 0; i < cloudTilemap.layers.length; i++) {
      const layer = cloudTilemap.createLayer(i, 'cloud_tileset', 0, 0)
      layer.scale = 3
    }

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
      frame: 'Punk_run.png',
      frameWidth: 48,
      frameHeight: 48,
      endFrame: 6
    })

    const playerSprite = this.add.sprite(
      80,
      80,
      'sprites',
      'knight_m_idle_anim_f0.png'
    )
    playerSprite.setScale(4)
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
      yoyo: false
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
      yoyo: false
    })

    // zoom and follow
    const camera = this.cameras.main.setBounds(0, 0, 20 * 48, 20 * 48)
    camera.zoomTo(
      1, //zoom distance
      0 // duration/speed of zoom
    )
    camera.startFollow(playerSprite)

    const gridEngineConfig = {
      characters: [
        {
          id: 'player',
          sprite: playerSprite,
          // walkingAnimationMapping: 0,
          startPosition: { x: 5, y: 4 },
          charLayer: 'ground'
        }
      ]
    }
    this.gridEngine = (<any>this).gridEngine
    this.gridEngine.create(cloudTilemap, gridEngineConfig)
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

    new Input(this.scene, this.input)
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
