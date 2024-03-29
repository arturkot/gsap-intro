import Sounds from '_root/utils/sounds';

export default function(timeline) {
  const bodyEl = document.querySelector('body');
  const timelineControlEl = document.createElement('input');
  const timelinePlayEl = document.createElement('button');
  const { pauseAll, resumeAll } = Sounds;

  let intitalProgress = parseFloat( localStorage.getItem('timelineValue') );
  let isPlaying = false;

  if ( isNaN(intitalProgress) ) { intitalProgress = 0; }

  document.documentElement.classList.add('is-debug');

  timelineControlEl.classList.add('scene-controls__control');
  timelineControlEl.setAttribute('type', 'range');
  timelineControlEl.setAttribute('min', 0);
  timelineControlEl.setAttribute('max', 1);
  timelineControlEl.setAttribute('value', intitalProgress);
  timelineControlEl.setAttribute('step', 0.001);
  bodyEl.appendChild(timelineControlEl);

  timelinePlayEl.setAttribute('class', 'scene-controls__play');
  timelinePlayEl.textContent = 'Play/Pause';
  bodyEl.appendChild(timelinePlayEl);

  timeline.progress(intitalProgress);
  timeline.eventCallback('onUpdate', () => {
    timelineControlEl.value = timeline.progress();
  });

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isPlaying) {
      resumeAll(timeline);
    }

    if (document.visibilityState === 'hidden') {
      pauseAll();
    }
  });

  timelineControlEl.addEventListener('input', () => {
    if (isPlaying) {
      isPlaying = false;
      pauseAll();
      timeline.pause();
    }

    timeline.progress(timelineControlEl.value);
  });

  timelinePlayEl.addEventListener('click', () => {
    if (isPlaying) {
      isPlaying = false;
      pauseAll();
      timeline.pause();
    } else {
      isPlaying = true;
      resumeAll(timeline);
      timeline.play();
    }
  });

  setInterval( () => {
    localStorage.setItem( 'timelineValue', timeline.progress() );
  }, 1000);
}
