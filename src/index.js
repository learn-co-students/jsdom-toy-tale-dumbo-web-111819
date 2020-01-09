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
      <p data-id=${toy.id}> ${toy.likes} Likes </p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
    `

    toyCollection.append(toyDiv)

    toyDiv.addEventListener("click", (e) => {
      if(e.target.tagName === "BUTTON"){
        toy.likes++
        increaseLikeCount(toy.id, toy.likes)
      }
    })
  }

  function increaseLikeCount(id, likes){
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
    })
    .then(r => r.json())
    .then(data => {
      let like = document.querySelector(`[data-id='${id}']`)
      let likeArr = like.innerText.split(" ")
      let newCount = parseInt(likeArr[0]) + 1
      like.innerText = `${newCount} Likes`
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

