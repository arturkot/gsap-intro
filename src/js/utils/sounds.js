import _find from 'lodash/collection/find';
import { Howl, Howler } from 'howler';
import Promise from 'promise-polyfill';

let progressedCount = 0;
const items = [];
const callbacks = [];

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    items.forEach( item => {
      if (item.offScreenPaused) {
        item.sound.play();
        item.offScreenPaused = false;
      }
    });
  }

  if (document.visibilityState === 'hidden') {
    items.forEach( item => {
      if (item.sound.playing()) {
        item.sound.pause();
        item.offScreenPaused = true;
      }
    });
  }
});

const onLoad = callback => callbacks.push(callback);

const getSound = (name) => _find(items, { name }).sound;

const executeCallbacks = () => {
  if (!callbacks.length) { return; }
  callbacks.forEach( callback => callback(items, progressedCount) );
};

const addSound = (name, fileName) => {
  if (!fileName) { fileName = name; }

  const offScreenPaused = false;
  const sound = new Howl({ src: [ `http://localhost:3000/media/${fileName}.ogg`, `http://localhost:3000/media/${fileName}.mp3` ] });
  const promise = new Promise( (resolve) => {
    sound.on('load', () => {
      progressedCount += 1;
      executeCallbacks();
      resolve();
    });
  });

  items.push({ name, sound, promise, offScreenPaused });
};

// It _should_ deal with the distorted sounds issue on iOS
// https://github.com/goldfire/howler.js/issues/434
Howler.unload();

export default {
  onLoad, getSound, items, addSound,
  allReady: new Promise.all( items.map( item => item.promise ) )
};
