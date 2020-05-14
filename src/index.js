let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  form.addEventListener("submit", createNewToy);

  // Fetch request to the server for all the toy objects
  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => renderToys(toys));
  }

  // For each toy object received, run createOneToy function
  function renderToys(toysList){
    toysList.forEach(toy => createOneToy(toy))
  }

  // Takes an argument of a toy object, creates a toy card using object data
  // Appends object onto toy container div and creates an event listener for like button
  function createOneToy(toy){
    let toyDesc = document.createElement("div")
    toyDesc.className = "card"
    toyDesc.id = `${toy.id}`
    toyDesc.innerHTML = `<h2>${toy.name}</h2>` +
    `<img src=${toy.image} class="toy-avatar" />` +
    `<p>${toy.likes} Likes </p>` +
    `<button class="like-btn" id="like${toy.id}">Like</button>`
    toyCollection.appendChild(toyDesc)
    const likeBtn = document.getElementById(`like${toy.id}`)
    likeBtn.addEventListener("click", likeToy)
  }

  // Function for when like button is clicked for a toy
  // Finds p tag with number of likes displayed. 
  // Increments this and uses data to send patch request to back-end
  function likeToy(event){
    debugger;
    let pTag = event.target.previousElementSibling
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
    fetch(`http://localhost:3000/toys/${event.target.parentNode.id}`, reqObj)
    .then(resp => resp.json())
    .then(toy => toy)

    if (intLike === 1){
      pTag.innerText = `${intLike} Like`
    } else {
      pTag.innerText = `${intLike} Likes`
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
    .then(toy => createOneToy(toy))
  }

  // First function called once DOM is loaded
  getToys();
});

