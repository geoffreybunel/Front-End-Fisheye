/* global photographerTemplate */

async function getPhotographers() {
    // Import Json file
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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    // For each photographer, display cardDOM from photographer.js (template)
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Get photographers data from JSON files
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    
