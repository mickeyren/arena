export default class Input {
  scene: Phaser.Scenes.ScenePlugin
  input: Phaser.Input.InputPlugin

  constructor(
    scene: Phaser.Scenes.ScenePlugin,
    input: Phaser.Input.InputPlugin
  ) {
    this.scene = scene
    this.input = input

    this.input.keyboard.on('keydown-I', (event) => {
      this.runScene('InventoryScene')
    })
    this.input.keyboard.on('keydown-ESC', (event) => {
      this.scene.sleep('InventoryScene')
      this.scene.sleep('BattleScene')
    })

    this.input.keyboard.on('keydown-B', (event) => {
      this.runScene('BattleScene')
    })
  }

  runScene(key) {
    if (this.scene.isActive(key)) {
      if (this.scene.isSleeping(key)) {
        this.scene.wake(key)
      } else {
        this.scene.sleep(key)
      }
    } else {
      this.scene.run(key)
    }
  }
}
