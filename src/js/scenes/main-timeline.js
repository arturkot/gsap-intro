"use strict";

import 'gsap/src/uncompressed/TweenMax';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import setup from '_root/scenes/setup';
import space from '_root/scenes/space';
import clouds from '_root/scenes/clouds';
import mrTriangle from '_root/scenes/mr-triangle';
import outro from '_root/scenes/outro';

const tl = new TimelineMax();

tl
  .add(setup)
  .add(space)
  .add(clouds, '-=3')
  .add(mrTriangle)
  .add(outro);

tl.pause();

export default tl;
