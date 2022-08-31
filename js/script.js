/*
Data Pagination and Filtering
*/

/*
This function will insert/append the elements needed for student details. 
The data will be a parameter once its called so that this function is able to scan through the object properties and being displayed in the template literal.
*/

function showPage(list, page) {
  const startIndex = page * 9 - 9;
  const endIndex = page * 9;
  const studentList = document.querySelector("UL.student-list");
  studentList.innerHTML = "";
  for (i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const studentItem = `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Date Registered:   ${list[i].registered.date}</span>
                  <span class="date">Age:${list[i].registered.age}</span>
               </div>
            </li>`;
      studentList.insertAdjacentHTML("beforeend", studentItem);
    }
  }
}

showPage(data, 1);

/*
This function will create and insert/append the elements needed for the pagination buttons.
Eventlistener is looking for clicks on any targets with the tagName 'BUTTON' so that the active class name can be transfered to that target.
data again will be a parameter to be used with this function so that the pages can be dynamically be stored.
*/

function addPagination(list) {
  const numOfPages = Math.ceil(list.length / 9);
  const linkList = document.querySelector("UL.link-list");
  linkList.innerHTML = "";
  for (i = 1; i <= numOfPages; i++) {
    const button = `<li>
            <button type="button">${[i]}</button>
         </li>`;
    linkList.insertAdjacentHTML("beforeend", button);
  }
  const button = document.querySelector("button");
  button.className = "active";

  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const active = document.querySelector(".active");
      active.className = "";
      e.target.className = "active";
      showPage(list, e.target.textContent);
    }
  });
}

addPagination(data);
/*
Creating a search bar and storing it in header with class name header.
*/
const searchDiv = document.querySelector("HEADER.header");
searchDiv.className = "student-search";
searchDiv.innerHTML += `<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
const search = document.querySelector("#search");

/*
Using keyup to listen for any keys being lifted to compare with input string being entered.
toLowerCase() is being used to make it so that regardless of case its still able to filter out the students properly for user.
*/

search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredStudents = data.filter((student) => {
    return (
      student.name.first.toLowerCase().includes(searchString) ||
      student.name.last.toLowerCase().includes(searchString)
    );
  });
  console.log(filteredStudents);
  if (
    filteredStudents.length <= 0 &&
    searchDiv.lastElementChild.nodeName !== "P"
  ) {
    const noResults = document.createElement("p");
    const text = document.createTextNode("No results found");
    noResults.appendChild(text);
    searchDiv.appendChild(noResults);
    showPage(filteredStudents, 1);
  } else if (
    filteredStudents.length > 0 &&
    searchDiv.lastElementChild.nodeName === "P"
  ) {
    for (i = 0; i < searchDiv.childNodes.length; i++) {
      if (searchDiv.childNodes[i].nodeName === "P") {
        searchDiv.removeChild(searchDiv.children[i]);
      }
    }
  } else {
    showPage(filteredStudents, 1);
  }
  addPagination(filteredStudents);
});

/*
Submit being considered for search bar in case user decides to copy and paste so that keys aren't being detected.
*/

search.addEventListener("submit", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredStudents = data.filter((student) => {
    return (
      student.name.first.toLowerCase().includes(searchString) ||
      student.name.last.toLowerCase().includes(searchString)
    );
  });
  console.log(filteredStudents);
  showPage(filteredStudents, 1);
  addPagination(filteredStudents);
});
