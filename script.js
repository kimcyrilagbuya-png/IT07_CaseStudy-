// ===== PAGE SWITCHING =====
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(btn.dataset.page).classList.add('active');
  });
});

// ===== JSON DATABASE (LOCAL STORAGE) =====
let borrowData = JSON.parse(localStorage.getItem('borrowData')) || [];
let completedData = JSON.parse(localStorage.getItem('completedData')) || [];

// ===== ADD BORROW FORM =====
document.getElementById('borrowForm').addEventListener('submit', e => {
  e.preventDefault();

  const newBorrow = {
    bookName: document.getElementById('bookName').value,
    studentId: document.getElementById('studentId').value,
    studentName: document.getElementById('studentName').value,
    gradeSection: document.getElementById('gradeSection').value,
    dateBorrowed: document.getElementById('dateBorrowed').value,
    dueDate: document.getElementById('dueDate').value
  };

  borrowData.push(newBorrow);
  localStorage.setItem('borrowData', JSON.stringify(borrowData));

  alert("Book added successfully!");
  document.getElementById('borrowForm').reset();
  displayBorrowed();
});

// ===== DISPLAY BORROWED =====
function displayBorrowed() {
  const list = document.getElementById('borrowList');
  list.innerHTML = '';
  borrowData.forEach((b, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${b.bookName}</strong> - ${b.studentName} (${b.studentId}) 
      <br>Due: ${b.dueDate}
      <button onclick="markReturned(${index})">Return</button>
      <button onclick="editRecord(${index})">Edit</button>
      <button onclick="deleteRecord(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

// ===== RETURN FUNCTION =====
function markReturned(index) {
  const returnedBook = borrowData.splice(index, 1)[0];
  completedData.push(returnedBook);

  localStorage.setItem('borrowData', JSON.stringify(borrowData));
  localStorage.setItem('completedData', JSON.stringify(completedData));

  displayBorrowed();
  displayCompleted();
}

// ===== EDIT FUNCTION =====
function editRecord(index) {
  const record = borrowData[index];

  // Prompt the user for new values (keeps old ones if left blank)
  const newBookName = prompt("Edit Book Name:", record.bookName) || record.bookName;
  const newStudentId = prompt("Edit Student ID:", record.studentId) || record.studentId;
  const newStudentName = prompt("Edit Student Name:", record.studentName) || record.studentName;
  const newGradeSection = prompt("Edit Grade & Section:", record.gradeSection) || record.gradeSection;
  const newDateBorrowed = prompt("Edit Date Borrowed:", record.dateBorrowed) || record.dateBorrowed;
  const newDueDate = prompt("Edit Due Date:", record.dueDate) || record.dueDate;

  // Update the record
  borrowData[index] = {
    bookName: newBookName,
    studentId: newStudentId,
    studentName: newStudentName,
    gradeSection: newGradeSection,
    dateBorrowed: newDateBorrowed,
    dueDate: newDueDate
  };

  localStorage.setItem('borrowData', JSON.stringify(borrowData));
  displayBorrowed();
  alert("Record updated successfully!");
}

// ===== DELETE FUNCTION =====
function deleteRecord(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    borrowData.splice(index, 1);
    localStorage.setItem('borrowData', JSON.stringify(borrowData));
    displayBorrowed();
    alert("Record deleted successfully!");
  }
}

// ===== DISPLAY COMPLETED =====
function displayCompleted() {
  const list = document.getElementById('completedList');
  list.innerHTML = '';
  completedData.forEach((b, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ✅ <strong>${b.bookName}</strong> - Returned by ${b.studentName}
      <button onclick="deleteCompleted(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

// ===== DELETE COMPLETED FUNCTION =====
function deleteCompleted(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    completedData.splice(index, 1);
    localStorage.setItem('completedData', JSON.stringify(completedData));
    displayCompleted();
  }
}



// ===== INITIAL DISPLAY =====
displayBorrowed();
displayCompleted();
