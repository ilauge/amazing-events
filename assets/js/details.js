function createDetailCard(singleEvent) {
    return `<div class="card mb-3" style="max-width: 800px;">
    <div class="row g-0">
    <div class="col-md-4">
        <img src="${singleEvent.image}" class="img-fluid rounded-top " alt="${singleEvent.name}">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${singleEvent.name}</h5>
            <p class="card-text">${singleEvent.description}</p>
        </div>
    </div>
    <div class="card-footer ">
      <span> Price: &#36;${singleEvent.price} </span>
      <a href="#" class="btn btn-outline-secondary" onclick="history.back()" >Back to previous page</a>
</div>
</div>
</div>`
}


console.log([document])
const queryString = location.search
console.log(queryString)
const params = new URLSearchParams(queryString)
const id = params.get("id")
const singleEvent = data.events.find(event => event._id == id)


let eventDetail = document.getElementById("event-detail");
    eventDetail.innerHTML = createDetailCard(singleEvent);
