let mediasFilteredByPhotographer;
let photographerName = "";

// Use the getPhotographers function to import JSON on this webpage 
async function getPhotographers() {
    // Get data from Json file
    try {
      const response = await fetch("../../data/photographers.json");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error(error.message);
    }
}

// Function to get the photographer's id
function getPhotographerId() {
    const urlParams = new URL(document.location).searchParams;
    return parseInt(urlParams.get("id"));
}

// Get the photographer informations
function photographerInfos(dataPhotographer) {
    const { name, city, country, tagline } = dataPhotographer;

    const photographerTitleInfos = document.createElement("div");

    photographerTitleInfos.innerHTML = `
        <h1 class="photographer__h1">${name}</h1>
        <p class="photographer__localisation">${city}, ${country}</p>
        <p class="photographer__quote">${tagline}</p>
    `;
    return photographerTitleInfos;
}

// Get the photographer Profile Picture
function photographerProfilePicture(dataPhotographer) {
    const { portrait, name } = dataPhotographer;

    const photographerProfilePicture = document.createElement("div");

    photographerProfilePicture.innerHTML = `
        <img class="profile_picture" src="../../assets/photographers/Photographers ID Photos/${portrait}" alt="${name}">
    `;
    return photographerProfilePicture;
}

// Get the photographer total number of likes
function photographerLikes(media) {
    let sumLikes = 0;

    media.forEach(m => {
        const { likes } = m;
        sumLikes += likes;
      })

    const photographerLikesContainer = document.querySelector(".like_counter");
    photographerLikesContainer.innerHTML = `${sumLikes} <i class="fas fa-heart"></i>`;

    return photographerLikesContainer;
}

// Get the photographer price
function photographerTarifs(dataPhotographer) {
    const { price } = dataPhotographer;

    const photographerTarifsContainer = document.querySelector(".tarifs");

    photographerTarifsContainer.innerHTML = `${price}€ / jour`;

    return photographerTarifsContainer;
}

// Get the photographer name
function modalPhotographerName(dataPhotographer) {
    const { name } = dataPhotographer;

    const modalNameSubTitle = document.createElement("h2");

    modalNameSubTitle.innerHTML = `${name}`;
    return modalNameSubTitle;
}

// Get the Medias
function mediasFactory(media, photographerName) {
    const { title, image, video, likes } = media;
    const photographerMediasContent = document.createElement("article");

    if (image) {
        photographerMediasContent.innerHTML = `
            <img src="../../assets/photographers/${photographerName}/${image}" alt="${title}">
            <div class="medias__infos">
                <p>${title}</p>
                <div>
                    <span>${likes}</span>
                    <i class="fas fa-heart"></i>
                </div>     
            </div>
        `;
    } else if (video) {
        photographerMediasContent.innerHTML =`
            <video width="350" height="300">
                <source src="../../assets/photographers/${photographerName}/${video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="medias__infos">
                <p>${title}</p>
                <div>
                    <span>${likes}</span>
                    <i class="fas fa-heart"></i>
                </div>     
            </div>
        `;
    }

    return photographerMediasContent;
}

// Display medias
function displayMedias(media, photographerName) {
    const photographerMediasContainer = document.querySelector(".photographer_medias");

    media.forEach(mediaItem => {
        const mediaModel = mediasFactory(mediaItem, photographerName);
        photographerMediasContainer.append(mediaModel);
    });

    photographerLikes(media);
}

// Display data
function displayData(photographers) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerId = getPhotographerId();
    const photographer = photographers.find(photographer => photographer.id === photographerId);

    const photographerInfosModel = photographerInfos(photographer);
    const photographerProfilePictureModel = photographerProfilePicture(photographer);

    photographerHeader.prepend(photographerInfosModel);
    photographerHeader.append(photographerProfilePictureModel);

    photographerTarifs(photographer);

    const modalHeader = document.querySelector(".modal_header_title");

    const photographerName = modalPhotographerName(photographer);

    modalHeader.append(photographerName);
}

// Filter the medias by Title, Date or Popularity
function mediasFilter(selectedFilter) {
    let sortedMedias = [...mediasFilteredByPhotographer];

    if (selectedFilter === "Titre") {
        sortedMedias.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
        });

    } else if (selectedFilter === "Date") {
        sortedMedias.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
              }
              if (a.date > b.date) {
                return 1;
              }
              return 0;
        });

    } else if (selectedFilter === "Popularité") {
        sortedMedias.sort(function (a, b) {
            if (a.likes < b.likes) {
                return 1;
              }
              if (a.likes > b.likes) {
                return -1;
              }
              return 0;
        });
    }

    const photographerMediasContainer = document.querySelector(".photographer_medias");
    photographerMediasContainer.innerHTML = ``;

    displayMedias(sortedMedias, photographerName);

    return sortedMedias;
}

// Event for when we change the filter, we call the mediasFilter function
const filter = document.getElementById("filter");
filter.addEventListener("change", (event) => {
    const selectedFilter = event.target.value;

    mediasFilter(selectedFilter);
})



// Init
async function init() {
    // Get data from photographers
    const { photographers, media } = await getPhotographers();
    const photographerId = getPhotographerId();

    const photographer = photographers.find(p => p.id === photographerId);
    photographerName = photographer.name;

    displayData(photographers);

    const photographerMedias = media.filter(m => m.photographerId === photographerId);
    mediasFilteredByPhotographer = [...photographerMedias];

    
    displayMedias(photographerMedias, photographerName);
}

init();
