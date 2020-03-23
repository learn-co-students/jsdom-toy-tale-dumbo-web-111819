const addBtn = document.getElementById("new-toy-btn")


const toyForm = document.querySelector(".container")
let addToy = false 

document.addEventListener("DOMContentLoaded", ()=>{
  
  addBtn.addEventListener('click',() => {
     addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  let toyDiv = document.getElementById("toy-collection")
  
  fetch ("http://localhost:3000/toys")
  .then(r => r.json())
  .then(function(toyList){
    
    toyList.forEach(toy => {
      let toyList = document.createElement("div")
      toyList.innerHTML = `<div class="card">
      <h2>${toy.id}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>4 ${toy.likes} </p>
      <button data-id="${toy.id}" class="like-btn">Like <3</button>
      <button data-id="${toy.id}" class="delete-btn">Back in the toy chest</button>
      </div>`
      toyDiv.append(toyList)
    })
  })
  
  
  
  
  toyForm.addEventListener("submit", function(e){
    e.preventDefault()
  // grab the inputs from form 
    console.log(e.target.name)
    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    
       fetch("http://localhost:3000/toys",{
        method: "POST",
        headers:{
          "content-type":"application/json",
          "accept":"application/json"
        },
        body: JSON.stringify({
          name:toyName,
          image:toyImage,
          likes:99
        })
      })
 
  
    
    .then(r => r.json())
   .then (newToy => {
// Fetch updated the DB 
//NOW I NEED TO UPDATE DB
   


  let newToyDiv = document.createElement("div")
      newToyDiv.innerHTML = `<div class="card"><h2>${newToy.id}</h2><img src=${newToy.image} class="toy-avatar" /><p>4 ${newToy.likes} </p><button data-id="${newToy.id}" class="like-btn">Likes <3</button></div>`
     
      toyDiv.append(newToyDiv)
    console.log(e.target.reset)
    })
     
   })  
      })

      const toyCollection = document.getElementById("toy-collection")
      
      toyCollection.addEventListener("click",(e) => {
      
        if (e.target.className === "like-btn"){
        
        let currentLikes = 
        parseInt(e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1 
        e.target.previousElementSibling.innerText = newLikes +"likes"
        

        fetch(`http://localhost:3000/toys/
        
        ${e.target.dataset.id}`,{

          method: "PATCH",
          hearders : {
            "Content-Type": "application/json",
            "Accept":"application/json"
          },
          body:JSON.stringify({
            likes:newLikes
          })
        })
        }
        if (e.target.className === "delete-btn"){
          fetch(`http://localhost:3000/toys/
        
        ${e.target.dataset.id}`, {
      method:"DELETE"
      })
      .then(r => {
       e.target.parentElement.remove()
      })

        }
      })
    

    