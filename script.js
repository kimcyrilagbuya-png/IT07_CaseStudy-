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

// ===== DISPLAY COMPLETED =====
function displayCompleted() {
  const list = document.getElementById('completedList');
  list.innerHTML = '';
  completedData.forEach(b => {
    const li = document.createElement('li');
    li.innerHTML = `
      ✅ <strong>${b.bookName}</strong> - Returned by ${b.studentName}
    `;
    list.appendChild(li);
  });
}

// ===== INITIAL DISPLAY =====
displayBorrowed();
displayCompleted();
