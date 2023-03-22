let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let events = [];
let pastEvents = [];
let upcomingEvents = [];

async function getEventsData() {
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        localStorage.setItem('localData', JSON.stringify(data))
    }
    catch (error) {
    }
}

getEventsData()
let data = JSON.parse(localStorage.getItem('localData'));


pastEvents = (data.events).filter(event => {
    return event.date < data.currentDate;
});

upcomingEvents = (data.events).filter(event => {
    return event.date > data.currentDate;
});


let categories = [];
data.events.forEach(event => {
    if (!categories.includes(event.category)) {
        categories.push(event.category)
    }
});




let generalStats = document.getElementById("general-stats");

function getEventsStats() {
    let tableBodyHTML = "";
    tableBodyHTML += `<tr>
        <td>${getHighest(pastEvents).name}</td>
        <td>${getLowest(pastEvents).name}</td>
        <td>${getLarger(data.events).name} </td>
    </tr>`;
    generalStats.innerHTML = tableBodyHTML;
}

getEventsStats();

function getHighest(events) {
    return events.reduce((highest, current) => {
        if ((current.assistance / current.capacity) > (highest.assistance / highest.capacity)) {
            return current;
        } else {
            return highest;
        }
    });
}

function getLowest(events) {
    return events.reduce((lowest, current) => {
        if ((current.assistance / current.capacity) < (lowest.assistance / lowest.capacity)) {
            return current;
        } else {
            return lowest;
        }
    });
}

function getLarger(events) {
    return events.reduce((larger, current) => {
        if (current.capacity > larger.capacity) {
            return current;
        } else {
            return larger;
        }
    });
}


let upcomingStats = document.getElementById("upcoming-stats");

function getUpcomingStats() {
    let tableBodyHTML = "";

    categories.forEach(category => {

        let eventsCategories = getEventsCategory(upcomingEvents, category);
        let revenue = getRevenue(eventsCategories)
        let attendance = getAttendancePercentage(eventsCategories)


        tableBodyHTML += `<tr>
        <td>${category}</td>
        <td>$${revenue}</td>
        <td>${attendance} </td>
    </tr>`;

    });
    upcomingStats.innerHTML = tableBodyHTML;
}

getUpcomingStats();


let pastStats = document.getElementById("past-stats");

function getPastStats() {
    let tableBodyHTML = "";
    categories.forEach(category => {

        let eventsCategories = getEventsCategory(pastEvents, category);
        let revenue = getRevenue(eventsCategories)
        let attendance = getAttendancePercentage(eventsCategories)


        tableBodyHTML += `<tr>
        <td>${category}</td>
        <td>$${revenue}</td>
        <td>${attendance} </td>
    </tr>`;

    });
    pastStats.innerHTML = tableBodyHTML;

}
getPastStats();


function getEventsCategory(events, category) {
    return events.filter(event => {
        if (event.category.includes(category)) {
            return true;
        } else {
            return false;
        }
    });
}

function getAttendancePercentage(events) {
    let assistanceAdd = 0;
    let capacityAdd = 0;

    events.forEach(event => {
        capacityAdd += event.capacity;

        if (event.assistance > 0) {
            (assistanceAdd += event.assistance)
        } else {
            (assistanceAdd += event.estimate)
        }
    });
    if (assistanceAdd === 0) {
        return "0 %";
    } else {
        return Math.round((assistanceAdd * 100) / capacityAdd) + " %";
    }
}

function getRevenue(events) {
    let revenue = 0;
    events.forEach(event => {
        if (event.assistance > 0) {
            (revenue += event.price * event.assistance)
        } else {
            (revenue += event.price * event.estimate)
        }
    });

    return revenue;
}