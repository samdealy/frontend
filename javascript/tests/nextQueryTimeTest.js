import { findMillisecondsToQueryForNewClip } from '../parser.js';
import { generateTestMessages } from './utils.js';


batchTestRunner();

function generateTestCases() {
  const testCases = [
    [ new Date('Thu, 01 Jan 2019 08:02:36'), 744 * 1000 ],
    [ new Date('Thu, 01 Jan 2019 04:42:17'), (60 - 17 + (45 - 43) * 60) * 1000],
    [ new Date('Thu, 01 Jan 2019 12:00:00'), 15 * 60 * 1000 ],
    [ new Date('Thu, 01 Jan 2019 12:35:30'), (30 + ((45 - 36) * 60)) * 1000],
    [ new Date('Thu, 01 Jan 2019 11:59:59'), 1 * 1000 ],
    [ new Date('Thu, 01 Jan 2019 01:30:00'), (15 * 60) * 1000 ],
  ]

  return testCases;
}

function batchTestRunner() {
  const testCases = generateTestCases();
  for(let i = 0; i < testCases.length; i++) {
    const date = testCases[i][0];
    const expectedTime = testCases[i][1];
    const actualTime = findMillisecondsToQueryForNewClip(date);

    let pass = expectedTime === actualTime ? true : false;
    generateTestMessages(pass, i);
    if(!pass) generateErrorMessages(expectedTime, actualTime);
  }
}

function generateErrorMessages(expectedTime, actualTime) {
  const colorString = "color:red";
  console.log(`    %cExpected time was: ${expectedTime}`, colorString);
  console.log(`    %cActual time was: ${actualTime}`, colorString);
}
