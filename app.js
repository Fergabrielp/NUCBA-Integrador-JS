const cardContainer = document.getElementById('card-container')
const btnBackPage = document.getElementById('btn-back-page')
const btnNextPage = document.getElementById('btn-next-page')
const numPage = document.getElementById('num-page')
const spinner = document.getElementById('spinner')
const categories = document.querySelectorAll('.btn-category')
const cart = document.querySelector('.cart-icon')


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
    showSpinner(true)
    const res = await fetch(urlBase + urlFilter, options)
    const data = await res.json()
    return [data]
}

const renderCard = async (data, start, end) => {
    showSpinner(false)
    const sliceArray = data.slice(start, end)
    const arrayCards = await sliceArray.map(card => {
        cardContainer.innerHTML +=
            `<div class="card">
                <img src=${card.thumbnail} alt=${card.title}/>
                <h3>${card.title}</h3>
                <p>${card.short_description}</p>
                <div class="buy-container">
                <h2 class="price"><span>U$D</span>${' ' + (card.id / 5).toFixed(2)}</h2>
                <button class="btn-add-cart" data-id=${card.id}>
                <i class="fa-sharp fa-solid fa-cart-plus add-cart"></i>
                </button>
                </div>
                </div>`
    })

    return arrayCards
}
const showSpinner = (condition) => {
    if (condition) {
        cardContainer.innerHTML = `<div class="sk-cube-grid" id="spinner">
                                    <div class="sk-cube sk-cube1"></div>
                                    <div class="sk-cube sk-cube2"></div>
                                    <div class="sk-cube sk-cube3"></div>
                                    <div class="sk-cube sk-cube4"></div>
                                    <div class="sk-cube sk-cube5"></div>
                                    <div class="sk-cube sk-cube6"></div>
                                    <div class="sk-cube sk-cube7"></div>
                                    <div class="sk-cube sk-cube8"></div>
                                    <div class="sk-cube sk-cube9"></div>
                                </div>`
    } else {
        cardContainer.innerHTML = ''
    }
}

const backPage = () => {
    cardContainer.innerHTML = ''
    if (pagination.categorie == 'best') {
        showBest()
    } else showCategory(pagination.categorie)

    pagination.start -= 20
    pagination.end -= 20
    btnNextPage.classList.remove('display-none')

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

    cardContainer.innerHTML = ''
    numPage.innerHTML = ((pagination.start / 20) + 1)
    if (pagination.categorie == 'best') {
        showBest()
    } else showCategory(pagination.categorie)
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
    } else {
        showCategory(categorySelected)
    }
    e.target.classList.add('selected')
}

const cartHandler = () => {
    console.log("Abriendo carrito...")
}

const addToCart = () => {
    console.log("Agregando al carrito...")
}
// -----------------------------------------------------------------------------------------------



const init = () => {
    showBest()
    categories.forEach(cat => { cat.addEventListener('click', selectCategorie) })
    btnBackPage.addEventListener('click', backPage)
    btnNextPage.addEventListener('click', nextPage)
    cart.addEventListener('click', cartHandler)

}

document.addEventListener("DOMContentLoaded", init);





