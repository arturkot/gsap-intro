"use strict";

import Sounds from '_root/utils/sounds';
import mainTimeline from '_root/scenes/main-timeline';
import timelineUi from '_root/utils/timeline-ui';

Sounds.allReady.then( () => {
  document.querySelector('body').classList.add('is-ready');
  timelineUi(mainTimeline);
});
