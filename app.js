let cardContainer = document.getElementById('card-container')
let btnBackPage = document.getElementById('btn-back-page')
let btnNextPage = document.getElementById('btn-next-page')
let numPage = document.getElementById('num-page')
let categories = document.querySelector('.category')

const pagination = {
    start: 0,
    end: 20
}

// ----------------------------------Configuración de la API-------------------------------

const urlBase = 'https://free-to-play-games-database.p.rapidapi.com/api/'

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '35a4fc8af3mshaa613f45a1e5bdep185f27jsn697ec9e4ccaf',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

// ---------------------------------------------------------------------------------------

const fetching = async (urlFilter) => {
    const res = await fetch(urlBase + urlFilter, options)
    const data = await res.json()
    return data
}

const renderCard = async (data, start, end) => {
    const sliceArray = data.slice(start, end)
    const arrayCards = await sliceArray.map(card => {
        cardContainer.innerHTML +=
            `<div class="card">
        <img src=${card.thumbnail} alt=${card.title} />
        <h3>${card.title}</h3>
        <p>${card.short_description}</p>
        <div class="buy-container">
            <h2 class="price"><span>U$D</span>${' ' + (card.id / 5).toFixed(2)}</h2>
            <button class="btn-add-cart">
                <i class="fa-sharp fa-solid fa-cart-plus add-cart"></i>
            </button>
        </div>`

    })

    return arrayCards
}


const backPage = () => {

    pagination.start -= 20
    pagination.end -= 20
    btnNextPage.classList.remove('display-none')
    console.log(pagination.start, pagination.end)

    if (pagination.start < 11) {
        btnBackPage.className += ' display-none'
        numPage.innerHTML = ''
        return
    }

    cardContainer.innerHTML = ''
    numPage.innerHTML = (pagination.start / 20)
    showBest()
}

const nextPage = () => {

    pagination.start += 20
    pagination.end += 20
    btnBackPage.classList.remove('display-none')
    console.log(pagination.start, pagination.end)

    if (pagination.end >= 240) {
        btnNextPage.className += ' display-none'
    }

    cardContainer.innerHTML = ''
    numPage.innerHTML = (pagination.start / 20)
    showBest()

}

const showBest = async () => {
    const dataFetched = await fetching('games')
    renderCard(dataFetched, pagination.start, pagination.end)
}

const showCategory = async (categorie) => {
    const dataFetched = await fetching(`games?category=${categorie}`)
    renderCard(dataFetched, pagination.start, pagination.end)
}

const changeCategory = (e) => {

}

// -----------------------------------------------------------------------------------------------

btnBackPage.addEventListener('click', backPage)
btnNextPage.addEventListener('click', nextPage)


const init = () => {
    showBest()
}

document.addEventListener("DOMContentLoaded", init);




