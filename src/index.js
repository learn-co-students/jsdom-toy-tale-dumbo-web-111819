  let addToy = false

  const toysUrl = "http://localhost:3000/toys"
  
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  
  const toyCollection = document.querySelector('#toy-collection')

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
    .then( r => r.json())
    .then( toysData => toysData.forEach(toy => generateToysElements(toy)))

    toyForm.addEventListener("submit", function(event){

      const toyName = event.target.name.value
      const toyImage = event.target.image.value
      event.preventDefault()

      fetch(toysUrl, {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": toyName,
          "image": toyImage,
          "likes": 0
        })
      })
      .then( r => r.json()
      .then(newToy => generateToysElements(newToy)))

    })

   
  function generateToysElements(toy){

      const div = document.createElement('div')
      div.className = "card"
      
      const h2 = document.createElement('h2')
      h2.textContent = toy.name
      

      const img = document.createElement('img')
      img.src = toy.image
      img.className = "toy-avatar"

      const p = document.createElement('p')
      p.innerText = toy.likes

      const button = document.createElement('button')
      button.className = "like-btn"
      button.textContent = "Like <3"

      div.append(h2, img, p, button)
      toyCollection.append(div)

      button.addEventListener("click", () => {
        increaseLikes(toy, p)
      }
        
      )
    }

    function increaseLikes(toy, elementToUpdate){

      const newLikes = toy.likes += 1

      fetch(`${toysUrl}/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        })
      })
      .then(r => r.json())
      .then(toy => {
        elementToUpdate.innerText = toy.likes
      })
    }
    



