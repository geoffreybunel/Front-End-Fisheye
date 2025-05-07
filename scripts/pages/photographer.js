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

// Function to create the page template
function photographerPageTemplate(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        // Create the photographer Title informations
        const photographTitleInfo = document.createElement( 'div' );

        // Photographer Title's HTML code
        const photographTitleInfoContent = `
            <h1 class="photographer__h1">${name}</h1>
            <p class="photographer__localisation">${city}, ${country}</p>
            <p class="photographer__quote">${tagline}</p>
        `;

        photographTitleInfo.innerHTML = photographTitleInfoContent;
        return photographTitleInfo;
    }
    
    function getPhotographerProfilePicture() {
        // Create the photographer picture
        const photographImg = document.createElement( 'div' );

        // Photographer Title's HTML code
        const photographImgContent = `
            <img class="profile_picture" src="${picture}" alt="${name}">
        `;

        photographImg.innerHTML = photographImgContent;
        return photographImg;
    }

    return { getUserCardDOM, getPhotographerProfilePicture }
}

// Function to create the page template
function mediaTemplate(data, photographerName) {
    const { title, image } = data;

    function getMediaCardDOM() {
        // Create the photographer Title informations
        const article = document.createElement( 'article' );

        let firstName = photographerName.split(" ")[0];
        let mediaHTML = `<img src="../../assets/photographers/${firstName}/${image}" alt="${title}"`;

        const articleContent = `
            <div>
                ${mediaHTML}
                <p>${title}</p>
            </div>
        `;

        article.innerHTML = articleContent;
        return article;
    }

    return { getMediaCardDOM };
}

// Function to display Photographers's medias
async function displayMedia(media, photographerName) {
    const photographerSection = document.querySelector(".photographer_section");
    
    // Create and append each media card
    media.forEach(mediaItem => {
        const mediaModel = mediaTemplate(mediaItem, photographerName);
        photographerSection.appendChild(mediaModel.getMediaCardDOM());
    });

}

// Function to display Photographers infos
async function displayData(photographers, media) {
    const photographerHeader = document.querySelector(".photograph-header");
    const contactButton = photographerHeader.querySelector(".contact_button");

    const photographerId = getPhotographerId();
    const photographer = photographers.find(photographer => photographer.id === photographerId);

    // Filter media for this photographer
    const photographerMedia = media.filter(item => item.photographerId === photographerId);
    
    const photographerModel = photographerPageTemplate(photographer);

    photographerHeader.insertBefore(photographerModel.getUserCardDOM(), contactButton);
    photographerHeader.append(photographerModel.getPhotographerProfilePicture());

    // Display Medias
    displayMedia(photographerMedia, photographer.name)
}



// Function to initialize the code
async function init() {
    // Get data from photographers
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
}

init();
