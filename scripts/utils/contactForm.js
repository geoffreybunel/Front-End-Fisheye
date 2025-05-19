// Global DOM
const main = document.getElementById("main");
const modalContainer = document.querySelector(".contact_modal");
const modal = document.querySelector(".modal");
const modalOpenButton = document.querySelector(".contact_button");
const modalCloseButton = document.querySelector(".modal_close_button");

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