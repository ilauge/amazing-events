let pastEvent = (data.events).filter(event => {
  return event.date < data.currentDate;
});

let eventsData = pastEvent.map(event => {

  return createCard(event)
})

let eventsHTML = eventsData.join("");

document.getElementById("container-events").innerHTML = eventsHTML


// Checkbox -------------------------------------

let checkboxes = document.querySelectorAll('input[type=checkbox]')

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    let selectedCategoryHTML = "";
    selectedCategory =
      Array.from(checkboxes)
        .filter(i => i.checked)
        .map(i => i.value)

    // console.log(selectedCategory);

    if (selectedCategory.length > 0) {
      pastEvent.filter(event => selectedCategory.includes(event.category)).forEach((event) => {
        selectedCategoryHTML += createCard(event);
        document.getElementById("container-events").innerHTML = selectedCategoryHTML;
      });
    } else {
      document.getElementById("container-events").innerHTML = eventsHTML;
    };
  })
});


// Search -------------------------------------
let searchButton = document.getElementById("search-button");
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

let searchInput = document.getElementById("search-input");
document.addEventListener("input", (e) => {
  e.preventDefault();
  let searched = e.target.value.toLowerCase();

  let searchedHTML = "";

  if (searched.length > 0) {
    pastEvent.filter(event => event.name.toLowerCase().includes(searched) || event.description.toLowerCase().includes(searched))

      .forEach((event) => {
        searchedHTML += createCard(event);
        document.getElementById("container-events").innerHTML = searchedHTML;
      });
  }
  else { document.getElementById("container-events").innerHTML = eventsHTML; }
});