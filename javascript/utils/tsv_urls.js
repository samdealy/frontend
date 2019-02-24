import DEV_CONSTANTS from './dev_constants.js';
import PROD_CONSTANTS from './prod_constants.js';
import { DAYS_OF_THE_WEEK } from './shared_constants.js';

let areYouInDevelopment = window.location.hostname === 'localhost';
/**
* Returns correct url for the current day of the week.
*
* @param {String} dayString
* @return {String} (URL)
*/
export default function determineTSV_URL(dayString) {
	const tsvSheetURLsByDay = createTSVSheetURLsByDay();
	return tsvSheetURLsByDay[dayString];
	// switch(dayOfTheWeek) {
  //   case 'monday': return tsvSheetURLsByDay.monday;
  //   case 'tuesday': return tsvSheetURLsByDay.tuesday;
  //   case 'wednesday': return tsvSheetURLsByDay.wednesday;
  //   case 'thursday': return tsvSheetURLsByDay.thursday;
  //   case 'friday': return tsvSheetURLsByDay.friday;
  //   case 'saturday': return tsvSheetURLsByDay.saturday;
	// 	case 'sunday': return tsvSheetURLsByDay.sunday;
  // }
}

/**
* Creates an object that holds the url for each day's sheet. If in
* development, uses the development schedule's Google Sheet. If in
* production, uses the production schedule's Google Sheet.
*
* @param{null}
* @return{Object} tsvSheetURLsByDay
*/
export function createTSVSheetURLsByDay() {
	let [firstPartOfUrl, secondPartOfUrl, idNumbers] = determineDevOrProdConstants();
	const tsvSheetURLsByDay = {};
	DAYS_OF_THE_WEEK.forEach( day => {
		tsvSheetURLsByDay[day] = firstPartOfUrl + idNumbers[day] + secondPartOfUrl;
	});

	return tsvSheetURLsByDay;
}

/**
* Determines which array of constants to use.
*
* @param{null}
* @return {Array<String>} ()
*/
function determineDevOrProdConstants() {
	return areYouInDevelopment ? DEV_CONSTANTS : PROD_CONSTANTS;
}