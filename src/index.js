console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function () {
    loadImages()
    loadBreeds()
})

function loadImages() { 
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
        data.message.forEach(image => addImage(image))
    })
}

function addImage(picUrl) {
    let container = document.querySelector("#dog-image-container")
    let newImage = document.createElement('img')
    newImage.src = picUrl 
    container.append(newImage)
}

function loadBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    fetch(breedUrl) 
    .then((res) => res.json())
    .then((data) => {
        // data.message.forEach(breeds => addBreed(breeds))
        breeds = Object.keys(data.message)
        updateBreedList(breeds)
        addBreedSelectListener()
    })
}

function addBreed(breedName) {
    let ul = document.querySelector("ul#dog-breeds")
    let li = document.createElement("li")
    li.textContent = breedName
    ul.append(li)
    li.addEventListener('click', function(evt) {
        evt.target.style.color = "blue"
    })
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds')
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)))
}

function addBreedSelectListener() { 
    let breedDropdown = document.querySelector("#breed-dropdown")
    breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value)
    })
}

function removeChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}