let addToy = false
// General Approach 
// 1. Fetch data from a server
// 2. Generate elements for the data
// 3. Slap that on the DOM
// 4. Add event listeners to make the page interactive
// 5. Make changes that persist on the server without having to refresh the page

const toysUrl = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.querySelector("#toy-collection")

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// initial fetch json -> forEach -> slapToyToPage(toy)
fetch(toysUrl)
  .then(r => r.json())
  .then(toysArr => toysArr.forEach(toy => slapToyToPage(toy)))

toyForm.addEventListener("submit", function(e) {
  // addEventListener to the form + preventDefault
  // console.log(e.target) to get field names
  // create const from e.target.field_name.value
  e.preventDefault()
  // console.log(e.target)
  const toyName  = e.target.name.value
  const toyImage = e.target.image.value
  // console.log(name, image)

    fetch(toysUrl, {
      method:  "POST", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    })
      .then(r => r.json())
      .then(toy => slapToyToPage(toy))
})



function slapToyToPage(toy) {
  // console.log(toy)
  // locate/create target toyCollectionDiv
  // create target cardDiv & attributes & append them to the div
  // append cardDiv to toyCollectionDiv
  const cardDiv = document.createElement("div")
  cardDiv.className  = "card"
    const h2           = document.createElement("h2")
      h2.innerText     = toy.name
    const img          = document.createElement("img")
      img.className    = "toy-avatar"
      img.src          = toy.image
    const p            = document.createElement("p")
      p.innerText      = toy.likes + " Likes"
    const button       = document.createElement("button")
      button.className = "like-btn"
      button.innerText = "Like <3"

  cardDiv.append(h2,img,p,button)
  // console.log(cardDiv)
  toyCollectionDiv.append(cardDiv)

  button.addEventListener("click", function(e) {
    increaseLikes(toy, p)
  })
  
}

function increaseLikes(toy, p) {
  // args are toy obj + p tag containing #likes
  // update toy.likes & fetch -> the server
  // slap #

  toy.likes += 1
  console.log(toy.likes)
  // p.innerText      = toy.likes + " Likes"

  fetch(`${toysUrl}/${toy.id}`, {
    method:  "PATCH", 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }, 
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
    .then(r => r.json())
    .then(toy => { 
      p.innerText      = toy.likes + " Likes"
    })
}
  