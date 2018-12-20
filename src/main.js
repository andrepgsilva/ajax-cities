window.addEventListener('load', () => {
    const placeInput = document.querySelector('input.search');
    const suggestions = document.querySelector('ul.suggestions');
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    const fetchPlaces = () => {
        const places = [];

        return new Promise((resolve) => {
            fetch(endpoint)
            .then(response => {
                return response.json();
            })
            .then(jsonResolved => {
                places.push(...jsonResolved);
                resolve(places);
            });
        });
    };

    const findPlaces = () => {

        return new Promise((resolve) => {
            const exp = new RegExp(placeInput.value, 'gi');
            fetchPlaces()
            .then((places) => {
                $matchedPlaces = places.filter(place => {
                    if (placeInput.value != '') {
                        return place.city.match(exp) || place.state.match(exp);
                    }
                });
                resolve($matchedPlaces);
            });
        });
    };

    const showPlaces = (places) => {
        const html = places.map(place => {
            return `
                <li>
                    <span> ${place.city}, ${place.state}</span> 
                <li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    };

    placeInput.addEventListener('keyup', () => {
        findPlaces()
        .then(places => {
            showPlaces(places);
        });
    });
});
