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

toysURL = 'http://localhost:3000/toys';

const toyForm = document.querySelector(".add-toy-form");
const toyCollection = document.querySelector("#toy-collection");

// to be used for each individual toy, taking toy as an argument
const renderToy = (toy) => {
  // can create node elements like so:
  // toy is given access to .Attributes through fetch
  const toyCard = `<div class="card" data-toy-id=${toy.id}><h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} like(s)</p><button class="like-btn">Like <3</button></div>`;
  // add new toyCard to collection
  toyCollection.innerHTML += toyCard;
}

const loadToys = () => {
  fetch(toysURL)
  .then(res => res.json())
  // do not need '()' after renderToy bc function is being called on toys.forach
  .then(toys => toys.forEach(renderToy))
}

// process form submission
const newToy = () => {
  // listen to submit
  toyForm.addEventListener("submit", function () {
    // prevent form submit 
    event.preventDefault();
    // set 'toy data'
    const toyData = {
      /* "The target property of the Event interface is a reference 
      to the object onto which the event was dispatched" - mdn */
      // basically toyForm is our object onto which the event was dispatched
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    }
    // what is reqObj? 
    /* ** reqObj is our post request with a string version of toyData,
    which is our new toy*/
    fetch(toysURL, reqObj)
    .then(res => res.json())
    // our new toy is created
    .then(toy => renderToy(toy))
  })
}

// get toy ccollection 
// 
const newLike = () => {
  toyCollection.addEventListener("click", () => {
    if(event.target.className === "like-btn") {
      increaseLike(event);
    };
  });
  
  const increaseLike = (event) => {
    const totalLikes = event.target.previousElementSibling;
    const addLike = parseInt(totalLikes.innerHTML) +1;
  
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": addLike})
    }
  
    const id = event.target.parentNode.dataset.toyId;
  
    fetch(`http://localhost:3000/toys/${id}`, reqObj)
    .then(resp => resp.json())
    .then(likeNum => totalLikes.innerHTML = `${addLike} Like(s)`)
  }
}



loadToys();
newToy();
newLike();