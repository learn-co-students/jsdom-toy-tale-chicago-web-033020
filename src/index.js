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

const toyCollection = document.querySelector('#toy-collection')

const toyForm = document.querySelector('.add-toy-form')

const toysURL = 'http://localhost:3000/toys'

const renderToy = (toy) => {
  const toyCard = `<div class="card" data-toy-id=${toy.id}><h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} like(s)</p><button class="like-btn">Like <3</button></div>` 
  toyCollection.innerHTML += toyCard
}

const getToys = () => {
  
  fetch(toysURL)
  .then(resp => resp.json())
  .then(toys => toys.forEach(renderToy))

}

const newToy = () => {
  
  toyForm.addEventListener("submit", function(){
    console.log(event)
    event.preventDefault()
    const toyData = {
      name: event.target[0].value,
      image: event.target["image"].value,
      likes: 0
    }
    console.log(toyData)
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    }
    fetch(toysURL, reqObj)
    .then(resp => resp.json())
    .then(toy => renderToy(toy))

  })
}

const newLike = () => {

  toyCollection.addEventListener("click", function(event){
    // const likeBtn = document.querySelector(".like-btn") queryselector only grabs the first one
    if(event.target.className === "like-btn"){
        increaseLike(event)
      }
  })

  const increaseLike = () => {
    const totalLikes = event.target.previousElementSibling
    
    const addLike = parseInt(totalLikes.innerHTML) + 1
    console.log(addLike)
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": addLike})
    }

    const id = event.target.parentNode.dataset.toyId
    

    fetch(`http://localhost:3000/toys/${id}`, reqObj)
    .then(resp => resp.json())
    .then(likeNum => {
      return totalLikes.innerHTML = `${addLike} Like(s)`})
   
}
}





getToys()
newToy()
newLike()

// const likeBtn = document.querySelector(".like-btn")
// if(event.target === likeBtn){
//   console.log("************")
// }