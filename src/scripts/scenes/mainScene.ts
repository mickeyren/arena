import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const map = this.make.tilemap({ key: 'outdoor_map' })
    const tileset = map.addTilesetImage('outdoor', 'outdoor_tileset'); // key: texture key
    map.createLayer('Ground', tileset)
    map.createLayer('Fringe', tileset)

    const player = this.add.sprite(50, 50, 'sprites', 'knight_m_idle_anim_f0.png');
    var frameNames = this.anims.generateFrameNames('sprites', {
      start: 1, end: 4,
      prefix: 'capguy/walk/', suffix: '.png'
    });
    this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
    player.anims.play('walk');


    // zoom and follow
    const camera = this.cameras.main.setBounds(0, 0, 640, 340)
    camera.startFollow(player)
    camera.zoomTo(
      4, //zoom distance
      300 // duration/speed of zoom
    );

    new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(0, 0)
  }

  update() {
    this.fpsText.update()
  }
}
