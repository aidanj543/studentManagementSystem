let students = [];

let currentId = 0;

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();

    document.getElementById("searchButton").addEventListener("click", searchStudents);
    document.getElementById("searchInput").addEventListener("input", searchStudents);
    document.getElementById("sortSelect").addEventListener("change", sortStudents);
    document.getElementById("addStudentForm").addEventListener("submit", addStudent);
    document.getElementById("resetForm").addEventListener("click", ()=>{
        document.getElementById("addStudentForm").reset();
    });
});

function loadStudents(){
    fetch("students.json")
        .then(response => response.json())
        .then(data => {
            students = data;
            currentId = Math.max(...students.map(s => s.id));
            renderTable(students);
        })
        .catch(error => console.error("Couldn't Load Students:", error));
}

function renderTable(data, highlightId = null) {
    const tbody = document.getElementById("studentsTbody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3" style="text-align:center;">No students found</td>`;
        tbody.appendChild(row);
        return;
    }

    data.forEach(student => {
        const row = document.createElement("tr");

        if (student.id === highlightId) {
            row.classList.add("highlight");
            setTimeout(() => row.classList.remove("highlight"), 2000);
        }

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.major}</td>
        `;

        tbody.appendChild(row);
    });
}


function searchStudents(){
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = students.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.age.toString().includes(query) ||
        s.major.toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function sortStudents(){
    const criteria = document.getElementById("sortSelect").value;
    let sorted = [...students];

    if (criteria === "name"){
        sorted.sort((a,b) => a.name.localeCompare(b.name));
    } else if (criteria ==="age"){
        sorted.sort((a,b) => a.age - b.age);
    }
    renderTable(sorted);

}

function addStudent(event){
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const major = document.getElementById("major").value.trim();

    if(!name || isNaN(age)|| age<0){
        alert("This is not valid name or age");
        return;
    }

    const newStudent = {
        id: ++currentId,
        name,
        age,
        major
    }
    students.push(newStudent);
    renderTable(students, newStudent.id);
    document.getElementById("addStudentForm").reset();
}