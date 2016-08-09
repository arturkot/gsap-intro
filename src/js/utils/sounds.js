import _find from 'lodash/collection/find';
import _findIndex from 'lodash/array/findIndex';
import { Howl, Howler } from 'howler';
import Promise from 'promise-polyfill';

let progressedCount = 0;
let isPlaying = false;
const items = [];
const placedItems = [];
const callbacks = [];

// It _should_ deal with the distorted sounds issue on iOS
// https://github.com/goldfire/howler.js/issues/434
Howler.unload();

export default {
  onLoad, getSound, items, addSound, resumeAll, pauseAll, placeSound,
  finishSound,
  allReady: () => new Promise.all( items.map( item => item.promise ) )
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

function pauseAll () {
  isPlaying = false;

  items.forEach( item => item.sound.pause() );
}

function resumeAll (timeline) {
  isPlaying = true;

  placedItems.forEach( placedItem => {
    const { name, startTime, endTime } = placedItem;
    const item = _find(items, { name });
    const currentTime = timeline.time();

    if (currentTime >= startTime && currentTime <= endTime) {
      item.sound
        .volume(1)
        .seek(currentTime - startTime)
        .play();
    } else {
      item.sound.pause();
    }
  });
}

function placeSound (name, tl, label) {
  const item = _find(items, { name });
  const sound = item.sound;

  if (isPlaying) {
    sound.play();
  }

  if ( placedItems.some( checkIfPlaced.bind(null, name, label) ) ) {
    return;
  }

  const duration = sound.duration();
  const startTime = tl.startTime() + tl.getLabelTime(label);
  const endTime =  duration + startTime;

  placedItems.push({
    name,
    label,
    startTime,
    endTime,
    duration
  });
}

function finishSound (name, tl, startLabel, finishLabel, duration = 0) {
  const item = _find(items, { name });
  const sound = item.sound;

  if (duration && isPlaying) {
    sound.fade(sound.volume(), 0, duration);
  } else if (isPlaying) {
    sound.pause();
  }

  if ( placedItems.some( checkIfTruncated.bind(null, name, startLabel) ) ) {
    return;
  }

  const index = _findIndex(placedItems, { name, label: startLabel });
  const placedItem =  placedItems[index];
  const endTime = tl.startTime() + tl.getLabelTime(finishLabel);

  placedItem.isTruncated = true;
  placedItem.endTime = endTime;
}

function checkIfPlaced (name, label, item) {
  return item.name === name && item.label === label;
}

function checkIfTruncated (name, label, item) {
  return item.name === name && item.label === label && item.isTruncated;
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
