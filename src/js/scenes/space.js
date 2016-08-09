"use strict";

import Sounds from '_root/setup/sounds';
import { Power1 } from 'gsap/src/uncompressed/easing/EasePack';
import 'gsap/src/uncompressed/TweenMax';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import { sky, earth } from '_root/scenes/objects';

const tl = new TimelineMax();

tl
  .add('sceneStart')

  .add('playMusic')
  .add( () => {
    Sounds.placeSound('music', tl, 'playMusic');
  }, 'playMusic' )

  .to(sky, 5, {
    transformOrigin: '50% 50%',
    scale: 2,
    ease: Power1.easeIn
  }, 'sceneStart')

  .to(earth, 5, {
    transformOrigin: `50% 50%`,
    scale: 300,
    ease: Power1.easeIn
  }, 'sceneStart');

export default tl;
