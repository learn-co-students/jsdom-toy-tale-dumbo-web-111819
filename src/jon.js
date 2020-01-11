const toyCollection = document.querySelector('#toy-collection')
const createToyBtn = document.querySelector('#new-toy-btn')
const toyFormDiv = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
//renders form when clicking initial 'add toy button'
createToyBtn.addEventListener('click', (e)=>{
    console.log(e)
    toyFormDiv.style.display = 'block'
})
//fetches database data on page load
fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
        json.forEach(addStuffToDom)
    })
//creates new toy
toyForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    // console.log(e.target.image.value)
    const newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
        }
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newToy)
    }
    fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(addStuffToDom)
})
//helper functions
const addStuffToDom = (toy) => {
    const toyCard = document.createElement('div')
    toyCard.className = 'card'
    toyCard.innerHTML = `<h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>Likes: <span>${toy.likes}</span></p>
        <button class="like-btn">Like <3</button>`
    let toyButton = toyCard.querySelector('button')
    toyButton.addEventListener('click', e =>{
        patchFetch(toy, toyCard)
    })
    toyCollection.append(toyCard)
}
let patchFetch = (toy, toyCard) => {
    let likes = toyCard.querySelector('p span')
    fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
            },
        body: JSON.stringify({
            likes: toy.likes += 1
        })
    })
        .then(likes.textContent = toy.likes)
}