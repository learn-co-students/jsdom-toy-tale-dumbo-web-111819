let addToy = false




const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")




const toysUrl = "http://localhost:3000/toys"

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyForm.addEventListener("submit", function(e){
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImage = e.target.image.value

    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    })
    .then(r => r.json())
    .then(newToy => {
      makeToys(newToy)
    })
  })


  function loadtoys(){
    fetch(toysUrl)
    .then(r => r.json())
    .then(toysData => {
      toysData.forEach(toy => { 
        makeToys(toy)
      });
    })
  }
  loadtoys()

  function increaseLikes(toy, p){
    const newLikes = toy.likes += 1
    fetch(`${toysUrl}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(r => r.json())
    .then(updatedToy => {
      p.innerText = updatedToy.likes
    })
    }

    function deleteToy(toy, div){
      fetch(`${toysUrl}/${toy.id}`, {
        method: "DELETE" })
      .then(r=>r.json())
      .then( () => {
        div.remove()
      })
    }

  function makeToys(toy){
    // console.log(toy)
    const div = document.createElement("div")
    div.className = "card"
      const h2 = document.createElement("h2")
      h2.innerText = toy.name
      const img = document.createElement("img")
      img.src = toy.image
      img.className = "toy-avatar"
      const p = document.createElement("p")
      p.innerText = toy.likes

      const button = document.createElement("button")
      button.className = "like-btn"
      button.innerText = "Like <3"
      button.addEventListener("click", function(){
        increaseLikes(toy, p)
      })

      const delButton = document.createElement("button")
      delButton.innerText = "Delete"
      
    div.append(h2, img, p, button, delButton)
    toyCollection.append(div)

    delButton.addEventListener("click", function(){
      deleteToy(toy, div)
    })
  }
