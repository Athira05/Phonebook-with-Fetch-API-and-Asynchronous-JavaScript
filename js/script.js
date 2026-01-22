let contacts = [];

// Fetch data (mock API)
async function loadContacts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        contacts = data.map(user => ({
            name: user.name,
            phone: user.phone
        }));

        displayContacts(contacts);
    } catch (error) {
        alert("Failed to load contacts");
    }
}

function displayContacts(list) {
    const ul = document.getElementById("contactList");
    ul.innerHTML = "";

    list.forEach((contact, index) => {
        ul.innerHTML += `
            <li>
                <span>
                    ${contact.name} - ${contact.phone}
                </span>

                <div class="btn-box">
                    <button class="edit" onclick="editContact(${index})">Edit</button>
                    <button class="delete" onclick="deleteContact(${index})">Delete</button>
                </div>
            </li>
        `;
    });
}

function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (name === "" || phone === "") {
        alert("Please enter all details");
        return;
    }

    contacts.push({ name, phone });
    displayContacts(contacts);

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
}

function editContact(index) {
    let newName = prompt("Enter new name", contacts[index].name);
    let newPhone = prompt("Enter new phone number", contacts[index].phone);

    if (newName === "" || newPhone === "") {
        alert("Fields cannot be empty");
        return;
    }

    contacts[index].name = newName;
    contacts[index].phone = newPhone;

    displayContacts(contacts);
}


function deleteContact(index) {
    contacts.splice(index, 1);
    displayContacts(contacts);
}

function searchContact() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(value) ||
        contact.phone.toLowerCase().includes(value)
    );

    displayContacts(filtered);
}

loadContacts();
