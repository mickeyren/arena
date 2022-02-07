import Sprite from './sprite'

export default class Player extends Sprite {
  strength: number // increase weapon damage
  intelligence: number // increase spell points, spell damage, access to higher spells
  offence: number // hit chance
  defense: number // def chance
  agility: number // initiative / quickness to attack
  endurance: number // increase in hp, recover fatique
  toughness: number // increase in protection
  counter: number // critical chance?

  constructor(scene, settings) {
    super(scene, settings)

    // starting values
    this.strength = 1
    this.intelligence = 1
    this.offence = 1
    this.defense = 1
    this.agility = 1
    this.endurance = 1
    this.toughness = 1
    this.counter = 1
  }
}
