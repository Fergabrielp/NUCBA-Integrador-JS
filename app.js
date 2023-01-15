let cardContainer = document.getElementById('card-container')

// Conexion a la API

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '35a4fc8af3mshaa613f45a1e5bdep185f27jsn697ec9e4ccaf',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

const fetching = async (urlFilter) => {
    const urlBase = 'https://free-to-play-games-database.p.rapidapi.com/api/'
    const res = await fetch(urlBase + urlFilter, options)
    const data = await res.json()

    console.log(data[0])

    const card = `<div class="card">
                    <img src=${data[0].thumbnail} alt=${data[0].title} />
                    <h3>${data[0].title}</h3>
                    <p>${data[0].short_description}</p>
                    <div class="buy-container">
                        <h2 class="price"><span>U$D</span>${data[0].id / 4}</h2>
                        <button class="btn-add-cart">
                            <i class="fa-sharp fa-solid fa-cart-plus add-cart"></i>
                        </button>
                    </div>`


    return cardContainer.innerHTML += card
}

fetching('games')
