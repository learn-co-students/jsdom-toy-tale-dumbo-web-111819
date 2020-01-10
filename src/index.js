let addToy = false

// console.log(allToys)

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.getElementById("toy-collection")
  
  toyForm.addEventListener("submit",function(e){
    e.preventDefault()
    const input = e.target["name"].value
    const img = e.target["image"].value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": input,
        "image": img,
        "likes": 0
      })
    })
      .then(r => r.json())
      .then(createNewToy)
  })

  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then( toys => {
    toys.forEach(createNewToy)
    
  })
  
  function createNewToy (toy) {
    const newDiv = document.createElement("div"), 
    imgTag = document.createElement("img"), 
    hTag = document.createElement("h2"),
    pTag = document.createElement("p"),
    bttn = document.createElement("button")

    newDiv.className = "card" 
    hTag.innerText = toy.name
    imgTag.src = `${toy.image}`
    imgTag.className = "toy-avatar"
    pTag.innerText = toy.likes
    bttn.innerText = "Like <3"
    bttn.className = "like-btn"

    newDiv.append(hTag, imgTag, pTag, bttn)
    toyCollection.append(newDiv)

    bttn.addEventListener('click',() => {
      // DOM Manipulation
      let newLikeCount = Number(pTag.innerText) +1
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            "likes": newLikeCount
          })
        })
        pTag.innerText = newLikeCount
      })
  }

  addBtn.addEventListener('click', () => {
   
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
  
})

