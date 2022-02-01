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
