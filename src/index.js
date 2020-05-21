let addToy = false;
let toyCollectionDiv = document.getElementById('toy-collection')

const main = () => {
  fetchToys()
  createToy()
  likeToy()
  deleteToy()
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

const renderToy = (toy) => {
  // Creation of Toy Card
  let toyCard = document.createElement('div')
  toyCard.className = 'card'

  // Creation of Toy Name
  let toyName = document.createElement('h2')
  toyName.innerText = toy['name']
  toyCard.appendChild(toyName)

  // Creation of Toy Image
  let toyImg = document.createElement('img')
  toyImg.src = toy['image']
  toyImg.className = 'toy-avatar'
  toyCard.appendChild(toyImg)

  // Creation of Toy Likes
  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy['likes']} Likes`
  toyCard.appendChild(toyLikes)

  // Creation of Toy Like Button
  let toyLikeBtn = document.createElement('button')
  toyLikeBtn.dataset.id = toy['id']
  toyLikeBtn.className = 'like-btn'
  toyLikeBtn.innerText = 'Like <3'
  toyCard.appendChild(toyLikeBtn)

  // Creation of Toy Delete Button
  let toyDeleteBtn = document.createElement('button')
  toyDeleteBtn.dataset.id = toy['id']
  toyDeleteBtn.className = 'delete-btn'
  toyDeleteBtn.innerText = 'Delete :('
  toyCard.appendChild(toyDeleteBtn)

  toyCollectionDiv.appendChild(toyCard)
}

const fetchToys = () => {
  const URL = 'http://localhost:3000/toys'

  fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(toys => {
      toys.forEach(toy => {
        renderToy(toy)
      });
    })
}

const createToy = () => {
  let createToyForm = document.getElementById('addToyForm')

  createToyForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const URL = 'http://localhost:3000/toys'
    
    const formData ={
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }

    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(URL, configObj)
      .then(response => {
        return response.json()
      })
      .then(toy => {
        renderToy(toy)
      })

    createToyForm.reset()
  })
}

const likeToy = () => {
  document.addEventListener('click', (event) => {
    if (event.target.className === 'like-btn') {
      let likeBtn = event.target
      let toyId = likeBtn.dataset.id

      const updateURL = `http://localhost:3000/toys/${toyId}`

      let likeCountText = likeBtn.previousSibling
      let likeCount = parseInt(likeCountText.innerText.split(' ')[0])

      const formData = {
        likes: `${likeCount + 1}`
      }

      const configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify(formData)
      }

      fetch(updateURL, configObj)
        .then(response => {
          return response.json()
        })
        .then(toy => {
          likeCountText.innerText = `${toy['likes']} Likes`
        })
    }
  })
}

const deleteToy = () => {
  document.addEventListener('click', (event) => {
    if (event.target.className === 'delete-btn') {
      let deleteBtn = event.target
      let toyId = deleteBtn.dataset.id

      let toyCard = deleteBtn.parentElement

      const deleteURL = `http://localhost:3000/toys/${toyId}`

      const configObj = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        }
      }

      fetch(deleteURL, configObj)
        .then(response => {
          return response.json()
        })
        .then(toy => {
          toyCard.remove()
        })
    }
  })
}

main()
