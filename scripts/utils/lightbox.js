/* global photographerName */
/* global mediasFilteredByPhotographer */

// Global DOM \\
const header = document.getElementById("header");
const main = document.getElementById("main");
const lightboxContainer = document.querySelector(".lightbox__container");
const lightboxModal = document.querySelector(".lightbox__modal");
const mediaContainer = document.querySelector(".lightbox__medias");
const leftArrow = document.querySelector(".fa-angle-left");
const rightArrow = document.querySelector(".fa-angle-right");

let lightboxMedias = [];
let currentMediaIndex = 0;

// Open Modal \\
function displayLightbox(media, photographerName, mediasFilteredByPhotographer) {
    console.log("MEDIA reçu :", media);
    // Display lightbox container
	lightboxContainer.style.display = "block";

    // Accessibility
    lightboxContainer.setAttribute("aria-hidden", "false");

    header.setAttribute("inert", "");
    main.setAttribute("inert", "");

    mediaContainer.focus();

    // console.log(main)
    console.log("Filtre actuel utilisé dans la lightbox :", window.selectedFilter);

    lightboxModal.setAttribute("aria-label", "image closeup view");

    mediaContainer.innerHTML = ``;

    // Set lightbox content if its an image or a video
    let mediaElement;
    if (media.image) {
        mediaElement = document.createElement("img");
        mediaElement.src = `../../assets/photographers/${photographerName}/${media.image}`;
        mediaElement.alt = media.title;
        mediaElement.classList.add("lightbox__medias__img")

    } else if (media.video) {
        mediaElement = document.createElement("video");
        mediaElement.controls = true;
        mediaElement.width = "700";
        mediaElement.height = "600";

        const source = document.createElement("source");
        source.src = `../../assets/photographers/${photographerName}/${media.video}`;
        source.type = "video/mp4";

        mediaElement.appendChild(source);
    }
    console.log("mediaElement :", mediaElement);
    
    // Create the media's title
    const mediaTitle = document.createElement("h3");
    mediaTitle.innerHTML = `${media.title}`;

    // Add the elements to the container
    mediaContainer.appendChild(mediaElement);
    mediaContainer.appendChild(mediaTitle);

    // Add medias to the lightboxMedias Array
    lightboxMedias = mediasFilteredByPhotographer;

    // Get the index
    currentMediaIndex = lightboxMedias.findIndex((m) => m.title === media.title);

    // Sort the medias in the lightbox depending on the current filter
    if (window.selectedFilter === "Titre") {
        lightboxMedias.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
        });

    } else if (window.selectedFilter === "Date") {
        lightboxMedias.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
              }
              if (a.date > b.date) {
                return 1;
              }
              return 0;
        });

    } else if (window.selectedFilter === "Popularité") {
        lightboxMedias.sort(function (a, b) {
            if (a.likes < b.likes) {
                return 1;
              }
              if (a.likes > b.likes) {
                return -1;
              }
              return 0;
        });
    }

    console.log("Index actuel :", currentMediaIndex);
    console.log("Tableau lightboxMedias :", lightboxMedias);

    return mediaElement, currentMediaIndex;
}

// Close Modal \\
function closeLightbox() {
    lightboxContainer.style.display = "none";
    lightboxContainer.setAttribute("aria-hidden", "true");

    header.removeAttribute("inert");
    main.removeAttribute("inert");

    main.focus();
}

// Arrows Management \\
// right arrow CLICK
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

// left arrow CLICK
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

// Keyboard Detection
document.addEventListener("keydown", (e) => {
    const isLightboxOpen = lightboxContainer.style.display === "block";

    // If lightbox is not displayed, nothing happen
    if (!isLightboxOpen) return;

    if (e.key === "ArrowRight") {
        nextMedia();
    } else if (e.key === "ArrowLeft") {
        prevMedia();
    } else if (e.key === "Escape") {
        closeLightbox();
    }
})