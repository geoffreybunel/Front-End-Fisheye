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

function photographerProfilePicture(dataPhotographer) {
    const { portrait, name } = dataPhotographer;

    const photographerProfilePicture = document.createElement("div");

    photographerProfilePicture.innerHTML = `
        <img class="profile_picture" src="../../assets/photographers/Photographers ID Photos/${portrait}" alt="${name}">
    `;
    return photographerProfilePicture;
}

function photographerTarifs(dataPhotographer) {
    const { price } = dataPhotographer;

    const photographerTarifsContainer = document.querySelector(".tarifs");

    photographerTarifsContainer.innerHTML = `${price}€ / jour`;
}

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

    photographerTarifs(photographer);
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
