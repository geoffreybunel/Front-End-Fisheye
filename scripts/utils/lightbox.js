// Global DOM
const lightboxContainer = document.querySelector(".lightbox__container");
const lightboxModal = document.querySelector(".lightbox__modal");
const lightboxModalCloseButton = document.querySelector(".modal_close_button");
const mediaContainer = document.querySelector(".lightbox__medias");
const leftArrow = document.querySelector(".fa-angle-left");
const rightArrow = document.querySelector(".fa-angle-right");
const mediaTitle = document.querySelector(".lightbox__medias__title");

function displayLightbox() {
	lightboxContainer.style.display = "block";
    lightboxContainer.setAttribute("aria-hidden", "false");

    main.setAttribute("aria-hidden", "true");
}

function closeLightbox() {
    lightboxContainer.style.display = "none";
    lightboxContainer.setAttribute("aria-hidden", "true");

    main.setAttribute("aria-hidden", "false");
}