let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let toyCollection = document.getElementById("toy-collection");
  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", createNewToy);

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // fetch toys
  function getToys() {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => renderToys(toys))
  }

  // render all toys
  function renderToys(toysList) {
   createToy(toysList)
  }

  // helper function to render one toy
  function createToy(toys) {
    for (const toy in toys) {
    let toyCard = document.createElement("div");
    toyCard.id = `${toys[toy].id}`
    toyCard.setAttribute("class", "card");
    toyCard.innerHTML = 
      `<h2>${toys[toy].name}</h2>` +
      `<img src=${toys[toy].image} class="toy-avatar"/>` +
      `<p>${toys[toy].likes} Likes </p>` + 
      `<button class="like-btn"> Like <3 </button>` + 
      `<button class="delete-btn"> Delete </button>`
    toyCollection.append(toyCard)
    }

    toyCollection.addEventListener("click", 
    function(event) {
      if (event.target.className == 'like-btn') {
        addLike(event)
      } else if (event.target.className == 'delete-btn') {
        deleteToy(event)
      } else {
        return
      }
    })
  }
  
  // add a new toy using the form
  function createNewToy(event) {
    event.preventDefault();
    
    let formData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }
    event.target.reset();

    let formObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch("http://localhost:3000/toys", formObj)
    .then(response => response.json())
    .then(toy => createToy(toy))
  }

  // increase a toy's likes
  // conditional increase to the toy's like count without reloading the page
  // patch request to server to update number of likes 
  function addLike(event) {
    let likesElement = event.target.previousSibling
    let likesCount = likesElement.innerHTML.split(" ")[0]
    let updatedLikes = parseInt(likesCount) + 1
 
    // Data that needs to be sent to the back end in the form of a patch
    let formData = {
      likes: updatedLikes
    }

    let formObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    
    fetch(`http://localhost:3000/toys/${event.target.parentNode.id}`, formObj)
    .then(response => response.json())
    .then(likes => likes)

    likesElement.innerText = `${updatedLikes} Likes`

  }

  function deleteToy(event) {
    let deleteToy = event.target.parentNode
    deleteToy.remove();

    let formObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch(`http://localhost:3000/toys/${event.target.parentNode.id}`, formObj)
    .then(response => response.json())
    .then(toy => toy)
  }

  getToys();
});
