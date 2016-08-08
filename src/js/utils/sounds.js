import _find from 'lodash/collection/find';
import { Howl, Howler } from 'howler';
import Promise from 'promise-polyfill';

let progressedCount = 0;
const items = [];
const callbacks = [];

// It _should_ deal with the distorted sounds issue on iOS
// https://github.com/goldfire/howler.js/issues/434
Howler.unload();

export default {
  onLoad, getSound, items, addSound, resumeCurrent, pauseCurrent,
  allReady: new Promise.all( items.map( item => item.promise ) )
};

function onLoad (callback) {
  callbacks.push(callback);
}

function getSound (name) {
  return _find(items, { name }).sound;
}

function executeCallbacks () {
  if (!callbacks.length) { return; }
  callbacks.forEach( callback => callback(items, progressedCount) );
}

function resumeCurrent (item) {
  if (item.isPaused) {
    item.sound.play();
    item.isPaused = false;
  }
}

function pauseCurrent (item) {
  if ( item.sound.playing() ) {
    item.sound.pause();
    item.isPaused = true;
  }
}

function addSound (name, fileName) {
  if (!fileName) { fileName = name; }

  const offScreenPaused = false;
  const sound = new Howl({ src: [ `http://${window.BASE_URL}/media/${fileName}.ogg`, `http://${window.BASE_URL}/media/${fileName}.mp3` ] });
  const promise = new Promise( (resolve) => {
    sound.on('load', () => {
      progressedCount += 1;
      executeCallbacks();
      resolve();
    });
  });

  items.push({ name, sound, promise, offScreenPaused });
}
