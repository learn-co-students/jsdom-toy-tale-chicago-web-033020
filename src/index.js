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

function getToys(){
  fetch(toys)
  .then(res => res.json())
  .then(data => listify(data));
};

function listify(data){
  html = ''
  data.forEach(toy => html+= `<div class="card">
  <h1>${toy.name}</h1>
  <img src=${toy.image} width="250" height="250"></img>
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id='${toy.id}'>Like &#60;3</button>
  </div>`)
  document.getElementById('toy-collection').innerHTML = html
};

getToys();

button = document.querySelector(".submit");
button.addEventListener('click', postToy);

function postToy(){
  const name = document.querySelectorAll(".input-text")[0].value;
  const image = document.querySelectorAll(".input-text")[1].value;
  
  fetch('http://localhost:3000/toys', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  })
    .then(result => result.json())
    .then(data => console.log(data));
};

let toyCollection = document.getElementById('toy-collection');

 //event bubbling allows me to add one listener rather than a listener for each item in toy-collection.
toyCollection.addEventListener('click', likeToy);

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
  };
};

// function likeToy(event){
//   console.log(event.target.previousSibling.previousSibling)
// }
