import { weekTable } from './listeners/schedule_by_day.js';
import { findMondayToSundayIndex } from '../utils/shared_constants.js';
import { calculateMinutesPastMidnight } from '../utils/time.js';
import { findCurrentClipIndex } from '../parser/format_parse_data.js';

/**
* Takes the formatted parse data and sets the title on the "titler"
* elements.
*
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
export default function renderTitlesOnSchedule(formattedParseData) {
  const scheduleTable = document.getElementById("TODAY");
  const titlers = scheduleTable.querySelectorAll(".titler");
  titlers.forEach((titler, i) => {
    const title = formattedParseData[i].title;
    titler.innerHTML = title;
  });
}

export function setTodayCSS() {
  const todayMondayToSundayIndex = findTodayMondayToSundayIndex();
  const dayLinks = weekTable.querySelectorAll("td");
  const todayDayLink = dayLinks[todayMondayToSundayIndex];
  todayDayLink.className = "istoday"
}

function findTodayMondayToSundayIndex() {
  const todayDate = new Date();
  const todayDay = todayDate.getDay();
  let todayMondayToSundayIndex;
  if(todayDay > 0) {
    todayMondayToSundayIndex = todayDay - 1;
  } else {
    todayMondayToSundayIndex = 6;
  }

  return todayMondayToSundayIndex;
}

export function setNowOnCurrentClipTime() {
  const quarters = document.querySelectorAll(".quarter");
  const date = new Date();
  const minutesPastMidnight = calculateMinutesPastMidnight(date);
  const currentClipIndex = findCurrentClipIndex(minutesPastMidnight);
  const currentClipQuarter = quarters[currentClipIndex];
  debugger
  currentClipQuarter.innerHTML = "..NOW....."
}
