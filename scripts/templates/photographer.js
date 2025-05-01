function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("id", id);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisation = document.createElement( 'p' );
        localisation.textContent = city + ", " + country;
        localisation.classList.add('photographer__localisation');

        const quote = document.createElement( 'p' );
        quote.textContent = tagline;
        quote.classList.add('photographer__quote');

        const pricing = document.createElement( 'p' );
        pricing.textContent = price + "€/jour";
        pricing.classList.add('photographer__pricing');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(quote);
        article.appendChild(pricing);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}