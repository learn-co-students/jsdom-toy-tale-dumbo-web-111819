let addToy = false

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.getElementById("toy-collection")  
const toysUrl = 'http://localhost:3000/toys'

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

initialLoad();
toyForm.addEventListener('submit', e =>  {
  e.preventDefault()
  const toyName = e.target.name.value
  const toyImg  = e.target.image.value

  fetch(toysUrl, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }, 
    body: JSON.stringify({
      "name": toyName,
      "image": toyImg,
      "likes": 0
    })
  })
    .then(r => r.json())
    .then(toy => {
      renderEachToy(toy)
    })
})

function initialLoad() {
  fetch(toysUrl)
    .then(r => r.json())
    .then(toysArr => toysArr.forEach(renderEachToy))
} 

function renderEachToy(toy) {
  // console.log(toy)
  const toyDiv = document.createElement('div')
  toyDiv.className = "card"
  // toyDiv.innerHTML = 
  //   `
  //   <h2>${toy.name}</h2>
  //   <img src=${toy.image} class="toy-avatar" />
  //   <p>${toy.likes} Likes </p>
  //   <button class="like-btn">Like <3</button>
  // `
  const h2 = document.createElement('h2')
    h2.innerText = toy.name
  const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
  const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`
  const button = document.createElement('button') 
    button.className = "like-btn"
    button.innerText = 'Like <3'
  
  button.addEventListener('click', e => {
    increaseLikes(toy, p)
  })

  toyDiv.append(h2, img, p, button)
  toyCollectionDiv.append(toyDiv)
}

function increaseLikes(toy,p) {
  toy.likes += 1
  fetch(`${toysUrl}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
    .then(r => r.json())
    .then(toyObj => {
      p.innerText = `${toy.likes} Likes`
    })
}