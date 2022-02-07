export default class InventoryScene extends Phaser.Scene {
  inventory: Phaser.GameObjects.Sprite

  constructor() {
    super({ key: 'InventoryScene', active: false })
  }

  preload() {
    // this.load.image('inventory', 'assets/img/inventory_preset.png')
  }

  create() {
    let { width, height } = this.sys.game.canvas

    this.inventory = this.add.sprite(width / 2, height / 2, 'inventory')
    this.inventory.setOrigin(0.5, 0.5)
    this.inventory.setScale(1)
    // this.inventory.setDepth(9)
    // this.inventory.setVisible(false)

    const grid = this.add.grid(
      0,
      0,
      this.inventory.displayWidth,
      this.inventory.displayHeight,
      16 * this.inventory.scale,
      16 * this.inventory.scale,
      undefined,
      undefined,
      0x000000
    )
    grid.setOrigin(0.55, 0.45)
    grid.setDepth(10)
    grid.setVisible(false)

    // const centerX =
    //   this.cameras.main.worldView.width / 2 + this.cameras.main.worldView.x
    // const centerY =
    //   this.cameras.main.worldView.height / 2 + this.cameras.main.worldView.y
    //this.inventory.setPosition(centerX, centerY)
    // this.inventory.setVisible(!this.inventory.visible)

    // console.log(this.cameras.main.worldView, centerY, this.inventory.x)
  }
}
