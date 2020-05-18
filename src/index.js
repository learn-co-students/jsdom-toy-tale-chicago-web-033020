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

let toyCollection = document.querySelector('#toy-collection')

function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(renderSingleToy))
}

function newToyListener() {

  const toyForm = document.querySelector('.add-toy-form')
  
  toyForm.addEventListener('submit', function() {
    event.preventDefault()
    const formData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
     }
     fetch('http://localhost:3000/toys', configObj)
     .then(resp => resp.json())
     .then(toy => renderSingleToy(toy)
     )
  })

}

function renderSingleToy(toy) {
  toyCollection.innerHTML +=  `
  <div class="card" data-id=${toy.id}>
    <h2> ${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Like(s)</p>
      <button class="like-btn">Like <3</button>
  </div>`
}

const toyCard = document.querySelector('#card')

function addLikes() {

  toyCollection.addEventListener('click', function(event) {
    
    if (event.target.className === 'like-btn'){

      increaseLike(event)
      
    }
  })
}

function increaseLike(event) {
  const likes = event.target.previousElementSibling
  let numLikes = parseInt(likes.innerHTML)+1

  const configObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": numLikes
    })
  }
  console.log('hello') 
  console.log(event.target)
  const id = event.target.parentNode.dataset.id
  fetch(`http://localhost:3000/toys/${id}`, configObj)
  
  .then(resp => resp.json())
  .then(likeNum => { 
    likes.innerHTML = `${numLikes} Like(s)`

  })
}

fetchToys()
newToyListener()
addLikes()