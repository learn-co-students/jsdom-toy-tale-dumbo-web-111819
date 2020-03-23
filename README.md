# Toy Tale

You've got a friend in need! Your friend Andy recently misplaced all their toys!
Help Andy recover their toys and get the toys back in the toy collection.

## Create Your Server

All of the toy data is stored in the `db.json` file. You'll want to access this
data using a JSON server. In order to do this, run the following two commands:

   * `npm install -g json-server`
   * `json-server --watch db.json`
   
This will create a server storing all of our lost toy data with restful routes
at `http://localhost:3000/toys`. You can also check out
`http://localhost:3000/toys/:id`

## Fetch Andy's Toys

On the `index.html` page, there is a `div` with the `id` "toy-collection."

When the page loads, make a 'GET' request to fetch all the toy objects. With the
response data, make a `<div class="card">` for each toy and add it to the
toy-collection `div`.

## Add Toy Info to the Card

Each card should have the following child elements:

  * `h2` tag with the toy's name
  * `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
  * `p` tag with how many likes that toy has
  * `button` tag with a class "like-btn"

After all of that, the toy card should resemble:

```html
  <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
```

## Add a New Toy

* When a user clicks on the add new toy button, a `POST` request is sent to `http://localhost:3000/toys` and the new toy is added to Andy's Toy Collection.
* The toy should conditionally render to the page.
* In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as `POST` and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.

```
POST http://localhost:3000/toys
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
```

* For examples, refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options).

## Increase Toy's Likes

When a user clicks on a toy's like button, two things should happen:

  * Conditional increase to the toy's like count
  * A patch request sent to the server at `http://localhost:3000/toys/:id` updating the number of likes that the specific toy has
  * Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)
  
```
PATCH http://localhost:3000/toys/:id
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "likes": <new number>
})
```






const addBtn = document.querySelector("#new-toy-btn")
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
      <button class="like-btn">Likes <3</button>
      </div>`
      toyDiv.append(toyList)
    })
  })
  
  
  
  toyForm.addEventListener("submit", function(event){
    event.preventDefault()
  
    
    const toyImg = event.target.value
    const toyName = event.target.value
    
    
       fetch("http://localhost:3000/toys",{
        method: "POST",
        headers:{
          "content-type":"application/json",
          "accept":"application/json"
        },
        body: JSON.stringify({
          name:toyName,
          image:toyImg,
          likes:0
        })
      })
 
  
    
    .then(r => r.json())
    .then(function(toyData ) {

      let newToyDiv = document.createElement("div")
      newToyDiv.innerHTML = `<div class="card">
      <h2>${toyData.id}</h2>
      <img src=${toyData.image} class="toy-avatar" />
      <p>4 ${toyData.likes} </p>
      <button class="like-btn">Likes <3</button>
      </div>`
      toyDiv.prepend(newToyDiv)
    
    })
     
        
      })
    })