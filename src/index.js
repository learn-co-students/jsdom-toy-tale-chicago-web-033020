let addToy = false;

document.addEventListener("DOMContentLoaded",
  () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    const toyCollection = document.getElementById('toy-collection')

    addBtn.addEventListener("click", () => {
      addToy = !addToy;
      toyFormContainer.style.display = (addToy ? "block" : "none")
    });

    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json =>
      json.forEach(toy =>
        {
          const card = document.createElement('div')
          card.class = 'card'
          card.id = toy.id

          const h2 = document.createElement('h2')
          h2.innerHTML = toy.name
        
          const img = document.createElement('img')
          img.src = toy.image
          img.class = 'toy-avatar'
          
          const p = document.createElement('p')
          card.likes = toy.likes
          p.innerText = `${card.likes} Likes`
          
          const likeButton = document.createElement('button')
          likeButton.class = 'like-btn'
          likeButton.innerHTML = "Like <3"

          const deleteButton = document.createElement('button')
          deleteButton.class = 'delete-btn'
          deleteButton.innerHTML = `Delete ${toy.name}`
          
          for (const elm of [h2, img, p, likeButton, deleteButton]) {
            card.appendChild(elm)
          }
          
          toyCollection.appendChild(card)
        }
      )
    )

    toyFormContainer.addEventListener("submit",
      (e) => {
        e.preventDefault()

        const card = document.createElement('div')
        card.class = 'card'
        card.id = toyCollection.childNodes.length + 1

        const h2 = document.createElement('h2')
        const name = toyFormContainer.querySelector("input[name='name']").value
        h2.innerHTML = name
       
        const img = document.createElement('img')
        const imgLink = toyFormContainer.querySelector("input[name='image']").value
        img.src = imgLink
        img.class = 'toy-avatar'
        
        const p = document.createElement('p')
        card.likes = 0
        p.innerText = `${card.likes} Likes`
        
        const likeButton = document.createElement('button')
        likeButton.class = 'like-btn'
        likeButton.innerHTML = "Like <3"

        const deleteButton = document.createElement('button')
        deleteButton.class = 'delete-btn'
        deleteButton.innerHTML = `Delete ${toy.name}`
        
        for (const elm of [h2, img, p, likeButton, deleteButton]) {
          card.appendChild(elm)
        }
        
        toyCollection.appendChild(card)

        const configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },

          body: JSON.stringify(
            {
              "name": name,
              "image": imgLink,
              "likes": card.likes
            }
          )
        }

        fetch("http://localhost:3000/toys", configObj)

      }
    )

    document.addEventListener('click',
     (e) => {
        if (e.target.class === 'like-btn') {
          const myCard = e.target.parentNode
          myCard.likes += 1
          
          const configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(
              {
                "likes": myCard.likes
              }
            )
          }

          fetch(`http://localhost:3000/toys/${myCard.id}`, configObj)
          .then(resp => resp.json())
          .then(json => {
            myCard.querySelector('p').innerHTML = `${json.likes} Like${myCard.likes !== 1 ? 's' : ''}`
          })

        }
        else if (e.target.class === 'delete-btn') {
          const myCard = e.target.parentNode

          const configObj = {
            method: "DELETE"
          }

          fetch(`http://localhost:3000/toys/${myCard.id}`, configObj)

        }
      }
    )
  }
)