let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')


  fetch('http://localhost:3000/toys') 
    .then(r => r.json())
    .then(addToys)

  function addToys(toys) {
    toys.forEach(function (toy){
      createToyCard(toy)
    })
  }
  
  function createToyCard(toy){
    let toyDiv = document.createElement('div') 
    toyDiv.className = 'card'
    toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button id=${toy.id} class="like-btn">Like <3</button>
    `
    toyCollection.append(toyDiv)

  }

  toyCollection.addEventListener("click", (e) => {
    if(typeof(e.target.id) === "number"){
      increaseLikeCount(toy.id, toy.likes)
    }
  })

  function increaseLikeCount(toyId, likes){
    console.log(toyId, likes)
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes++
      })
    })
  }

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let image = e.target.image.value
    postToy(name, image)
  })
  
  function postToy(name, image) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },         
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })        
    })
    .then(r => r.json())
    .then(createToyCard)
  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })


})




