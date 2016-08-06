"use strict";

import 'gsap/src/uncompressed/TweenMax';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import { mrTriangleAll } from '_root/scenes/objects';

const tl = new TimelineMax();

tl
  .add('sceneStart')

  .set(
    [
      mrTriangleAll.handLeft2,
      mrTriangleAll.handLeft3,
      mrTriangleAll.eyesOpened,
      mrTriangleAll.eyesActive,
      mrTriangleAll.mouth2,
      mrTriangleAll.saliva
    ], {
    opacity: 0
  });

export default tl;
