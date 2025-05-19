// Global DOM
const main = document.getElementById("main");
const modalContainer = document.querySelector(".contact_modal");
const modal = document.querySelector(".modal");
const modalOpenButton = document.querySelector(".contact_button");
const modalCloseButton = document.querySelector(".modal_close_button");
const form = document.getElementById("form");

function displayModal() {
	modalContainer.style.display = "block";

    main.setAttribute("aria-hidden", "true");

    modalContainer.setAttribute("aria-hidden", "false");

    const firstNameInput = document.querySelector("#fname");
    firstNameInput.focus();
}

function closeModal() {
    modalContainer.style.display = "none";
    modalContainer.setAttribute("aria-hidden", "true");

    main.setAttribute("aria-hidden", "false");

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