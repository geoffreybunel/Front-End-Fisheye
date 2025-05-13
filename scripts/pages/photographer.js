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

function photographerInfos(data) {
    const { name, city, country, tagline } = data;

    const photographerTitleInfos = document.createElement("div");

    photographerTitleInfos.innerHTML = `
        <h1 class="photographer__h1">${name}</h1>
        <p class="photographer__localisation">${city}, ${country}</p>
        <p class="photographer__quote">${tagline}</p>
    `;
    return photographerTitleInfos;
}

function photographerProfilePicture(data) {
    const { portrait, name } = data;

    const photographerProfilePicture = document.createElement("div");

    photographerProfilePicture.innerHTML = `
        <img class="profile_picture" src="../../assets/photographers/Photographers ID Photos/${portrait}" alt="${name}">
    `;
    return photographerProfilePicture;
}

function mediasFactory(media, photographerName) {
    const { title, image, video } = media;
    const photographerMediasContent = document.createElement("article");

    if (image) {
        photographerMediasContent.innerHTML = `
            <img src="../../assets/photographers/${photographerName}/${image}" alt="${title}">
            <p>${title}</p>
        `;
    } else if (video) {
        photographerMediasContent.innerHTML =`
            <img src="../../assets/photographers/${photographerName}/${video}" alt="${title}">
            <p>${title}</p>
        `;
    }

    return photographerMediasContent;
}

function displayMedias(media, photographerName) {
    const photographerMediasContainer = document.querySelector(".photographer_medias");

    media.forEach(mediaItem => {
        const mediaModel = mediasFactory(mediaItem, photographerName);
        photographerMediasContainer.append(mediaModel);
    });
}

function displayData(photographers) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerId = getPhotographerId();
    const photographer = photographers.find(photographer => photographer.id === photographerId);

    const photographerInfosModel = photographerInfos(photographer);
    const photographerProfilePictureModel = photographerProfilePicture(photographer);

    photographerHeader.prepend(photographerInfosModel);
    photographerHeader.append(photographerProfilePictureModel);
}

async function init() {
    // Get data from photographers
    const { photographers, media } = await getPhotographers();
    const photographerId = getPhotographerId();

    const photographer = photographers.find(p => p.id === photographerId);

    displayData(photographers);

    const photographerMedias = media.filter(m => m.photographerId === photographerId);
    
    displayMedias(photographerMedias, photographer.name);
}

init();
