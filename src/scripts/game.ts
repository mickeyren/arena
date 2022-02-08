import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import BattleScene from './scenes/battleScene'
import GridEngine from 'grid-engine'

// Rex Plugins
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import InventoryScene from './scenes/inventoryScene'
import ChatScene from './scenes/chatScene'

const DEFAULT_WIDTH = 375
const DEFAULT_HEIGHT = 812

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene, BattleScene, InventoryScene, ChatScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  },
  pixelArt: true,
  plugins: {
    scene: [
      {
        key: 'gridEngine',
        plugin: GridEngine,
        mapping: 'gridEngine'
      },
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
      }
    ]
  }
}

class Arena extends Phaser.Game {
  constructor(config) {
    super(config)
  }

  createEnemy() {
    console.log(this.cache.json.get('enemiesData'))
  }
}

window.addEventListener('load', () => {
  const game = new Arena(config)
})

export default Arena
