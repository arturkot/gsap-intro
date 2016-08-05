"use strict";

import { Power3 } from 'gsap/src/uncompressed/easing/EasePack';
import 'gsap/src/uncompressed/TweenMax';
import _random from 'lodash/number/random';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import { room, tower, cloudsGroup, earthClouds } from '_root/scenes/objects';
import { SCENE_CX, SCENE_CY } from '_root/scenes/const';

const tl = new TimelineMax();
const cloudsParticles = cloudsGroup.querySelectorAll('.particle');
const cloudAnimations = [];

Array.from(cloudsParticles).forEach( (cloud, index) => {
  const cloudAnimation = new TimelineMax()
    .fromTo(cloud, _random(2, 4, true), {
      transformOrigin: '50% 50%',
      x: SCENE_CX - _random(-SCENE_CX, SCENE_CX),
      y: SCENE_CY - _random(-SCENE_CY, SCENE_CY),
      opacity: 1,
      scale: 0
    }, {
      scale: 30,
      opacity: 0
    }, index / 10);

  cloudAnimations.push(cloudAnimation);
});

tl
  .add('sceneStart')

  .fromTo(cloudsGroup, 0.5, {
    opacity: 0
  }, {
    opacity: 1
  }, 'sceneStart')

  .fromTo(earthClouds, 2, {
    opacity: 1
  }, {
    opacity: 0
  }, 'sceneStart')

  .fromTo(tower, 5, {
    transformOrigin: '51% 50%',
    scale: 0
  }, {
    transformOrigin: '51% 24.5%',
    scale: 40,
    ease: Power3.easeIn
  }, 'sceneStart+=2')

  .fromTo(room, 5, {
    transformOrigin: '51% 46%',
    scale: 0
  }, {
    transformOrigin: '51% 38%',
    scale: 2,
    ease: Power3.easeIn
  }, 'sceneStart+=2')

  .add(cloudAnimations, 'sceneStart');

export default tl;
