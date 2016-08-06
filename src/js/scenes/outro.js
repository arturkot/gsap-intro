"use strict";

import { Elastic } from 'gsap/src/uncompressed/easing/EasePack';
import SplitText from 'SplitText';
import 'gsap/src/uncompressed/TweenMax';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import { outroText } from '_root/scenes/objects';

const tl = new TimelineMax();
const outroTextLetters = new SplitText(outroText).chars;

tl
  .staggerFromTo(outroTextLetters, 2, {
    transformOrigin: '50% 0',
    rotationX: -90,
    y: -10,
    opacity: 0
  }, {
    rotationX: 0,
    y: 0,
    opacity: 1,
    ease: Elastic.easeOut.config(1, 0.3)
  }, 0.1);

export default tl;
