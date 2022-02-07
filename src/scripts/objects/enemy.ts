import Sprite from './sprite'

export default class Enemy extends Sprite {
  name: string
  health: number

  constructor(scene, settings) {
    super(scene, settings)
  }
}
