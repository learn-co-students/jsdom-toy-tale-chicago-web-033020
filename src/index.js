let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});




let toys = "http://localhost:3000/toys"
function listify(data){
  html = ''
  data.forEach(toy => html+= `<div class="card">
  <h1>${toy.name}</h1>
  <img src=${toy.image}></img>
  <p>${toy.likes} Likes</p>
  <button class="like-btn">Like &#60;3</button>
  </div>`)
  document.getElementById('toy-collection').innerHTML = html
}

function getToys(){
  fetch(toys)
  .then(res => res.json())
  .then(data => listify(data))
}

function listify(data){
  html = ''
  data.forEach(toy => html+= `<div class="card">
  <h1>${toy.name}</h1>
  <img src=${toy.image} width="250" height="250"></img>
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id='${toy.id}'>Like &#60;3</button>
  </div>`)
  document.getElementById('toy-collection').innerHTML = html
}

getToys()


button = document.querySelector(".submit")
button.addEventListener('click', postToy)

function postToy(){
  const name = document.querySelectorAll(".input-text")[0].value
  const image = document.querySelectorAll(".input-text")[1].value
  
  fetch('http://localhost:3000/toys', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  })
    .then(result => result.json())
    .then(data => console.log(data))
}


let toyCollection = document.getElementById('toy-collection')

 //event bubbling allows me to add one listener rather than a listener for each item in toy-collection.
toyCollection.addEventListener('click', likeToy)




//apparently previous sibling of my like button pulls up "#text." I don't know where that's coming from.
//I don't have anything with that ID or class name. I didn't add anything like that. Perplexing.
//In any event I have to go up by two siblings instead of one.


function likeToy(event){
  let likesNumber = parseInt(event.target.previousSibling.previousSibling.innerHTML.split(" ")[0])
  let likeElement = event.target.previousSibling.previousSibling
  if (event.target.className === 'like-btn'){
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: likesNumber += 1})
    })
      .then(result => result.json())
      likeElement.innerHTML = `${likesNumber} Likes` 
  }
}

// function likeToy(event){
//   console.log(event.target.previousSibling.previousSibling)
// }


// # Toy Tale

// You've got a friend in need! Your friend Andy recently misplaced all their toys!
// Help Andy recover their toys and get the toys back in the toy collection.

// ## Create Your Server

// All of the toy data is stored in the `db.json` file. You'll want to access this
// data using a JSON server. In order to do this, run the following two commands:

//    * `npm install -g json-server`
//    * `json-server --watch db.json`
   
// This will create a server storing all of our lost toy data with restful routes
// at `http://localhost:3000/toys`. You can also check out
// `http://localhost:3000/toys/:id`

// ## Fetch Andy's Toys

// On the `index.html` page, there is a `div` with the `id` "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects. With the
// response data, make a `<div class="card">` for each toy and add it to the
// toy-collection `div`.

// ## Add Toy Info to the Card

// Each card should have the following child elements:

//   * `h2` tag with the toy's name
//   * `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
//   * `p` tag with how many likes that toy has
//   * `button` tag with a class "like-btn"

// After all of that, the toy card should resemble:

// ```html
//   <div class="card">
//     <h2>Woody</h2>
//     <img src=toy_image_url class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div>
// ```


// ------done


// ## Add a New Toy

// * When a user clicks on the add new toy button, a `POST` request is sent to `http://localhost:3000/toys` and the new toy is added to Andy's Toy Collection.
// * The toy should conditionally render to the page.
// * In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as `POST` and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.

// ```
// POST http://localhost:3000/toys
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })
// ```

// * For examples, refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options).

// ## Increase Toy's Likes

// When a user clicks on a toy's like button, two things should happen:

//   * Conditional increase to the toy's like count without reloading the page
//   * A patch request sent to the server at `http://localhost:3000/toys/:id` updating the number of likes that the specific toy has
//   * Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)
  
// ```
// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "likes": <new number>
// })
// ```