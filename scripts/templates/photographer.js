function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        // Create the photographers cards
        const article = document.createElement( 'article' );
        article.setAttribute("id", id);

        // Cards's HTML code
        const articleContent = `
            <a href="../../photographer.html?id=${id}" aria-label="Lien vers la page de ${name}">
                <img src="${picture}" alt="${name}">
                <h2>${name}</h2>
            </a>
            <p class="cards__localisation">${city}, ${country}</p>
            <p class="cards__quote">${tagline}</p>
            <p class="cards__pricing">${price}€/jour</p>
        `;

        article.innerHTML = articleContent;
        return (article);
    }
    return { name, picture, getUserCardDOM }
}