const cardContainer = document.getElementById('card-container')
const btnBackPage = document.getElementById('btn-back-page')
const btnNextPage = document.getElementById('btn-next-page')
const numPage = document.getElementById('num-page')
const spinner = document.getElementById('spinner')
const categories = document.querySelectorAll('.btn-category')
const cartIcon = document.querySelector('.cart-icon')
const cartMenu = document.getElementById('cart')
const overlay = document.querySelector('.overlay');
const cartContainer = document.getElementById('cart-container')
const cartTotalContainer = document.querySelector('.cart-total-container')
const cartBubble = document.querySelector('.cart-bubble')
const cartTotal = document.querySelector('.cart-total-value')
const emptyBtn = document.querySelector('.empty-cart-btn')
const buyBtn = document.querySelector('.buy-cart-btn')
const loginIcon = document.querySelector('.login-icon')
const logoutIcon = document.querySelector('.log-out')
const btnLight = document.getElementById('btn-light')
const body = document.getElementById('body')
const btnLogin = document.getElementById('btn-login')



const pagination = {
    start: 0,
    end: 12,
    category: 'all',
    lengthData: 0
}


let cart = JSON.parse(localStorage.getItem('cart')) || [];

let logged = Boolean(localStorage.getItem('logged'));

const saveLocalStorage = cartList => {
    localStorage.setItem('cart', JSON.stringify(cartList));
};


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

const checkLogging = (logged) => {
    if (logged) {
        loginIcon.classList = 'display-none'
        btnLogin.classList = 'display-none'
        cardContainer
    } else {
        logoutIcon.classList = 'display-none'
        loginIcon.classList = 'fa-sharp fa-solid fa-user login-icon'
        cartIcon.classList = 'display-none'
        btnLogin.classList.remove('display-none')

    }
}

const logout = e => {
    swallogut()
}

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
        const price = (card.id / 5).toFixed(2)
        cardContainer.innerHTML +=
            `<div class="card">
                <img src=${card.thumbnail} alt=${card.title}/>
                <h3>${card.title}</h3>
                <p>${card.short_description}</p>
                <div class="buy-container">
                    <h2 class="price"><span>U$D</span>${' ' + price}</h2>
                    <button 
                        class="btn-add-cart" 
                        data-id=${card.id}
                        data-title=${card.title}
                        data-img=${card.thumbnail}
                        data-price=${price}
                        >
                        🛒
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
    if (pagination.category == 'all') {
        showAll()
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
        top: 1000,
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
    if (pagination.category == 'all') {
        showAll()
    } else showCategory(pagination.category)
}

const showAll = async () => {
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
    if (categorySelected == 'all') {
        showAll()
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

const createCartProduct = product => {
    cart = [...cart, { ...product, units: 1 }];
};

const renderCartProduct = product => {
    const { title, price, img, units, id } = product
    return `
            <div class="cart-model">
                <div class="cart-img">
                <img
                    src="${img}"
                    alt="Hero image"
                    height="50px"
                />
                </div>
                <div class="cart-name">${title}</div>
                <div class="cart-price"><span>$</span> ${price}</div>
                <div class="cart-quantity">
                <i class="fa-solid fa-caret-up cart-quantity-up" data-id=${id}></i>${units}<i class="fa-solid fa-caret-down cart-quantity-down" data-id=${id}></i>
              </div>
            </div>`
};

const renderCart = (cart) => {
    if (!cart.length) {
        cartContainer.innerHTML = `</p>Your Cart is empty</p>`
        cartTotalContainer.classList = 'display-none'
    } else {
        cartContainer.innerHTML = cart.map(renderCartProduct).join('');
        cartTotalContainer.classList = 'cart-total-container'
    }
}

const addProduct = e => {
    const soundAdd = new Audio('../assets/audio/coin.wav')
    soundAdd.volume = 0.05
    if (!e.target.classList.contains('btn-add-cart')) return;
    if (logged) {
        const { id, title, price, img } = e.target.dataset;
        const product = { id, title, price, img }
        if (!isExistingProduct(product)) {
            createCartProduct(product)
            swalAdd("Game added to Cart!")
            soundAdd.play()
        } else {
            swalAdd("Game already added!");
        }
        checkCart()
    } else {
        swalAdd("Plase login to add Games to Cart");
    }
};


const renderBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.units, 0)
};

const checkCart = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    renderBubble()
    calculateTotal()
};

const unitHandler = e => {

    if (e.target.classList.contains("cart-quantity-up")) {
        if (isExistingProduct(e.target.dataset)) {
            const target = cart.filter(c => c.id === e.target.dataset.id)
            target[0].units += 1
            checkCart()
        }
    }
    if (e.target.classList.contains("cart-quantity-down")) {
        if (isExistingProduct(e.target.dataset)) {
            const target = cart.filter(c => c.id === e.target.dataset.id)
            if (target[0].units >= 2) {
                target[0].units -= 1
                checkCart()
            } else {
                swalDelete(e.target.dataset.id)
            }
        }
    }
    renderCart(cart);
}

const swalAdd = (msg) => {
    swal(msg, {
        buttons: false,
        timer: 1500,
    });
}

const swallogut = () => {
    swal({
        title: "Are you sure to logout?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willLogout) => {
            if (willLogout) {
                swal("Logout Success", {
                    icon: "success",
                });
                localStorage.removeItem('logged')
                checkLogging(false)
                window.location.href = "/index.html";
            } else {
                swal("You're still login");
            }
        });
}


const swalDelete = (id) => {
    const soundDelete = new Audio('../assets/audio/recycle-bin.mp3')
    soundDelete.volume = 1
    swal({
        title: "You're going to delete this Game from your Cart",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Game deleted from your Cart", {
                    icon: "success",
                });
                soundDelete.play()
                deleteProduct(id)
            } else {
                swal("Your Game is still in your Cart");
            }
        });
}

const swalDeleteAll = () => {
    const soundDelete = new Audio('../assets/audio/recycle-bin.mp3')
    soundDelete.volume = 1
    swal({
        title: "You're going to delete all your games from your Cart",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Your Cart is empty", {
                    icon: "success",
                });
                cart = []
                soundDelete.play()
                checkCart()
            } else {
                swal("Your Game is still in your Cart");
            }
        });
}

const swalBuy = () => {
    const sound = new Audio('./assets/audio/tada.mp3')
    sound.volume = 0.2
    const gamesCount = cart.reduce((acc, cur) => acc + cur.units, 0)
    const sum = cart.reduce((acc, cur) => acc + Number(cur.price) * cur.units, 0)
    const total = sum.toFixed(2)

    swal({
        title: "Are you shure to buy these games?",
        text: `You're going to buy ${gamesCount} game(s) for $${total}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willBuy) => {
            if (willBuy) {
                swal("🎉Congratulations, now let's play!🎉", {
                    icon: "success",
                });
                sound.play()
                cart = []
                checkCart()
            } else {
                swal("Ok, let's add more games 😉");
            }
        });
}


const deleteProduct = id => {
    cart = cart.filter(c => c.id !== id)
    checkCart()
}

const isExistingProduct = (product) => cart.some(game => game.id === product.id)

const calculateTotal = () => {
    const sum = cart.reduce((acc, cur) => acc + Number(cur.price) * cur.units, 0)
    const total = sum.toFixed(2)
    cartTotal.textContent = total
}

const emptyCart = () => {
    swalDeleteAll()
}

const buyProducts = () => {
    swalBuy()
}

const handleLightMode = () => {
    body.classList.toggle('light-mode')
}

// -----------------------------------------------------------------------------------------------


const init = () => {
    showAll()
    categories.forEach(cat => { cat.addEventListener('click', selectCategory) })
    btnBackPage.addEventListener('click', backPage)
    btnNextPage.addEventListener('click', nextPage)
    cartIcon.addEventListener('click', toggleCart)
    window.addEventListener('scroll', scrollClosing)
    overlay.addEventListener('click', OverlayClosing)
    cardContainer.addEventListener('click', addProduct)
    cartContainer.addEventListener('click', unitHandler)
    emptyBtn.addEventListener('click', emptyCart)
    buyBtn.addEventListener('click', buyProducts)
    logoutIcon.addEventListener('click', logout)
    btnLight.addEventListener('click', handleLightMode)
    checkCart()
    checkLogging(logged)
}

document.addEventListener("DOMContentLoaded", init);




