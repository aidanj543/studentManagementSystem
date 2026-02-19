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