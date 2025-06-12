// Global DOM
// const main = document.getElementById("main");
const modalContainer = document.querySelector(".contact_modal");
const modalOpenButton = document.querySelector(".contact_button");
const form = document.getElementById("form");
// eslint-disable-next-line no-unused-vars
function displayModal() {
    // Change style display
	modalContainer.style.display = "block";

    //Accessibility
    modalContainer.setAttribute("aria-hidden", "false");
    // Hide main and header
    header.setAttribute("inert", "");
    main.setAttribute("inert", "");

    const firstNameInput = document.querySelector("#fname");

    // Set focus on Fisrt name input
    firstNameInput.focus();
}

function closeModal() {
    // Change style display
    modalContainer.style.display = "none";

    //Accessibility
    modalContainer.setAttribute("aria-hidden", "true");

    header.removeAttribute("inert");
    main.removeAttribute("inert");

    // Set focus on Open contact modal button
    modalOpenButton.focus();
}

// Prevent the modal from closing on Submit
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Display the value of the form's inputs in the console
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);
    console.log(message.value);

    closeModal();

    // Reset the form
    form.reset();
  })

// Keyboard Detection
document.addEventListener("keydown", (e) => {
    // Check if modal is displayed
    const isModalContainerOpen = modalContainer.style.display === "block";

    // If modal is not displayed, we do nothing
    if (!isModalContainerOpen) return;

    // If the user press Escape => Close modal
    if (e.key === "Escape") {
        closeModal();
    }
})