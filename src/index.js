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

  const toysUrl = 'http://localhost:3000/toys'

  function fetchToys() {
    fetch (toysUrl)
      .then(response => response.json())
      .then(toys => toys.forEach(renderToys))
  }

  const toyContainer = document.querySelector('#toy-collection')

  function renderToys(toy) {
    const eachToy = `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn" data-toy-id=${toy.id}>Like <3</button>
      </div>`
    toyContainer.innerHTML += eachToy
  }

  const form = document.querySelector('.add-toy-form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const toyData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    } 

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toyData)
    }

    fetch (toysUrl, reqObj)
      .then(response => response.json())
      .then(newToy => {
        renderToys(newToy)
      })

  });

  toyContainer.addEventListener('click', event => {
    if (event.target.className === 'like-btn') {
      addLike(event)
    }
  });

  function addLike (event) {
    const likedToyId = event.target.dataset.toyId
    const likesHtml = event.target.previousElementSibling.innerHTML[0]
    const toyLikes = parseInt(likesHtml)
    const toyAddedLikes = (toyLikes + 1)

    const patchObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      }, 
      body: JSON.stringify({"likes": toyAddedLikes})
    }

    fetch (`${toysUrl}/${likedToyId}`, patchObj)
      .then(response => response.json())
      .then(updatedToy => {
        event.target.previousElementSibling.innerHTML = `${updatedToy.likes} Likes`
        // likesTag.shift()
        // console.log(likesTag)
        // likesTag.replace(likesTag[0], updatedToy.likes)
        // console.log(event.target.previousElementSibling.innerHTML[0])
        // console.log(updatedToy.likes)
      })
  }



  fetchToys();
});
