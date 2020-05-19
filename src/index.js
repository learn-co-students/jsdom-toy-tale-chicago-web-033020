
const form = document.querySelector("form");
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById("toy-collection");
function main(){
  let addToy = false;

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
    // First function called once DOM is loaded
  getToys();
  // this is to watch for click of anything in the collection div
  toyCollection.addEventListener("click", handleClick)
  form.addEventListener("submit", createNewToy);
}

// Fetch request to the server for all the toy objects
function getToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => renderToys(toys));
}

// For each toy object received, run createOneToy function
function renderToys(toys){
  toys.forEach(toy => renderOneToy(toy))
}

// Takes an argument of a toy object, creates a toy card using object data
// Appends object onto toy container div and creates an event listener for like button
function renderOneToy(toy){
  const toyDesc = `<div class="card" id=${toy.id} data-id=${toy.id}>` +
  `<h2>${toy.name}</h2>` +
  `<img src=${toy.image} class="toy-avatar" />` +
  `<p>${toy.likes} Likes </p>` +
  `<button class="like-btn">Like ❤️</button>` + 
  `<button class="delete-btn">Delete</button>` +
  `</div>`

  // toyCollection.appendChild(toyDesc)
  toyCollection.innerHTML += toyDesc
 
}

// this is to check if the like or delete button is clicked and execute the 
// appropriate function
function handleClick(event){
  if (event.target.className === "like-btn") {
    likeToy(event)
  } else if (event.target.className === "delete-btn") {
    deleteToy(event)
  }
}

// Function for when like button is clicked for a toy
// Finds p tag with number of likes displayed. 
// Increments this and uses data to send patch request to back-end
function likeToy(event){
  event.preventDefault()
  const card = event.target.parentNode
  let pTag = card.querySelector('p')
  const likeEl = pTag.innerText.split(' ')[0]
  let intLike = parseInt(likeEl) + 1

  const formData = {
    likes: intLike
  }

  const reqObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
      // Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch(`http://localhost:3000/toys/${card.dataset.id}`, reqObj)
  .then(resp => resp.json())
  .then(toy => updateLike(intLike, pTag))

  function updateLike(intLike, pTag){
    if (intLike === 1){
      pTag.innerText = `${intLike} Like`
    } else {
      pTag.innerText = `${intLike} Likes`
    }
  }
}

function deleteToy(event){
  event.preventDefault();
  let card = event.target.parentNode

  const reqObj = {
    method: 'DELETE'
  }
  // delete is based on route so no data is passed in request object
  // toys/:id will tell it what to delete
  // execute removeToy to remove item from DOM after delete is successful
  fetch(`http://localhost:3000/toys/${card.dataset.id}`, reqObj)
  .then(resp => resp.json())
  .then(toy => removeToy(card))

  function removeToy(card){
    // card.parentNode.removeChild(card);
    card.remove()
  }

}

// Function to create a new toy using the form. Triggered on clicking submit
// Post request to data to database and creates a new toy on submission
function createNewToy(event){
  event.preventDefault();

  const formData = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  }

  event.target.reset();

  const reqObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
      // Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch('http://localhost:3000/toys', reqObj)
  .then(resp => resp.json())
  .then(toy => renderOneToy(toy))
}

main();

