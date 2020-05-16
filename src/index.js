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
    .then(toys => renderToys(toys))
}

function renderToys(toys) {
  toys.forEach(function(toy){
    
    toyCollection.innerHTML +=
     `<div class="card">
      <h2> ${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> ${toy.likes} Like(s) </p>
      <button class="like-btn">Like <3</button>
      </div>`

  })
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
     .then(toy => {
       const newToy = renderSingleToy(toy)
       toyCollection.innerHTML += newToy
     })
  })

}


function renderSingleToy(toy) {
  return (  `
  <div class="card">
    <h2> ${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> ${toy.likes} Like(s) </p>
      <button class="like-btn">Like <3</button>
  </div>`
  )
}


fetchToys()
newToyListener()