/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
A list AND page parameter that will be passed as an argument.

*/

function showPage (list, page) {
const startIndex = ( page * 9 ) - 9
const endIndex = page * 9;
const studentList = document.querySelector('UL.student-list');
studentList.innerHTML = '';
for (i = 0; i < list.length; i++) {
   if( i >= startIndex && i < endIndex) {
      const studentItem = `${data[i]}`
   } 

}


};
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions

