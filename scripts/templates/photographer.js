function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        // const article = document.querySelector( 'article' );
        // article.setAttribute("id", id);

        // const img = document.getElementById( 'photographer__img' );
        // img.setAttribute("src", picture);
        
        // const h2 = document.querySelector( 'h2' );
        // h2.textContent = name;

        // const localisation = document.querySelector( '.photographer__localisation' );
        // localisation.textContent = city + ", " + country;

        // const quote = document.querySelector( '.photographer__quote' );
        // quote.textContent = tagline;

        // const pricing = document.querySelector( '.photographer__pricing' );
        // pricing.textContent = price + "€/jour";

        //HTML IN JS
        const article = document.createElement( 'article' );
        article.setAttribute("id", id);

        const articleContent = `
            <a href="#">
                <img src="${picture}" alt="${name}">
                <h2>${name}</h2>
            </a>
            <p class="photographer__localisation">${city}, ${country}</p>
            <p class="photographer__quote">${tagline}</p>
            <p class="photographer__pricing">${price}€/jour</p>
        `;

        article.innerHTML = articleContent;
        return (article);
    }
    return { name, picture, getUserCardDOM }
}