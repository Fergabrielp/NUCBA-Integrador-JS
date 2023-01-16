const cardContainer = document.getElementById('card-container')
const btnBackPage = document.getElementById('btn-back-page')
const btnNextPage = document.getElementById('btn-next-page')
const numPage = document.getElementById('num-page')
const categories = document.querySelectorAll('.btn-category')

const pagination = {
    start: 0,
    end: 20,
    categorie: 'best',
    lengthData: 0
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
    cardContainer.innerHTML = ''
    if (pagination.categorie == 'best') {
        showBest()
    } else showCategory(pagination.categorie)

    pagination.start -= 20
    pagination.end -= 20
    btnNextPage.classList.remove('display-none')
    // console.log(pagination.start, pagination.end)

    if (pagination.start < 11) {
        btnBackPage.className += ' display-none'
        numPage.innerHTML = ''
        return
    }

    numPage.innerHTML = ((pagination.start / 20) + 1)

}

const nextPage = () => {

    pagination.start += 20
    pagination.end += 20
    if (pagination.end > pagination.lengthData) {
        btnNextPage.className += ' display-none'
    }
    btnBackPage.classList.remove('display-none')
    console.log(pagination.start, pagination.end)

    cardContainer.innerHTML = ''
    numPage.innerHTML = ((pagination.start / 20) + 1)
    if (pagination.categorie == 'best') {
        showBest()
    } else showCategory(pagination.categorie)
    console.log(pagination.lengthData)
}

const showBest = async () => {
    const dataFetched = await fetching('games')
    pagination.lengthData = dataFetched.length
    if (pagination.end > pagination.lengthData) {
        btnNextPage.className += ' display-none'
    }
    renderCard(dataFetched, pagination.start, pagination.end)
}

const showCategory = async (categorie) => {

    const dataFetched = await fetching(`games?category=${categorie}`)
    pagination.lengthData = dataFetched.length
    console.log(pagination.end, pagination.lengthData)
    if (pagination.end > pagination.lengthData) {
        btnNextPage.className += ' display-none'
    }
    renderCard(dataFetched, pagination.start, pagination.end)
}

const selectCategorie = async (e) => {
    pagination.start = 0
    pagination.end = 20
    numPage.innerHTML = ''
    btnBackPage.className += ' display-none'
    btnNextPage.classList.remove('display-none')
    const categorySelected = e.target.dataset.category
    pagination.categorie = categorySelected
    const toDelete = document.getElementsByClassName('selected')
    toDelete[0].classList.remove('selected')
    cardContainer.innerHTML = ''
    if (categorySelected == 'best') {
        showBest()
    }

    e.target.classList.add('selected')
    showCategory(categorySelected)
}
// const arrayLoco = categories.forEach(cat => console.log(cat))
// -----------------------------------------------------------------------------------------------

btnBackPage.addEventListener('click', backPage)
btnNextPage.addEventListener('click', nextPage)
categories.forEach(cat => { cat.addEventListener('click', selectCategorie) })


const init = () => {
    showBest()
}

init()
// document.addEventListener("DOMContentLoaded", init);




