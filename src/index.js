const toyCollection = document.querySelector("#toy-collection")
const URL = "http://localhost:3000/toys"
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

//  Show The Add Toy Form
let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
 
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


// GET FETCH
fetch(URL).then(r => r.json()).then(toysData => toysData.forEach(turnJSonToHTML))

// Slapping JSON on DOM. Helper Method
function turnJSonToHTML(toy) { 
  let newDiv = document.createElement('div')
  newDiv.className = "card"

  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let pTag = document.createElement('p')
  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like"
  img.className = "toy-avatar"
  h2.innerText = toy.name
  img.src = toy.image
  pTag.innerText = toy.likes 
  newDiv.append(h2,img,pTag,button)
  toyCollection.append(newDiv)  


button.addEventListener("click",() => { 
  let newLikes = parseInt(pTag.innerText)+1
  
  fetch(`http://localhost:3000/toys/${toy.id}`, { 
    method: "PATCH", 
    headers: { 
      "Content-Type": "application/json",
  "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
        })
        pTag.innerText = newLikes
}) 
}

// Creating new data
toyForm.addEventListener("submit", (event) => {
  event.preventDefault()
  fetch(URL, { 
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
              }, 
  body: JSON.stringify({
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  })
  
  }).then(r => r.json()).then(turnJSonToHTML)

})






