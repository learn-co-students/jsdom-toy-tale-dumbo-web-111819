let addToy = false
// base working copy ????
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
// newly created const below:
const toysUrl = 'http://localhost:3000/toys'
const toyCollectionDiv = document.querySelector("#toy-collection")

// console.log(addBtn, toyForm, toysUrl, toyCollectionDiv)
// console.log(cardDiv)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetch(toysUrl)
  .then(r => r.json())
  .then(toysArr => toysArr.forEach(toy => slapToPage(toy)))

function slapToPage(toy) {
// console.log(toy)
const cardDiv = document.createElement('div')
cardDiv.className = 'card'
  const h2 = document.createElement('h2')
  h2.innerText = toy.name
  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  const p = document.createElement('p')
  p.innerText = toy.likes + ' Likes'
  const button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like <3"

  button.addEventListener("click", () => {
    increaseLikes(toy, p)
  })

  cardDiv.append(h2,img,p,button)
  toyCollectionDiv.append(cardDiv)
}

function increaseLikes(toy, p) {
  toy.likes += 1

  fetch(`${toysUrl}/${toy.id}`, {
    method: "PATCH", 
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
    .then(r => r.json())
    // .then(likes => {
    //   p.innerText = toy.likes + ' Likes'
    // })

    .then(p.innerText = toy.likes + ' Likes')
    
  }

toyForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // console.log(e.target)

  const toyName = e.target.name.value
  const toyImage  = e.target.image.value
  // console.log(toyName, toyImage)

  fetch(toysUrl, {
    method: "POST", 
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name":  toyName,
      "image": toyImage,
      "likes": 0
    })
  })
    .then(r => r.json())
    .then(toy => slapToPage(toy))
})




