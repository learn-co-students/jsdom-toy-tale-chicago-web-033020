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

function main(){
  getToys();
  handleClick();
  likeClick();
}

const toyCollection = document.querySelector('#toy-collection')

// likes 

function likeClick(){
  toyCollection.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){
      const cardDiv = event.target.parentNode;
      const cls = cardDiv.children[2].innerHTML.split(' ')
      let cl = parseInt(cls[0]) + 1;

      const objReq = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'likes': cl
        })
      }

      fetch(`http:/localhost:3000/toys/${cardDiv.id}`, objReq)
      .then(resp => resp.json())
      .then(updatedToy => addLike(event, updatedToy))
    }
  })
}

function addLike(event, updatedToy){
  let old = event.target.parentNode.children[2];
  const newLikeElement = document.createElement('p');
  const newLikes = document.createTextNode(`${updatedToy.likes} Likes`);
  newLikeElement.appendChild(newLikes);
  old.replaceWith(newLikeElement);
}

// form submission

function handleClick(){
  const toyForm = document.querySelector('form')
  toyForm.addEventListener('submit', function(event){
    event.preventDefault();
    const formName = event.target[0].value;
    const formImage = event.target[1].value;
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    toyForm.reset();
    postForm(formName, formImage);
  })
}

function postForm(name, image){
  const objReq = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': `${name}`,
      'image': `${image}`,
      'likes': 0
    })
  };

  fetch('http://localhost:3000/toys', objReq)
  .then(resp => resp.json())
  .then(newToy => renderToy(newToy))
}

function renderToy(toy){
  toyCollection.innerHTML += `
  <div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
</div>`
}

// original display of toys

  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => renderAllToys(toys))
  } 

  function renderAllToys(toys){
    toys.forEach(function(toy){
      toyCollection.innerHTML += `
      <div class="card" id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`
    })
  };


main();