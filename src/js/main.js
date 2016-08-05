"use strict";

import Sounds from '_root/shared/sounds';
import mainTimeline from '_root/scenes/main-timeline';
import timelineUi from '_root/shared/timeline-ui';

Sounds.allReady.then( () => {
  document.querySelector('body').classList.add('is-ready');
  timelineUi(mainTimeline);
});
