import parseCSV from '../../parser/index.js';
import renderTitlesOnSchedule from '../create_schedule.js';
import determineCSV_URL from '../../utils/csv_urls.js';

export const weekTable = document.getElementById("WEEK");

/*
* For each day link, register an on-click listener.
*
* @param{null}, @return{null}
*/
export default function registerSchedulesByDayLinksListener() {
  // A day link brings us to another day's schedule
  const dayLinks = weekTable.querySelectorAll("td");
  dayLinks.forEach((dayLink, i) => {
    dayLink.addEventListener('click', e => {
      styleTodayLinkAndParseTodaysSchedule(dayLink, i);
    });
  });
}

/*
* Adds the "isToday" css class for the selected day link and parse
* that day's csv file.
*
* @param{DOMElement} dayLink
* @return{Number} index
*/
function styleTodayLinkAndParseTodaysSchedule(dayLink, index) {
  setIsToday(dayLink);
  const mondayToSundayIndex = findMondayToSundayIndex(index);
  const csv_url = determineCSV_URL(index);
  parseCSV(renderTitlesOnSchedule, csv_url);
}

/*
* Clear the  "isToday" css class on the previously selected day link
* and add the "isToday" css class to the currently selected day link.
*
* @param{DOMElement} dayLink
* @return{null}
*/
function setIsToday(dayLink) {
  updateIsTodayOnPrevious();
  dayLink.className = "isToday";
}

/*
* Clear the  "isToday" css class on the previously selected day link.
*
* @param{null}, @return{null}
*/
function updateIsTodayOnPrevious() {
  const previousIsToday = weekTable.querySelector(".isToday");
  if(previousIsToday) {
    previousIsToday.className = "week";
  }
}

/*
* Given an index that corresponds to an array that lists days from
* Sunday through Monday
*
*/
function findMondayToSundayIndex(index) {
  const mondayToSundayIndex = (index + 1) % 7;
  return mondayToSundayIndex;
}
