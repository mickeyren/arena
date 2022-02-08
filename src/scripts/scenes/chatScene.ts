import Arena from '../game'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'

const COLOR_PRIMARY = 0x4e342e
const COLOR_LIGHT = 0x7b5e57
const COLOR_DARK = 0x260e04

export default class ChatScene extends Phaser.Scene {
  game: Arena
  rexUI: RexUIPlugin

  constructor() {
    super({ key: 'ChatScene' })
  }

  preload() {
    this.load.image('sold1', 'assets/faces/32.png')
    this.load.image('sold2', 'assets/faces/Icons_32.png')
  }

  create() {
    let { width, height } = this.sys.game.canvas

    const leftOffset = 100
    this.rexUI.add
      .roundRectangle(
        0,
        height / 2 + 10 + leftOffset,
        width,
        160,
        10,
        COLOR_DARK
      )
      .setOrigin(0, 0.5)

    const left = this.add.sprite(50, height / 2 + leftOffset, 'sold1')
    left.setDisplaySize(200, 200)

    const text =
      'You, slave. Get up here. I have things for you. You need to get ready for your fight.'

    this.rexUI.add
      .textBox({
        x: 0,
        y: height - 100,

        background: this.rexUI.add.roundRectangle(
          0,
          0,
          width,
          160,
          0, // radius
          COLOR_DARK
        ),

        text: this.rexUI.add.BBCodeText(0, 0, '', {
          fixedWidth: width,
          fixedHeight: 150,
          fontSize: '20px',
          wrap: {
            mode: 'word',
            width: width - 150
          },
          maxLines: 6
        }),
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 25,
          icon: 10,
          text: 10
        }
      })
      .setOrigin(0, 0.5)
      .layout()
      .start(text, 5)

    const right = this.add.sprite(width - 100, height - 115, 'sold2')
    right.setDisplaySize(200, 200)
  }
}
