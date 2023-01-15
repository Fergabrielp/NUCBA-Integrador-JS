let cardContainer = document.getElementById('card-container')

// Conexion a la API

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '35a4fc8af3mshaa613f45a1e5bdep185f27jsn697ec9e4ccaf',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

const urlBase = 'https://free-to-play-games-database.p.rapidapi.com/api/'

const pagination = {
    start: 20,
    end: 40
}

const fetching = async (urlFilter) => {
    const res = await fetch(urlBase + urlFilter, options)
    const data = await res.json()
    return data
}

const renderCard = async (data, start = 0, end = 20) => {
    const sliceArray = data.slice(start, end)
    const arrayCards = await sliceArray.map(card => {
        cardContainer.innerHTML +=
            `<div class="card">
        <img src=${card.thumbnail} alt=${card.title} />
        <h3>${card.title}</h3>
        <p>${card.short_description}</p>
        <div class="buy-container">
            <h2 class="price"><span>U$D</span>${' ' + (card.id / 6.63).toFixed(2)}</h2>
            <button class="btn-add-cart">
                <i class="fa-sharp fa-solid fa-cart-plus add-cart"></i>
            </button>
        </div>`

    })

    return arrayCards
}


const showAll = async () => {
    const dataFetched = await fetching('games')
    renderCard(dataFetched, pagination.start, pagination.end)
}

const showCategory = async (categorie) => {
    const dataFetched = await fetching(`games?category=${categorie}`)
    renderCard(dataFetched, pagination.start, pagination.end)
}

showCategory('shooter')

// showAll()

// const init = () => {
//     fetching(`games`)

// }

// init()



