let data = [];

document.getElementById('crud-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const index = document.getElementById('index').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (index === "") {
        // Create
        data.push({ name, email });
    } else {
        // Update
        data[index] = { name, email };
    }

    resetForm();
    renderTable();
    saveData();
});

function renderTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = "";

    data.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td class="actions">
                    <button class="edit" onclick="editItem(${index})">Edit</button>
                    <button class="delete" onclick="deleteItem(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function editItem(index) {
    document.getElementById('index').value = index;
    document.getElementById('name').value = data[index].name;
    document.getElementById('email').value = data[index].email;
}

function deleteItem(index) {
    data.splice(index, 1);
    renderTable();
    saveData();
}

function resetForm() {
    document.getElementById('index').value = "";
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
}

function saveData() {
    localStorage.setItem('crud-data', JSON.stringify(data));
}

function loadData() {
    const savedData = localStorage.getItem('crud-data');
    if (savedData) {
        data = JSON.parse(savedData);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderTable();
});
