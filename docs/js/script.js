
const header = document.querySelector('.header');
const ulList = document.querySelector('.student-list');
const ulButtons = document.querySelector('.link-list');

/**
 * Creates pagination buttons
 * @param {number} i increasing variable on a for..loop 
 */
function createButtons(i) {
   let li = document.createElement('li');
   let button = document.createElement('button');
   button.textContent = `${i + 1}`;
   li.appendChild(button);
   ulButtons.appendChild(li); 
}

/**
 * Shows students' details
 * @param {array} _list list of student objects      
 * @param {number} _page clicked (or default) page that will display students according to their index
 */
function showPage(_list, _page) {
   let startIndex = (_page * 9) - 9;
   let endIndex = _page * 9;
   let studentList = '';
   
   for (let i = 0; i < _list.length; i++) {
      let student = _list[i]
      if (_list.indexOf(student) >= startIndex && _list.indexOf(student) < endIndex) {
         studentList += `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src=${student.picture.large} alt="Profile Picture">
           <h3>${student.name.first} ${student.name.last}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${student.registered.date}</span>
         </div>
       </li>
         `;
      }
   }
   ulList.innerHTML = studentList;
}


/**
 * Creates pagination buttons according to length of list of students
 * @param {array} _list list of student objects
 */
function addPagination(_list) {
   let numberOfButtons = Math.floor(_list.length / 9);
   let mod = (_list.length / 9) % (numberOfButtons);
   if (mod !== 0) {numberOfButtons += 1;}

   for (let i = 0; i < numberOfButtons; i++) {
      createButtons(i);
   }
   ulButtons.querySelector('button').className = 'active';
}


// Call initial functions
showPage(data, 1);
addPagination(data);

// Listens for the pagination button that was clicked and display students accordingly
ulButtons.addEventListener('click', (e) => {
   let clickedButton = e.target;
   if (clickedButton.tagName === 'BUTTON') {
      let liButtons = ulButtons.children;
      for (let i = 0; i < liButtons.length; i++) {
         let pagButton = liButtons[i].firstElementChild;
         pagButton.className = '';
      }
      clickedButton.className = 'active';
      let newPage = clickedButton.textContent;
      showPage(data, newPage);
   }
});


// Dynamically creates Search bar
const searchLabel = document.createElement('label');
searchLabel.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.id = 'search';
searchInput.placeholder = 'Search by name...';
const searchButton = document.createElement('button');
searchButton.innerHTML = `<img src="img/icn-search.svg" alt="Search icon">`;
searchLabel.append(searchInput, searchButton);
header.appendChild(searchLabel);


// Displays students according to search results derived from user's input. 
searchInput.addEventListener('keyup', (e) => {
   let toSearch = e.target.value.toLowerCase();
   const newStudentsArr = [];

   for (let i = 0; i < data.length; i++) {
      let firstNameReference = data[i].name.first.toLowerCase();
      let lastNameReference = data[i].name.last.toLowerCase();
      if (firstNameReference.includes(toSearch) || lastNameReference.includes(toSearch)) {
         newStudentsArr.push(data[i]);
      }
   }
   ulButtons.innerHTML = '';
   if (newStudentsArr.length === 0) {
      ulList.innerHTML = `
         <li><h3>No results where found under that search.</h3></li>
      `;
   } else {
      showPage(newStudentsArr, 1);
      addPagination(newStudentsArr);
   }
});