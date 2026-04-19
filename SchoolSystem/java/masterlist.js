let students = [];

// if meron local storage, and some shi I can't explain...
if (localStorage.getItem("students")) {
  students = JSON.parse(localStorage.getItem("students"));
  renderTable();
}

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

// I-add ang Students and shii
function addStudent() {
  const student = {
    id: document.getElementById("studentId").value,
    name: document.getElementById("name").value,
    section: document.getElementById("section").value,
    email: document.getElementById("email").value,
    xp: document.getElementById("xp").value,
    status: document.getElementById("status").value,
    password: "default123"
  };

  students.push(student);
  saveData();
  renderTable();
}

// Yun Table
function renderTable() {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  students.forEach((s, index) => {
    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.section}</td>
        <td>${s.email}</td>
        <td>${s.xp}</td>
        <td>${s.status}</td>
        <td>
          <button onclick="editStudent(${index})">✏️ Edit</button>
          <button onclick="deleteStudent(${index})">❌ Delete</button>
          <button onclick="resetPassword(${index})">🔑 Reset</button>
        </td>
      </tr>
    `;
  });
}

// Update yun Students or something...
function editStudent(index) {
  const s = students[index];

  const newName = prompt("New name:", s.name);
  const newSection = prompt("New section:", s.section);
  const newEmail = prompt("New email:", s.email);
  const newXP = prompt("New XP:", s.xp);
  const newStatus = prompt("Status (Active/Inactive):", s.status);

  students[index] = {
    ...s,
    name: newName,
    section: newSection,
    email: newEmail,
    xp: newXP,
    status: newStatus
  };

  saveData();
  renderTable();
}

// GET OUT!!!!🗣🗣🔥🔥🔥🔥
function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  renderTable();
}

// Forgot Password?
function resetPassword(index) {
  students[index].password = "default123";
  alert("Password reset to default123");
  saveData();
}

// CSV or Excel or some shii
function exportCSV() {
  let csv = "Student ID,Name,Section,Email,XP,Status\n";

  students.forEach(s => {
    csv += `${s.id},${s.name},${s.section},${s.email},${s.xp},${s.status}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  a.click();
}