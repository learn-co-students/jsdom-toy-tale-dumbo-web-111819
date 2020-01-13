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
  })
const toyDiv = document.querySelector("#toy-collection")
console.log(toyDiv)
fetch("http://localhost:3000/toys")
.then(r=> r.json())
.then(function(toyList) { 
  toyList.forEach(toy => {
    // With the response data, make a <div class="card"> 
    // for each toy and add it to the toy-collection div.
    const toyInnerDiv = document.createElement("div")
    toyInnerDiv.innerHTML = `<div class="card">
    
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  // we need to display the name and image url, likes  for each toy in order
    // 26--we have to interpolateinside of <h2>${toy.name}<h2> 
    // 27--we have to interpolate img<src =${toy.image} 
    // 28 -- we have to interpolate ${toy.likes}Likes has to be end
    // 28 removed numbered in the beginibg to see likes in order
  toyDiv.prepend(toyInnerDiv)
  // append "newDiv" which is (ToyInnerDiv(which we created new)) 
  // to ToyDiv(which we already on page we define in the begining)
  const toyLikeButton = document.querySelector(".like-btn")
  toyLikeButton.addEventListener("click",function(evt){
  toy.likes += 1
  //   evt.target.innerText = toy.likes
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: "PATCH",
    headers:{ "Content-Type": "application/json",
    Accept: "application/json"},
    body:JSON.stringify({
    likes:toy.likes
    })
    
  })
  .then(r => r.json())
  .then(function(toy){
   //toyDiv.likes.innerText = toy.likes
   let ptag = toyInnerDiv.querySelector('p')
   ptag.innerText = toy.likes + " likes"
  })
})//ToylikeEVENTlistener

});//FOREACH
})//fetch

// Create a new Toy 
// 1- we need to find form with document.querySelector
// then we need attached addEventListener to captured the Submit event
// 2- WE need to find name field 
// 3- we need the find image field


toyForm.addEventListener("submit",function(evt){
  evt.preventDefault()
  const toyImg = evt.target.image.value
  const toyName = evt.target.name.value
//(evt.target) it should give us form when we triggerd submit event

// Make a fetch request to post data entered by user  to json file 
fetch("http://localhost:3000/toys",{
method: "POST",//METHOD OF REQUEST
headers:{//headers tell to server type of data there are sending its JSONOBJECT
  "Content-Type": "application/json",
  "Accept": "application/json"
},
  body: JSON.stringify({
    name:toyName,//ATTRIBUTES OF FORM & JSONOBJECT
    image:toyImg,
    likes:0
    // we are sending POST Request to SERVER 
    // to with name and likes which user entered for form
  })//RESPONSE FROM SERVER

}) //fetch
.then(r => r.json())
.then(function(toyData){
// this method allows to  Not have to refresh page and get a new toy
  const toyInnerDiv = document.createElement("div")
    toyInnerDiv.innerHTML = `<div class="card">
    
    <h2>${toyData.name}</h2>
    <img src=${toyData.image} class="toy-avatar" />
    <p> ${toyData.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  //77- we have to change <h2> ${toyData.name} because toydate contains
  // object we get from server after it created above 
  // its one Toydata.When we created we create once in a time
  toyDiv.prepend(toyInnerDiv)
  /// after creating toyInnerDiv we need to append it 
  // to to original toyDiv
 
})//THEN

})//TOYFORM EventListener

 
})//DOMCONTENTLOADED








// fetch ("...", {
//   method: ...,
//   headers: {...},
//   body: JSON.stringify(
//     {

//     }
//   )
// })