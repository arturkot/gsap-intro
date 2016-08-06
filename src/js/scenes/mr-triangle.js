"use strict";

import "MorphSVGPlugin";
import Sounds from '_root/setup/sounds';
import { Power1, Elastic, Bounce } from 'gsap/src/uncompressed/easing/EasePack';
import 'gsap/src/uncompressed/TweenMax';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import { mrTriangleAll } from '_root/scenes/objects';

const tl = new TimelineMax();
const hummingSound = Sounds.getSound('humming');
const musicSound = Sounds.getSound('music');
const buttonSound = Sounds.getSound('button');

tl
  .add('sceneStart')

  .to(mrTriangleAll.body, 0.2, {
    y: 10
  }, 'sceneStart')

  .to(mrTriangleAll.handLeft1, 0.2, {
    transformOrigin: '0% 15%',
    rotation: -15
  }, 'sceneStart')

  .to(mrTriangleAll.handRight, 0.2, {
    transformOrigin: '100% 15%',
    rotation: 15
  }, 'sceneStart')

  .add('jumpUp')

  .to(mrTriangleAll.body, 1, {
    y: 0,
    ease: Elastic.easeOut.config(1, 0.3)
  }, 'jumpUp')

  .to([mrTriangleAll.handLeft1, mrTriangleAll.handRight], 0.8, {
    rotation: 0,
    ease: Elastic.easeOut.config(1, 0.3)
  }, 'jumpUp')

  .set(mrTriangleAll.eyesClosed, {
    opacity: 0
  }, 'jumpUp+=0.3')

  .set(mrTriangleAll.eyesOpened, {
    opacity: 1
  }, 'jumpUp+=0.3')

  .add('openHat')

  .to(mrTriangleAll.hat, 1, {
    transformOrigin: '0 100%',
    rotation: -105,
    ease: Bounce.easeOut
  }, 'openHat')

  .to(mrTriangleAll.irises, 1, {
    y: -5
  }, 'openHat')

  .to([mrTriangleAll.mouth, mrTriangleAll.eyes], 1, {
    y: -3
  }, 'openHat')

  .to(mrTriangleAll.irises, 0.2, {
    y: 0
  }, 'openHat+=1')

  .to([mrTriangleAll.mouth, mrTriangleAll.eyes], 0.2, {
    y: 0
  }, 'openHat+=1')

  .add('blink')

  .set(mrTriangleAll.eyesOpened, {
    opacity: 0
  }, 'blink')

  .set(mrTriangleAll.eyesClosed, {
    opacity: 1
  }, 'blink')

  .set(mrTriangleAll.eyesOpened, {
    opacity: 1
  }, 'blink+=0.2')

  .set(mrTriangleAll.eyesClosed, {
    opacity: 0
  }, 'blink+=0.2')

  .to(mrTriangleAll.handLeft1, 0.5, {
    morphSVG: mrTriangleAll.handLeft2,
    ease: Power1.easeIn
  })

  .to(mrTriangleAll.handLeft1, 0.3, {
    morphSVG: mrTriangleAll.handLeft3,
    ease: Power1.easeOut
  })

  .add( () => musicSound.fade(1, 0, 500) )
  .add( () => buttonSound.play(), '-=0.2' )

  .to(mrTriangleAll.button, 0.2, {
    y: 5
  }, '-=0.1')

  .add('gettingWeird')

  .to(mrTriangleAll.eyesActive, 0.2, {
    opacity: 1
  }, 'gettingWeird')

  .to(mrTriangleAll.mouth, 0.5, {
    morphSVG: mrTriangleAll.mouth2
  }, 'gettingWeird')

  .fromTo(mrTriangleAll.saliva, 2, {
    opacity: 0,
    scaleY: 0
  }, {
    opacity: 1,
    scaleY: 1
  }, 'gettingWeird+=0.5')

  .add('cover', '+=0.4')

  .add( () => hummingSound.play(), 'cover' )

  .to(mrTriangleAll.shadow, 0.3, {
    opacity: 0,
    ease: Power1.easeIn
  }, 'cover')

  .to(mrTriangleAll.eyesActive.querySelectorAll('circle'), 1, {
    transformOrigin: '50% 50%',
    scale: 100,
    ease: Power1.easeIn
  }, 'cover');

export default tl;
