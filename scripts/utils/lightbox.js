// Global DOM \\Ò
const lightboxContainer = document.querySelector(".lightbox__container");
const lightboxModal = document.querySelector(".lightbox__modal");
const lightboxModalCloseButton = document.querySelector(".modal_close_button");
const mediaContainer = document.querySelector(".lightbox__medias");
const leftArrow = document.querySelector(".fa-angle-left");
const rightArrow = document.querySelector(".fa-angle-right");
const mediaTitle = document.querySelector(".lightbox__medias__title");

let lightboxMedias = [];
let currentMediaIndex = 0;

// Open Modal \\
function displayLightbox(media, photographerName, mediasFilteredByPhotographer) {
    console.log("MEDIA reçu :", media);
	lightboxContainer.style.display = "block";
    lightboxContainer.setAttribute("aria-hidden", "false");

    main.setAttribute("aria-hidden", "true");

    mediaContainer.innerHTML = ``;

    let mediaElement;
    if (media.image) {
        mediaElement = document.createElement("img");
        mediaElement.src = `../../assets/photographers/${photographerName}/${media.image}`;
        mediaElement.alt = media.title;
        mediaElement.classList.add("lightbox__medias__img")

    } else if (media.video) {
        mediaElement = document.createElement("video");
        mediaElement.controls = true;
        mediaElement.width = "1000";
        mediaElement.height = "900";

        const source = document.createElement("source");
        source.src = `../../assets/photographers/${photographerName}/${media.video}`;
        source.type = "video/mp4";

        mediaElement.appendChild(source);
    }
    console.log("mediaElement :", mediaElement);
    
    mediaContainer.appendChild(mediaElement);
    mediaTitle.textContent = media.title;

    lightboxMedias = mediasFilteredByPhotographer;
    currentMediaIndex = lightboxMedias.findIndex((m) => m.title === media.title);

    console.log("Index actuel :", currentMediaIndex);
    console.log("Tableau lightboxMedias :", lightboxMedias);

    return mediaElement, currentMediaIndex;
}

// Close Modal \\
function closeLightbox() {
    lightboxContainer.style.display = "none";
    lightboxContainer.setAttribute("aria-hidden", "true");

    main.setAttribute("aria-hidden", "false");
}

// Arrows Management \\
// right arrow
rightArrow.addEventListener("click", () => {
    nextMedia()
});

function nextMedia() {
    if (currentMediaIndex < lightboxMedias.length - 1) {
        currentMediaIndex++;
    } else {
        currentMediaIndex = 0;
    }

    const currentMedia = lightboxMedias[currentMediaIndex];

    console.log("Index actuel :", currentMediaIndex);
    console.log("Tableau lightboxMedias :", lightboxMedias);
    console.log("Media sélectionné :", currentMedia);
    displayLightbox(currentMedia, photographerName, mediasFilteredByPhotographer);
};

// left arrow
leftArrow.addEventListener("click", () => {
    prevMedia()
});

function prevMedia() {
    if (currentMediaIndex > 0) {
        currentMediaIndex--;
    } else {
        currentMediaIndex = lightboxMedias.length - 1;
    }

    const currentMedia = lightboxMedias[currentMediaIndex];

    console.log("Index actuel :", currentMediaIndex);
    console.log("Tableau lightboxMedias :", lightboxMedias);
    console.log("Media sélectionné :", currentMedia);
    displayLightbox(currentMedia, photographerName, mediasFilteredByPhotographer);
};