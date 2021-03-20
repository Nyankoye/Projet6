//------------------------les liste des URL-------------------------------------------
let urlListBestMovies = ['http://localhost:8000/api/v1/titles/?sort_by=-imdb_score','http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score']
let urlListBestMoviesActions = ['http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score','http://localhost:8000/api/v1/titles/?genre=Action&page=2&sort_by=-imdb_score']
let urlListBestMoviesHorror = ['http://localhost:8000/api/v1/titles/?genre=Horror&sort_by=-imdb_score','http://localhost:8000/api/v1/titles/?genre=Horror&page=2&sort_by=-imdb_score']
let urlListBestMoviesSf = ['http://localhost:8000/api/v1/titles/?genre=Sci-fi&sort_by=-imdb_score','http://localhost:8000/api/v1/titles/?genre=Sci-fi&page=2&sort_by=-imdb_score']


//----------------------------les Classes------------------------------------------
class Carousel{

    /**
     * This callback type is called `requestCallback` and is displayed as a global symbol.
     *
     * @callback moveCallbacks
     * @param {number} index
     */

    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} [Options.slidesToScroll = 1] Nombre d'élements à faire défiler
     * @param {Object} [options.slidesVisible = 1] Nombre d'élements visible dans la slides
     * @param {boolean} [options.loop = false] s'il faut boucler ou non à la fin de notre carousel
     */
    constructor(element,options={}){
        this.element=element
        this.options = Object.assign({},{
            slidesVisible: 1,
            slidesToScroll:1,
            loop: true
        },options)
        /* la variable children ne contiendra que seulement les elements
         enfant de base sans compter le nouvelle element couresel */
        let children=[].slice.call(element.children)
        this.currentSlide = 0
        this.moveCallbacks = []
        this.isMobile = false
        //-------------------Création et  Modification du DOM--------------------
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        // Ajout des elements dans la classe carousel__container
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
       
        //------------------Evenements-------------------------------------
        this.moveCallbacks.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    /**
     * Applique les bonnes dimensions aux élements du carousel
     */
    setStyle(){
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio*100) + "%"
        this.items.forEach(item => item.style.width = ((100/this.slidesVisible) / ratio) + "%")
    }

    createNavigation(){
        let nextButton = this.createDivWithClass('carousel__next')
        let prevBoutton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevBoutton)
        nextButton.addEventListener('click',this.next.bind(this))
        prevBoutton.addEventListener('click',this.prev.bind(this))
        if(this.options.loop = false){
            return
        }
        // Cacher le boutton de navigation s'il n'y a plus d'element
        this.onMove(index =>{
            if (index === 0){
                prevBoutton.classList.add('carousel__prev--hidden')
            } else{
                prevBoutton.classList.remove('carousel__prev--hidden')
            }
            if(this.items[this.currentSlide + this.slidesVisible]===undefined){
                nextButton.classList.add('carousel__next--hidden')
            }else{
                nextButton.classList.remove('carousel__next--hidden')
            }
        })
    }
    next(){
        this.gotoSlide(this.currentSlide + this.slidesToScroll)
    }
    
    prev(){
        this.gotoSlide(this.currentSlide - this.slidesToScroll)
    }
    /**
     * Deplace le carousel vers l'élement ciblé
     * @param {number} index 
     */
    gotoSlide(index){
        if(index < 0){
            if (this.options.loop){
                index = this.items.length - this.slidesVisible
            }else{
                return
            }
        } else if (index >= this.items.length || (this.items[this.currentSlide + this.slidesVisible] === undefined && index > this.currentSlide) ){
            if (this.options.loop){
                index = 0
            }else{
                return
            }
        }
        let transletX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + transletX + '%, 0, 0)'
        this.currentSlide = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    /**
     * 
     * @param {moveCallbacks} cb 
     */
    onMove(cb){
        this.moveCallbacks.push(cb)
    }

    onWindowResize(){
        let mobile = window.innerWidth < 700
        if (mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentSlide))
        }
    
    }

    /**
     * 
     * @param {string} className 
     * @returns {string}
     */
    createDivWithClass(className){
        let div = document.createElement('div')
        div.setAttribute('class',className)
        return div
    }

    /**
     * @returns {Number}
     */

    get slidesToScroll(){
        return this.isMobile ? 2 : this.options.slidesToScroll
    }
    /**
     * @returns {Number}
     */

    get slidesVisible(){
        return this.isMobile ? 2 : this.options.slidesVisible
    } 
}

//------------------------------Modal--------------------------------------------------------

class Modal {
    constructor(){
        this.modalContainer = document.createElement('div')
        this.modalContainer.className = 'modal'
        document.body.appendChild(this.modalContainer)

        const contentContainer = document.createElement('div')
        contentContainer.className = 'container'
        this.modalContainer.appendChild(contentContainer)

        const closeButton = document.createElement('button')
        closeButton.innerHTML = '&times;'
        closeButton.className = 'close-button'
        contentContainer.appendChild(closeButton)
        closeButton.addEventListener('click', () =>{
            this.close()
        })
        
        this.closeWithEscape()

        this.content = document.createElement('div')
        contentContainer.appendChild(this.content)
    }
    set html(value){
        this.content.innerHTML = value;
    }
    open(){
        this.modalContainer.classList.add('open')
    }
    close(){
        this.modalContainer.classList.remove('open')
    }
    /**
     * Fontion permetant de fermer notre fenêtre modal en tappant sur la touche echap 
     */
    closeWithEscape(){
        window.addEventListener('keydown', event => {
            if(event.key === 'Escape' || event.key === 'Esc'){
                this.close()
            }
        })
    }
}
//---------------------------Les Fonctions--------------------------------------------------
/**
 * Cette focntion permet d'envoyer une requête AJAX 
 * @param {string} url lien
 * @returns {JSON} une reponse sous format JSON
 */
async function request(url) {
    try {
        let res = await fetch(url)
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}

/**
 * Recuperer les informations du meilleur film
 */
async function highestImdbScoreMovie(){
    let movies = await request('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    let infosMovie = document.querySelector('.baniere__infos')
    document.querySelector('.summary')
    movieTitle = document.createElement('h1')
    infosMovie.insertAdjacentElement('afterbegin',movieTitle) // inserer l'element juste arès l'element parent
    movieTitle.textContent = movies.results[0].title
    let movieImage = document.querySelector('.baniere__image')
    movieImage.innerHTML = `<img id=${movies.results[0].id} src=${movies.results[0].image_url}></img>`
    button = document.querySelector('.btn')
    button.addEventListener('click', function(){
        displayModal(movies.results[0].id)
    })
}

/**
 * cette focntion permet de faire une requête puis de recuperer le contenu du HTML model et 
 * de l'afficher dans une fenetre modale
 * @param {Number} id identifiant du film à chercher
 */
async function displayModal(id) {
    let response = await fetch('/modal.html')
    let movie = await request('http://localhost:8000/api/v1/titles/'+id)
    if (response.status === 200) {
        let html = await response.text();
        const element = document.createRange().createContextualFragment(html).querySelector('.modal')
        writeModalContent(element,movie)
        let modal = new Modal();
        modal.html = element.innerHTML
        modal.open()
    }
}

/**
 * Cette fontion nous permet d'écrire des informations supplementaire sur la fênetre modale 
 * @param {Array} movie lites des film
 */
function writeModalContent(element,movie){

    let title = element.querySelector('.infos_header')
    title.innerHTML = `<h1 id="titlemodal">${movie.title}</h1><span> Durée: ${formatDuration(movie.duration)} | 
    </span><span>Date: ${movie.year}| </span><span>Score: ${movie.imdb_score}| </span>
    <span> Rated: ${movie.rated}</span>`

    title.insertAdjacentHTML('beforeend',`<p class="resume"> Description: ${movie.description}</p>`)

    let image = element.querySelector('.infos_image')
    image.innerHTML = `<img src="${movie.image_url}" alt="image film">`

    let boxOffice = element.querySelector('.box-Office')
    boxOffice.innerHTML=`Box Office: ${formatMoney(movie.worldwide_gross_income)} | Genres`

    let genres = element.querySelector('.genres')
    arrayTest(movie.genres,genres)

    genres.insertAdjacentHTML('afterend',` |Pays:`)
    let countries = element.querySelector('.pays')
    arrayTest(movie.countries,countries)
    
    let actors = element.querySelector('.acteurs')
    actors.insertAdjacentHTML('afterbegin','Acteurs: ')
    arrayTest(movie.actors,actors)

    let directors = element.querySelector('.directors')
    directors.insertAdjacentHTML('afterbegin','Réalisateur: ')
    arrayTest(movie.directors,directors)
}

/**
 * @param {Array} array liste à parcourir si possible
 * @param {string} element balise html selectionnée
 */
const arrayTest = (array,element) =>{
    if (Array.isArray(array)){
        for(value of array){
            element.insertAdjacentHTML('beforeend',`<span> ${value},</span>`)
        }
    }else{
        element.insertAdjacentHTML('beforeend',`<span> ${array},</span>`)
    }
}

/**
 * formate la durée par exemple: 1h 30min
 * @param {Number} duration le nombre de minute
 * @returns {string} le nouveau format
 */
const formatDuration = (duration) =>{
    let hours = 0
    let minutes = 0
    if(duration >= 60){
        hours = Math.trunc(duration/60)
        minutes = duration % 60
        if (minutes === 0){
            return `${hours}h`
        }else{
            return `${hours}h ${minutes}min`
        }
    }else{
        minutes = duration
        return `${minutes}min`
    }
}

/**
 * Format monétaire d’un nombre
 * @param {Number} money le nombre à formater
 * @returns {string} le nombre formaté
 */
const formatMoney = (money) =>{
    if (money !== null){
        const usd = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          });
          return usd.format(money)
    }else{
        return "Pas d'infos"
    }
}

/**
 * Cette fontcion pertmet de recuperer des film d'une categorie données
 * @param {Array} urlList contien la liste des liens à parcourir
 * @param {string} categorie le nom de la classe de la div contenant les images des films
 */
async function highestsImdbScoreMovies(urlList,categorie){
    let bestMovie = document.querySelector(`.${categorie}`)

    for (url of urlList){
        let movies = await request(url)
        movies.results.forEach(movie =>{
            let item = document.createElement('div')
            bestMovie.appendChild(item)
            item.innerHTML = `<img id=${movie.id} src=${movie.image_url}></img>`
            document.getElementById(`${movie.id}`).addEventListener('click', function(){
                displayModal(movie.id)
            })
        })
    }

    new Carousel(document.querySelector(`.${categorie}`),{
        slidesToScroll: 1,
        slidesVisible: 5,
    })
}




//---------------------------------Main---------------------------------

document.addEventListener('DOMContentLoaded',function(){  
    highestImdbScoreMovie()
    highestsImdbScoreMovies(urlListBestMovies,'mieux-notes')
    highestsImdbScoreMovies(urlListBestMoviesActions,'action')
    highestsImdbScoreMovies(urlListBestMoviesHorror,'horreur')
    highestsImdbScoreMovies(urlListBestMoviesSf,'sf')
})