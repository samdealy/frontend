import findVideoPlayerClipInfo from './find_clip_info.js';
import * as TIME_UTIL from '../utils/time.js';
import parseTSV from '../parser/index.js';
import scheduleClipLoads from './schedule_clip_loads.js';

const mp4Source =  document.getElementById("mp4_src");
const videoPlayer = document.getElementById("tv");
const videoTitleElement = document.getElementById("title");
const modalDiv = document.getElementById("modal");

/** @type {Boolean} */
let isSoundOn = false;

/**
* @const @type {String}
* @description base url for videos
*/
const LINKER = "http://8balltv.club/content/";
/**
* @author samdealy
*	@description Set the html5 video player to play the current
*   time's clip at the playback time.
* @param {Array<ClipDataObject>} formattedParseData
* @return {null}
*/
export default function setClipOnVideoPlayer(formattedParseData) {
  const currentClip = getCurrentVideoPlayerClipInfo(formattedParseData);
  setSRC_URL(currentClip.fileName, currentClip.playbackTime);
  setTitle(currentClip.title);
  setModalText(currentClip.modalText, currentClip.duration);
  loadVideoPlayer();
}

/**
* @author samdealy
* @description Turns the sound on or off the HTML video player.
* @param {Boolean} updatedIsSoundOn
* @return {null}
*/
export function setSoundOnVideoPlayer(updatedIsSoundOn) {
  isSoundOn = updatedIsSoundOn;
  videoPlayer.muted = !isSoundOn;
}

/**
* @author samdealy
* @description Set the current clip's source url on the HTML src element.
* @param {String} fileName
* @param {Number} playbackTime
* @return {null}
*/
function setSRC_URL(fileName, playbackTime) {
  const srcURL = constructSrcURL(fileName, playbackTime);
  mp4Source.src = srcURL;
}

/**
* @author samdealy
* @description Set the current title on the title HTML element.
* @param {String} title
* @return {null}
*/
function setTitle(title) {
  videoTitleElement.innerHTML = title;
}

/**
* @author samdealy
* @description Set the modal text (which includes the file's duration) on modal.
* @param {String} modalText
* @param {String} duration
* @return {null}
*/
function setModalText(modalText, duration) {
  modalDiv.innerHTML = modalText;
}

/**
* @author samdealy
* @description Load the videoPlayer.
* @param {String}
* @return {null}
*/
function loadVideoPlayer() {
  videoPlayer.load();
}

/**
* @author samdealy
* @description Gets filename and playbacktime for the file
*   that should be currently playing
* @param {Array<ClipDataObject>} formattedParseData
* @return {VideoPlayerClipInfo}
*/
function getCurrentVideoPlayerClipInfo(formattedParseData) {
  const date = new Date();
  // If it's midnight, re-parse to load the next day's schedule.
  // Otherwise, at midnight you'd start playing the previous day's schedule
  if(TIME_UTIL.isItMidnight(date)) parseTSV(main);
  return findVideoPlayerClipInfo(formattedParseData, date, false);
}

function constructSrcURL(filename, playbackTime) {
  const srcURL = LINKER + filename + '#t=' + playbackTime.toString();
  return srcURL
}
