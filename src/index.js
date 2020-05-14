let addToy = false;
let toyCollectionDiv = document.getElementById('toy-collection') 

function main() {
  getToys()
  newToyListener()
  likeToy()
}

document.addEventListener("DOMContentLoaded", () => {
  toyLikeBtn = document.getElementsByClassName('like-btn')
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

function toyContent(toy) {
  let toyCardDiv = document.createElement('div')
  toyCardDiv.id = toy['id']
  toyCardDiv.likes = toy['likes']
  toyCardDiv.likeText = `${toyCardDiv.likes} Likes`
  toyCardDiv.setAttribute('class', 'card')
  toyCollectionDiv.appendChild(toyCardDiv)

  let toyName = document.createElement('h2')
  toyName.innerText = toy['name']

  let toyImg = document.createElement('img')
  toyImg.setAttribute('class', 'toy-avatar')
  toyImg.src = toy['image']

  let toyLikes = document.createElement('p')
  toyLikes.setAttribute('id', 'like-text')
  toyLikes.innerText = toyCardDiv.likeText

  let toyLikeBtn = document.createElement('button')
  toyLikeBtn.setAttribute('class', 'like-btn')
  toyLikeBtn.innerText = 'Like <3'

  toyCardDiv.appendChild(toyName)
  toyCardDiv.appendChild(toyImg)
  toyCardDiv.appendChild(toyLikes)
  toyCardDiv.appendChild(toyLikeBtn)
}

function getToys() {
  const toysUrl = 'http://localhost:3000/toys'

  fetch(toysUrl)
    .then(response => {
      return response.json()
    })
    .then(toys => {
      for (const toy of toys) {
        toyContent(toy)
      }
    })
}

function newToy(event) {
  const formData = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  }

  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(toysUrl, configObj)
    .then(response => {
      return response.json()
    })
    .then(toys => {
    })
}

function newToyListener() {
  let newToyForm = document.getElementById('addToyForm')

  newToyForm.addEventListener('submit', function(event) {
    newToy(event)
  })  
}

function likeToy() {
  document.addEventListener('click', function(event) {

    if (event.target.className === 'like-btn') {
      let toyCard = event.target.parentNode
      toyCard.likes += 1

      const toysUrlId = `http://localhost:3000/toys/${toyCard.id}`

      const submitData = {
        likes: toyCard.likes
      }

      const configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      }

      fetch(toysUrlId, configObj)
        .then(response => {
          return response.json()
        })
        .then(toys => {
          toyCard.querySelector('p').innerText = `${toyCard.likes} Likes`
        })
    }
  })
}

main()
