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

    toyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const toyName = e.target.name.value
      const toyImage = e.target.image.value
      
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
                  "content-type": "application.json",
                  'accept': "application/json"
                },
        body: JSON.stringify({
            name: toyName,
            image: toyImage,
            likes: 0
        })
      })
      .then(r => r.json())
      .then(newToyData => { 
            newToyData
      })
    })
  });


})


fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toyData => {
    const toyDiv = document.querySelector("#toy-collection")
    //console.log(toyDiv)
    toyData.forEach((oneToy) => {
      const innerToyDiv = document.createElement('div')
      innerToyDiv.className = "card"
      innerToyDiv.innerHTML = `
        <h2>${oneToy.name}</h2>
        <img src="${oneToy.image}" class="toy-avatar" />
        <p>${oneToy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      `
      toyDiv.append(innerToyDiv)
    })
  })




