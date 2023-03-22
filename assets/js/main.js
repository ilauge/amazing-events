let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let events = [];
let pastEvents = [];
let upcomingEvents = [];
let htmlCards = "";
let container = document.getElementById("container-events");
let checkboxContainer = document.getElementById("categories-checkbox");
let searchInput = document.getElementById("search-input");
let checkboxes;
let selectedCategory = [];

async function getEventsData() {
      try {
            const response = await fetch(urlApi);
            const data = await response.json();
            localStorage.setItem('localData', JSON.stringify(data))

            checkboxes = document.querySelectorAll("input[type=checkbox]");

            checkboxes.forEach(checkbox => {
                  checkbox.addEventListener("change", () => {
                        renderSearch();
                  })
            })

      }
      catch (error) {
      }
}

getEventsData()
let data = JSON.parse(localStorage.getItem('localData'));


searchInput.addEventListener("input", () => {
      renderSearch();
});

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


function renderCards(arrayEvents) {
      arrayEvents.forEach(event => htmlCards += createCard(event));
      container.innerHTML = htmlCards;
}


pastEvents = (data.events).filter(event => {
      return event.date < data.currentDate;
});

upcomingEvents = (data.events).filter(event => {
      return event.date > data.currentDate;
});


// Categories -------------------------

let categories = [];
data.events.forEach(event => {
      if (!categories.includes(event.category)) {
            categories.push(event.category)
      }
});

function renderCheckbox(categories) {
      let categoriesHTML = "";
      categories.forEach(category => {
            categoriesHTML += `<div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
      <label class="form-check-label" for="${category}">${category}</label>
  </div>`;

      });
      checkboxContainer.innerHTML = categoriesHTML;
}

renderCheckbox(categories);

function getSelectedCategory() {
      let selectedCategory = [];
      checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                  selectedCategory.push(checkbox.value);
            }
      })
      return selectedCategory;
}