import findFilenameAndCalculatePlaybackTime from './find_clip_info.js';
import * as TIME_UTIL from './utils/time.js';
import constructSrcURL from './utils/video_player.js';
import { parseCSV, main } from './parser.js';

/*
*	Set the html5 video player to play the current
* time's clip at the playback time.
*
* @param {Array<ClipDataObject>} formattedParseData
* @return {null}
*/
export default function setClipOnVideoPlayer(formattedParseData) {
  const videoPlayerClipInfo = getCurrentFilenameAndPlaybackTime(formattedParseData);
  const [fileName, playbackTime] = [videoPlayerClipInfo.fileName, videoPlayerClipInfo.playbackTime];
  const srcURL = constructSrcURL(fileName, playbackTime);
  document.getElementById("mp4_src").src = srcURL;
  document.getElementById("tv").load();
}

/*
* Gets filename and playbacktime for the file
* that should be currently playing
*
* @param {Array<ClipDataObject>} formattedParseData
* @return {Object} (fileNameAndPlaybackTime)
*/
function getCurrentFilenameAndPlaybackTime(formattedParseData) {
  const date = new Date();
  // If it's midnight, re-parse to load the next day's schedule.
  // Otherwise, at midnight you'd start playing the previous day's schedule
  if(TIME_UTIL.isItMidnight(date)) parseCSV(main);
  return findFilenameAndCalculatePlaybackTime(formattedParseData, date, false);
}
