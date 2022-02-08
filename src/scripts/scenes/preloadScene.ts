export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')

    this.load.image('outdoor_tileset', 'assets/maps/buch-outdoor.png')

    // load the JSON file
    this.load.tilemapTiledJSON(
      'outdoor_map',
      'assets/maps/orthogonal-outside.json'
    )

    this.load.multiatlas('sprites', 'assets/sprites.json', 'assets')

    this.load.image('inventory', 'assets/img/inventory_preset.png')

    this.load.json('enemiesData', 'assets/enemies.json')

    this.load.image('prison_tileset', 'assets/maps/green-dungeon.png')
    this.load.tilemapTiledJSON('prison_map', 'assets/maps/prison.json')

    this.load.image('tiles', 'assets/maps/cloud_tileset.png')
    this.load.tilemapTiledJSON(
      'cloud-city-map',
      'assets/maps/cloud_city_bridge_only.json'
    )
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
