const cardContainer = document.getElementById('card-container')
const btnBackPage = document.getElementById('btn-back-page')
const btnNextPage = document.getElementById('btn-next-page')
const numPage = document.getElementById('num-page')
const spinner = document.getElementById('spinner')
const categories = document.querySelectorAll('.btn-category')
const cart = document.querySelector('.cart-icon')
const cartMenu = document.getElementById('cart')
const overlay = document.querySelector('.overlay');


const pagination = {
    start: 0,
    end: 12,
    category: 'best',
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
    return data
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
    if (pagination.category == 'best') {
        showBest()
    } else showCategory(pagination.category)

    pagination.start -= 12
    pagination.end -= 12
    btnNextPage.classList.remove('display-none')

    if (pagination.start < 11) {
        btnBackPage.className += ' display-none'
        numPage.innerHTML = ''
        return
    }

    numPage.innerHTML = ((pagination.start / 12) + 1)

}

const nextPage = () => {
    window.scroll({
        top: 500,
        behavior: 'smooth'
    });

    pagination.start += 12
    pagination.end += 12
    if (pagination.end > pagination.lengthData) {
        btnNextPage.className += ' display-none'
    }
    btnBackPage.classList.remove('display-none')

    cardContainer.innerHTML = ''
    numPage.innerHTML = ((pagination.start / 12) + 1)
    if (pagination.category == 'best') {
        showBest()
    } else showCategory(pagination.category)
}

const showBest = async () => {
    const dataFetched = await fetching('games')
    pagination.lengthData = dataFetched.length
    if (pagination.end > pagination.lengthData) {
        btnNextPage.className += ' display-none'
    }
    renderCard(dataFetched, pagination.start, pagination.end)
}

const showCategory = async (category) => {

    const dataFetched = await fetching(`games?category=${category}`)
    pagination.lengthData = dataFetched.length
    if (pagination.end > pagination.lengthData) {
        btnNextPage.className += ' display-none'
    }
    renderCard(dataFetched, pagination.start, pagination.end)
}

const selectCategory = async (e) => {

    pagination.start = 0
    pagination.end = 12
    numPage.innerHTML = ''
    btnBackPage.className += ' display-none'
    btnNextPage.classList.remove('display-none')
    const categorySelected = e.target.dataset.category
    pagination.category = categorySelected
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

const toggleCart = () => {
    cartMenu.classList.toggle('open-cart');
    overlay.classList.toggle('show-overlay');
};

const scrollClosing = () => {
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
}

const OverlayClosing = () => {
    scrollClosing()
}

const addToCart = () => {
    console.log("Agregando al carrito...")
    cartMenu.className += ' hide-cart'
}
// -----------------------------------------------------------------------------------------------



const init = () => {
    showBest()
    categories.forEach(cat => { cat.addEventListener('click', selectCategory) })
    btnBackPage.addEventListener('click', backPage)
    btnNextPage.addEventListener('click', nextPage)
    cart.addEventListener('click', toggleCart)
    window.addEventListener('scroll', scrollClosing);
    overlay.addEventListener('click', OverlayClosing);

}

document.addEventListener("DOMContentLoaded", init);





