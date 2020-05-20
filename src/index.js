let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");
  const collection = document.querySelector("#toy-collection");
  const toyUrl = "http://localhost:3000/toys";
  form.addEventListener("submit", addNewToy);
  collection.addEventListener("click", (event) => {
    if (event.target.className==="like-btn") {
      addLike(event)
    } else if (event.target.className ==="delete-btn") {
      deleteToy(event)
    }
  })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function fetchToys() {
    fetch(toyUrl)
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => renderOneToy(toy)))
  }

  function renderOneToy(toy) {
    const toyCard = `<div class="card" data-toy-id= "${toy.id}">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    <button class="delete-btn">Delete :(</button>
    </div>`
    collection.innerHTML += toyCard
  }

  
  function addNewToy(event) {
    event.preventDefault()

    const formData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }
    
    const formObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(toyUrl, formObj)
    .then(resp => resp.json())
    .then(toy => renderOneToy(toy))
  }

  function addLike(event) {
    const likeElement = event.target.previousElementSibling
    const likeNum = likeElement.innerText.split(" ")[0]
    const updatedLike = parseInt(likeNum) + 1

    const formData = {
      likes: updatedLike
    }

    const formObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(`${toyUrl}/${event.target.parentElement.dataset.toyId}`, formObj)
    .then(resp => resp.json())
    .then(toy => {
      likeElement.innerText = `${toy.likes} Likes`
    })
  }

  function deleteToy(event){

    const formObj = {
      method: "DELETE",
    }

    fetch(`${toyUrl}/${event.target.parentElement.dataset.toyId}`, formObj)
    .then(resp => resp.json())
    .then(toy => toy)
    
    event.target.parentElement.remove()
  }




  fetchToys()
});