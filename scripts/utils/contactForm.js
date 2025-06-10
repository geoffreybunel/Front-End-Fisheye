// Global DOM
const modalContainer = document.querySelector(".contact_modal");
const modalOpenButton = document.querySelector(".contact_button");
const form = document.getElementById("form");
// const main = document.getElementById("main");

// eslint-disable-next-line no-unused-vars
function displayModal() {
	modalContainer.style.display = "block";

    main.setAttribute("inert", "");

    modalContainer.setAttribute("aria-hidden", "false");

    const firstNameInput = document.querySelector("#fname");
    firstNameInput.focus();
}

function closeModal() {
    modalContainer.style.display = "none";
    modalContainer.setAttribute("aria-hidden", "true");

    main.removeAttribute("inert");

    modalOpenButton.focus();
}

// Prevent the modal from closing on Submit
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);
    console.log(message.value);

    closeModal();
    form.reset();
  })

// Keyboard Detection
document.addEventListener("keydown", (e) => {
    const isModalContainerOpen = modalContainer.style.display === "block";

    if (!isModalContainerOpen) return;

    if (e.key === "Escape") {
        closeModal();
    }
})