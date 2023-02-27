let pastEvent = (data.events).filter(function(event) {
  return event.date < data.currentDate; });


let eventsData = pastEvent.map(function (event) {

  return `<div class="col py-2">
  <div class="card text-center h-100">
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
        <div class="card-body"> 
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
        </div>
            <div class="card-footer">
                  <span> Price: &#36;${event.price} </span>
                  <a href="#" class="btn btn-outline-secondary">+ info</a>
            </div>
      </div>
   </div>`
})


let eventsHTML = eventsData.join("");

document.getElementById("container-events").innerHTML = eventsHTML