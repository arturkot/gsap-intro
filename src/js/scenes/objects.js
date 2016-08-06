"use strict";

const $ = document;

export const cloudsGroup = $.querySelector('.clouds-group');
export const space = $.querySelector('.space');
export const earth = space.querySelector('.earth');
export const earthClouds = space.querySelector('.earth-clouds');
export const room = $.querySelector('.room');
export const sky = space.querySelector('.sky');
export const tower = $.querySelector('.tower');
export const mrTriangle = $.querySelector('.mr-triangle');
export const outroText = $.querySelector('.scene__outro-text');
export const mrTriangleAll = {
  body: mrTriangle.querySelector('.body'),
  handRight: mrTriangle.querySelector('.hand-right'),
  handLeft1: mrTriangle.querySelector('.hand-left-1'),
  handLeft2: mrTriangle.querySelector('.hand-left-2'),
  handLeft3: mrTriangle.querySelector('.hand-left-3'),
  mouth: mrTriangle.querySelector('.mouth'),
  mouth2: mrTriangle.querySelector('.mouth-2'),
  saliva: mrTriangle.querySelector('.saliva'),
  eyes: mrTriangle.querySelector('.eyes'),
  eyesClosed: mrTriangle.querySelector('.eyes-closed'),
  eyesOpened: mrTriangle.querySelector('.eyes-opened'),
  eyesActive: mrTriangle.querySelector('.eyes-active'),
  irises: mrTriangle.querySelector('.irises'),
  button: mrTriangle.querySelector('.button'),
  hat: mrTriangle.querySelector('.hat'),
  shadow: mrTriangle.querySelector('.shadow')
};
