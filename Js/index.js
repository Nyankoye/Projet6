async function request(url) {
    try {
        let res = await fetch(url)
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}

async function getHighestImdbScore() {
    let imdbList=[]
    let maxPage = 200

   for (let page = 1; page < maxPage+1; page++) {
        let currentUrl="http://localhost:8000/api/v1/titles/?page="+page
        let movies = await request(currentUrl)

       for (movie of movies.results){ 
        imdbList.push(Number(movie.imdb_score))
        }
    }
    return Math.max.apply(Math, imdbList)
}

async function highestMovieRequest(){

    let score = await getHighestImdbScore()
    let highestMovie = await request("http://localhost:8000/api/v1/titles/?imdb_score="+score)
    let image = document.getElementsByClassName('baniere__image')
    image[0].style.background= "no-repeat center center / cover url("+highestMovie.results[0].image_url+")"
    console.log(highestMovie.results[0].image_url)
}

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
            loop: false
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
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
    /**
     * @returns {Number}
     */

    get slidesVisible(){
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}

//------------------------------Modal--------------------------------------------------------


let modal = null
const focusableSelector = "button, a, input, textarea" // contient la liste des element focusable avec la tabulation
let focusablesElements = []
let previouslyFocusElement = null // variable permettant de memoriser l'element qui à été precedemment focus

const openModal = event => {
    event.preventDefault()
    modal = document.querySelector(event.target.getAttribute('href'))
    focusablesElements = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusElement = document.querySelector(':focus')
    modal.style.display = null //Permet de retirer le display none du html pour pouvoir afficher notre fêntre modal
    focusablesElements[0].focus()
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal','true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = event =>{
    if (modal === null){
        return
    }
    if (previouslyFocusElement !== null){
        previouslyFocusElement.focus()
    }
    event.preventDefault()
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click',closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    //--------------Gesion de l'effet de disparution----------------
    const hideModal = () => {
        modal.style.display = "none"
        modal.removeEventListener('animationend', hideModal)
        modal = null
    }
    modal.addEventListener('animationend', hideModal)
}

const stopPropagation = event => {
    event.stopPropagation()
}

/**
 * Fonction permettant le bon fonctionement de la tabulation
 * @param {event} event 
 */
const focusInModal = event => {
    event.preventDefault()
    let index = focusablesElements.findIndex(f => f === modal.querySelector(':focus'))
    if (event.shiftKey === true){
        index--
    } else{
        index++
    }
    if (index >= focusablesElements.length){
        index = 0
    }
    if (index < 0){
        index = focusablesElements.length -1
    }
    focusablesElements[index].focus()
    console.log(index)
}
/* Nous aimerions que l'orsque nous tappons sur la touche echap que nous puission 
naviguer entre les elements focusable dans la fênetre modale*/
window.addEventListener('keydown', event => {
    if(event.key === 'Escape' || event.key === 'Esc'){
        closeModal(event)
    }
    if(event.key === 'Tab' && modal !== null){
        focusInModal(event)
    }
})

document.addEventListener('DOMContentLoaded',function(){
    new Carousel(document.querySelector('.mieux-notes'),{
        slidesToScroll: 1,
        slidesVisible: 5,
        loop: false
    })

    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', openModal)
    })  

    highestMovieRequest();
})

