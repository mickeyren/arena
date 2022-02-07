export default class Sprite extends Phaser.GameObjects.Sprite {
  constructor(scene, settings) {
    super(scene, settings.x, settings.y, settings.key)

    if (settings.prefix) {
      this.createSpriteFromFrames(scene, settings)
    } else {
      this.createSpriteFromAtlas(scene, settings)
    }
  }

  createSpriteFromAtlas(scene, settings) {
    scene.textures.addSpriteSheetFromAtlas(settings.key, {
      atlas: 'sprites',
      frame: settings.frame,
      frameWidth: settings.frameWidth,
      frameHeight: settings.frameHeight,
      endFrame: settings.endFrame
    })

    scene.anims.create({
      key: 'ene1',
      frames: this.anims.generateFrameNumbers(settings.key, {
        start: 0,
        end: 5,
        first: 0
      }),
      frameRate: 15,
      repeat: -1
    })

    const s = scene.add.sprite(settings.x, settings.y, '')
    s.play('ene1')
  }

  createSpriteFromFrames(scene, settings) {
    const sprite = scene.add.sprite(settings.x, settings.y, '')
    const frames = scene.anims.generateFrameNames('sprites', {
      start: 0,
      end: settings.numFrames,
      prefix: settings.prefix,
      suffix: settings.suffix
    })

    scene.anims.create({
      key: settings.key,
      frames: frames,
      frameRate: 8,
      repeat: -1
    })
    sprite.anims.play(settings.key)
  }

  createAnimation(name, startFrame, endFrame) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers('player', {
        start: startFrame,
        end: endFrame
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true
    })
  }
}
