# [GSAP intro animation](http://codepen.io/arturkot/full/akRKVm/)
This repo stores files for a animation which you can watch on [this Codepen page](http://codepen.io/arturkot/full/akRKVm/).

# Table of contents
* [Project structure](#project-structure)
* [Local Setup](#local-setup)
* [Questions you may have](#questions-you-may-have)

## Project structure
All the project related files are stored inside `src/` directory.

### img/
This directory holds SVG images which are _included_ inside `index.html` file. During include all IDs inside images are converted to classes for better reusability and to remove risk of potential ID names collision. It's optional and I use `idsToClasses` filter to take care of that. It's all possible thanks to [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include).

### js/
Here the scripts are divided into:

#### main.js
When all audio files are loaded `body` gets _is-ready_ class and timeline controls are activated.

#### scenes/
The directory where all timelines are stored. All scenes are imported into `main-timeline.js`. It looks kind of like a main CSS file where you import small components.

#### setup/
* `const.js` – this is where I put constant values.
* `objects.js` – all object which are going to be animated can be accessed through this module.
* `sounds.js` – sound files to be loaded are specified in this place (all of them are pulled from the _media_ directory).

#### utils/
* `sounds.js` – a little script that utilises [howler.js](https://howlerjs.com/) to:
  - preload and play `ogg` and `mp3` files,
  – sync the sound with the timeline.
* `timeline-ui` – it adds timeline controls (play/start button + range input). It also takes care of pausing/resuming sound when the animation isn't visible (so it's synced with requestAnimationFrame which automatically pauses when off screen).

### media/
The directory where audio files are stored. Could also be used for images or videos.

### scss/
Styles for scene container and timeline UI.

### index.html
All SVG files are imported here. This is the file which holds all the SVG objects. They're imported inside `<g>` (groups) and embedded inside main `<svg>` object. Animated _GSAP_ text is kept on a separate layer called `scene__outro-text` (outside of SVG context).

## Local Setup
You can ran local server, play around with the repo, and preview your changes. 👍

### Instructions

1. Clone the repo.
2. Install NodeJS (tested on v5).
3. Run `npm install`.
4. Run `npm start`.
5. The [Codepen demo page](http://codepen.io/arturkot/full/akRKVm/) should open up in you defaut browser with animation loaded from your local repo served from [http://localhost:3000](http://localhost:3000).

### Caveats
* Please make sure that you don't have any other servers running on `localhost:3000` – that would not allow to start the local server with the animation.
* You may want to open dev tools in your browser and activate _disable cache_ to see your recent updates.
* Livereloading isn't supported at the moment. That means you'll have to refresh Codepen's page to see your local adjustments.

# Questions you may have

### Why the animation has to be played on Codepen?
Because of 2 paid plugins I've used: [MorphSVGPlugin](http://greensock.com/morphSVG) and [SplitText](http://greensock.com/SplitText). I can't include them in this open-for-everyone repo _but_ they are available for public use on [Codepen](http://codepen.io/)!

### What's GSAP?
Short answer: probably _the best animation library for JS_. ;) Want more information? Go to the [library's homepage](http://greensock.com/).
