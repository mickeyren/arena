import Arena from '../game'
import GameTextBox from '../objects/textbox'

export default class BattleScene extends Phaser.Scene {
  game: Arena

  constructor() {
    super({ key: 'BattleScene' })
  }

  create() {
    this.game.createEnemy()

    new GameTextBox(this)
  }
}
