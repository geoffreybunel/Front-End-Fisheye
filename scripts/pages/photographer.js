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
            <h1>${name}</h1>
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

    return { name, picture, getUserCardDOM, getPhotographerProfilePicture }
}

// Function to display Photographers infos
async function displayData(photographers) {
    const photographerId = getPhotographerId();
    const photographerHeader = document.querySelector(".photograph-header");

    const photographer = photographers.find(photographer => photographer.id === photographerId);
    const photographerPageModel = photographerPageTemplate(photographer);

    const contactButton = photographerHeader.querySelector(".contact_button");
    photographerHeader.insertBefore(photographerPageModel.getUserCardDOM(), contactButton);
    photographerHeader.append(photographerPageModel.getPhotographerProfilePicture());
}

// Function to initialize the code
async function init() {
    // Get data from photographers
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();