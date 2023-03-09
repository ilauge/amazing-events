// Cards -----------------------------
function createCard(event) {
      return `<div class="col py-2">
      <div class="card text-center h-100">
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body"> 
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">${event.description}</p>
            </div>
                <div class="card-footer">
                      <span> Price: &#36;${event.price} </span>
                      <a href="./event.html?id=${event._id}" class="btn btn-outline-secondary">+ info</a>
                </div>
          </div>
       </div>`
}


// Categories -------------------------

categories = [];
data.events.forEach(event => {
      if (!categories.includes(event.category)) {
            categories.push(event.category)
      }
});

for (let category of categories) {
      let categoriesHTML = document.getElementById("categories-checkbox");
      categoriesHTML.innerHTML += `<div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
      <label class="form-check-label" for="${category}">${category}</label>
  </div>`
}