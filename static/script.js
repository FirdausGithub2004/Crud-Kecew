document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crud-form');
    const tableBody = document.getElementById('table-body');
    const itemIdInput = document.getElementById('item-id');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Fetch and render initial data
    loadData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = itemIdInput.value;
        const name = nameInput.value;
        const email = emailInput.value;
        const item = { name, email };

        if (id === "") {
            // Create
            fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(() => {
                resetForm();
                loadData();
            });
        } else {
            // Update
            fetch(`/api/data/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(() => {
                resetForm();
                loadData();
            });
        }
    });

    function loadData() {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => renderTable(data));
    }

    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach(item => {
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td class="actions">
                        <button class="edit" onclick="editItem(${item.id}, '${item.name}', '${item.email}')">Edit</button>
                        <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    window.editItem = function(id, name, email) {
        itemIdInput.value = id;
        nameInput.value = name;
        emailInput.value = email;
    }

    window.deleteItem = function(id) {
        fetch(`/api/data/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadData());
    }

    function resetForm() {
        itemIdInput.value = "";
        nameInput.value = "";
        emailInput.value = "";
    }
});
