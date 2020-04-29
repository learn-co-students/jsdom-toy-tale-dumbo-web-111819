let addToy = false

//let newToyButton=document.querySelector("#new-toy-btn")
//console.log(newToyButton)
const addBtn = document.querySelector('#new-toy-btn')
//console.log(addBtn)
const toyForm = document.querySelector('.container')
//console.log(toyForm)
let divToyCollection=document.querySelector("#toy-collection")
//console.log(divToyCollection)

let toyUrl="http://localhost:3000/toys"
fetch(toyUrl)
.then(r => r.json())
.then(params => {
  convertJsonToHtml(params)
})
let convertJsonToHtml =(params) => {
  params.forEach(params => {
    let imgTag=document.createElement('img')
    imgTag.src=params.image
    imgTag.classList.add("toy-avatar") 

    let pTag=document.createElement('p')
    pTag.textContent=`${params.likes} Likes` 

    let hTag=document.createElement('h2')
    hTag.textContent=`${params.name}`

    let divTag=document.createElement('div')
    divTag.classList.add("card")

    let buttonTag=document.createElement('button')
    buttonTag.classList.add("like-btn")
    buttonTag.textContent='Like <3'

    divTag.append(hTag,imgTag,pTag,buttonTag)
 
    divToyCollection.append(divTag)

    //increase number of likes
    buttonTag.addEventListener("click",function(event){
      console.log(event.target.dataset.id)
      params.likes+=1
      fetch(`http://localhost:3000/toys/${params.id}`,
      { method:"PATCH",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({likes: params.likes})
      }) 
      //the response
      .then(r => r.json())
      .then(pTag.textContent=`${params.likes} Likes`)//params=>{pTag.innerText=params.likes
    })
  })
}






// let createImgTag=function(sourceImage,className){
//   let imgTag=document.createElement('img')
//   imgTag.src=sourceImage
//   imgTag.classList.add(className) 
//   return imgTag
// }
// let createPTag=function(number){
//   let pTag=document.createElement('p')
//   pTag.textContent=`${number} Likes`
//   return pTag
// }

// let createHTag=function(name){
//   let hTag=document.createElement('h2')
//   hTag.textContent=`${name}`
//   return hTag
// }
// let createDivTag=function(className){
//   let divTag=document.createElement('div')
//   divTag.classList.add(className)
//   return divTag
// }
// let createButtonTag=function(className){
//   let buttonTag=document.createElement('button')
//   buttonTag.classList.add(className)
//   buttonTag.textContent='Like <3'
//   return buttonTag
// }

// let createDivInnerHtml=function(createDivTag,createHTag,createImgTag,createPTag,createButtonTag){
//   return createDivTag.append(createHTag, createImgTag,createPTag,createButtonTag)
// }





addBtn.addEventListener('click', () => {  //listen for a click on the addBtn element
  // hide & seek with the form
  addToy = !addToy //set addToy to !false i.e. true
  if (addToy) {   //if true
    toyForm.style.display = 'block'//set the toyForm element to visible
  } else {      //if false
    toyForm.style.display = 'none' //set the toyform element to invisible. This is the default set in line 1
  }
})










