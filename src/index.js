let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

//ELEMENTS
 const toyDiv = document.querySelector("#toy-collection")
 const toyButton = document.querySelector("#new-toy-btn")
 const addToyForm = document.querySelector(".add-toy-form")

//INDEX ACTION GET REQUEST
//second .then should render/diplay all toys in the page
//for each obj make and element to slap it

fetch("http://localhost:3000/toys")
  .then((resp) => {
    return resp.json()
}).then((toyArray) => {
  displayAlltoys(toyArray)
})

//DOM manipulation
function displayOneToy(toy){
  const cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.innerHTML = ` <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} </p>
    <button class="like-btn">Like <3</button>`
    //slap it on the DOM
    toyDiv.append(cardDiv)

  ///--------------PATCH UPDATE-------------///
  const likeButtoon = cardDiv.querySelector(".like-btn")
  likeButtoon.addEventListener("click", (evt) => {
    evt.preventDefault()
    let input= parseInt(evt.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
          "likes": input
      })
  })
  .then((resp) => {
    return resp.json()
  })
  .then((likeObj) => {
      evt.target.previousElementSibling.innerText = `${input} likes`;
  })






})//addEventListener



}//end





//render All Toys on DOM //REad
function displayAlltoys(toyArray){
  toyArray.forEach((toy) => {
    //create element //DOM manipulation
    displayOneToy(toy)
  })
}

//Create Toy

addToyForm.addEventListener("submit",(evt) => {
  evt.preventDefault()
  let inputToyName = evt.target.name.value;
  let inputImageUrl = evt.target.image.value;
   // debugger
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputToyName,
      image: inputImageUrl,
      likes: 0
    })
  })
  .then((resp) => {
    debugger
    return resp.json()
  })
  .then((newtoy) => {
    debugger
    console.log(newtoy);
      displayOneToy(newtoy)
  })
})





























})
