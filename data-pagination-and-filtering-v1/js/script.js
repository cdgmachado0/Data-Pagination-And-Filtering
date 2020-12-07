/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const header = document.querySelector('.header');
const ulList = document.querySelector('.student-list');
const ulButtons = document.querySelector('.link-list');

function createButtons(i) {
   let li = document.createElement('li');
   let button = document.createElement('button');
   button.textContent = `${i + 1}`;
   li.appendChild(button);
   ulButtons.appendChild(li); 
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
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


// Call functions
showPage(data, 1);
addPagination(data);

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


const searchLabel = document.createElement('label');
searchLabel.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.id = 'search';
searchInput.placeholder = 'Search by name...';
const searchButton = document.createElement('button');
searchButton.innerHTML = `<img src="img/icn-search.svg" alt="Search icon">`;
searchLabel.append(searchInput, searchButton);
header.appendChild(searchLabel);

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