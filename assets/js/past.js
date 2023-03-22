renderCards(pastEvents);

function renderSearch() {
  let selectedCategory = getSelectedCategory();
  let textInput = searchInput.value.toLowerCase();
  let results = pastEvents.filter(event => event.name.toLowerCase().includes(textInput) || event.description.toLowerCase().includes(textInput));

  if (selectedCategory.length > 0) {
    results = results.filter(event => {
      let categories = events.filter(event => selectedCategory.includes(event.category));

      // let filter = false;
      // categories.forEach(category => {
      //       if (selectedCategory.includes(category)) {
      //             filter = true;
      //       }
      //   })
      // return filter

      return selectedCategory.some(category => categories.includes(category));
    })
  }

  renderCards(results);
  console.log(selectedCategory);
  console.log(textInput);
}