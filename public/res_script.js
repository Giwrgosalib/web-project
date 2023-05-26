document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateButton");

  generateButton.addEventListener("click", generateGrid);
});

//get reservations for the selected date from the database and return them as a json object 

async function getReservations(selectedDate) {
  const url = "/reservations/data/" + selectedDate;
  return fetch(url)
      .then((res) => res.json())
      .then((reservations) => reservations)
      .catch((err) => console.log(err));
}


//generate the grid with the reservations for the selected date

async function generateGrid() {
  const dateInput = document.getElementById("dateInput");
  let selectedDate = dateInput.value;
  const inputContainer = document.getElementById("inputContainer");
  if (!selectedDate) {
      alert("Please select a date!");
      return;
  }
  let reservations = {};
  reservations = await getReservations(selectedDate);
  selectedDate = selectedDate.split("-").reverse().join("-");

  //format date like MM/DD/YYYY
  selectedDate = selectedDate.split("-");
  selectedDate = selectedDate[1] + "/" + selectedDate[0] + "/" + selectedDate[2];

  if (document.getElementById("gridContainer") != null) {
      const gridContainer = document.getElementById("gridContainer");
      gridContainer.innerHTML = "";
  }
  else {
      const gridContainer = document.createElement("div");
      gridContainer.classList.add("container");
      inputContainer.parentNode.insertBefore(gridContainer, inputContainer.nextSibling);
      gridContainer.innerHTML = "";
      gridContainer.setAttribute("id", "gridContainer");
  }

  if (document.getElementById("prompt") != null) {
      const prompt = document.getElementById("prompt");
      prompt.innerHTML = "Select a time slot to make a reservation for the corresponding court:";
  }
  else {
      const prompt = document.createElement("div");
      prompt.classList.add("container");
      inputContainer.parentNode.insertBefore(prompt, inputContainer.nextSibling);
      prompt.textContent = "Select a time slot to make a reservation for the corresponding court:";
      prompt.setAttribute("id", "prompt");
  }

  const dateCell = document.createElement("div");
  dateCell.classList.add("date-cell");
  dateCell.textContent = selectedDate;
  gridContainer.appendChild(dateCell);

  const timeCell = document.createElement("div");
  timeCell.classList.add("hour-cell");
  timeCell.textContent = "Time";
  gridContainer.appendChild(timeCell);

  for (let court = 1; court < 7; court++) {
      const courtCell = document.createElement("div");
      courtCell.classList.add("court-tittle");
      if (court <= 3 && court > 0)
          courtCell.textContent = `Clay Court ${court}`;
      else if (court == 4)
          courtCell.textContent = `Hard Court`;
      else if (court > 4 && court < 7)
          courtCell.textContent = `Grass Court ${court - 4}`;

      gridContainer.appendChild(courtCell);
  }

  for (let hour = 9; hour < 22; hour++) {
      const hourCell = document.createElement("div");
      hourCell.classList.add("hour-cell");
      hourCell.textContent = `${formatTime(hour)}`;
      gridContainer.appendChild(hourCell);


      for (let court = 0; court < 6; court++) {
          const courtCell = document.createElement("div");
          courtCell.classList.add("court-cell");
          courtCell.setAttribute("id", `court:${court + 1}_hour:${hour}`);
          gridContainer.appendChild(courtCell);
      }
  }
  // Check if the current court and hour have a reservation in the database and add the reservation class
  for (let hour = 9; hour < 22; hour++) {
      for (let court = 0; court < 6; court++) {
          const courtCell = document.getElementById(`court:${court + 1}_hour:${hour}`);
          const hasReservation = reservations.some(
              (reservation) =>
                  reservation.court_id == court + 1 && reservation.start_time == formatTime(hour));

          if (hasReservation) {
              courtCell.classList.add("reserved");
              const reservationCell = document.createElement("div");
              reservationCell.textContent = "N/A";
              courtCell.appendChild(reservationCell);
              let nextHourCell = document.getElementById(`court:${court + 1}_hour:${hour + 1}`);
              let previousHourCell = document.getElementById(`court:${court + 1}_hour:${hour - 1}`);
              if (previousHourCell != null) {
                  previousHourCell.removeEventListener("click", makeReservation);
                  previousHourCell.firstChild.classList.remove("Available");
                  previousHourCell.firstChild.textContent = "";

              }
              if (nextHourCell != null) {
                  nextHourCell.classList.add("reserved");
                  const reservationCell = document.createElement("div");
                  reservationCell.textContent = "N/A";
                  nextHourCell.appendChild(reservationCell);
              }
          }
          else {
              if (!courtCell.classList.contains("reserved")) {
                  courtCell.addEventListener("click", makeReservation);
                  const reservationCell = document.createElement("div");
                  reservationCell.classList.add("Available");
                  reservationCell.textContent = "ADD";
                  courtCell.appendChild(reservationCell);
              }
          }
      }
  }
}


//function to make reservation
function makeReservation(event) {
  const courtCell = event.currentTarget;
  if (courtCell.firstChild.classList.contains("Available")) {
      courtCell.firstChild.classList.remove("Available");
      courtCell.firstChild.classList.add("reservation");
      courtCell.firstChild.textContent = "+";
      courtCell.classList.add("reservation");
      courtCell.addEventListener("click", cancelReservation);
      let id = courtCell.getAttribute("id");
      let court = id.split("_")[0].split(":")[1];
      let hour = id.split("_")[1].split(":")[1];
      hour = parseInt(hour);
      let nextHourCell = document.getElementById(`court:${court}_hour:${hour + 1}`);
      if (nextHourCell != null && !nextHourCell.classList.contains("reserved")) {
          nextHourCell.removeEventListener("click", makeReservation);
          nextHourCell.firstChild.classList.remove("Available");
          nextHourCell.firstChild.classList.add("reservation");
          nextHourCell.classList.add("reservation");
          nextHourCell.firstChild.textContent = "+";
          nextHourCell.addEventListener("click", cancelReservation);
      }
      const courtCells = document.querySelectorAll(".court-cell");
      for (let i = 0; i < courtCells.length; i++) {
          courtCells[i].removeEventListener("click", makeReservation);
      }
  }
  generateCoaches();
}
//clear the last reservation and make the court available again
function cancelReservation(event) {
  const courtCell = event.currentTarget;
  let id = courtCell.getAttribute("id");
  let court = id.split("_")[0].split(":")[1];
  let hour = id.split("_")[1].split(":")[1];
  hour = parseInt(hour);
  let prevHourCell = document.getElementById(`court:${court}_hour:${hour - 1}`);
  if (prevHourCell != null && prevHourCell.firstChild.classList.contains("reservation")) {
      prevHourCell.firstChild.classList.remove("reservation");
      prevHourCell.firstChild.classList.add("Available");
      prevHourCell.firstChild.textContent = "ADD";
      prevHourCell.classList.remove("reservation");
      prevHourCell.addEventListener("click", makeReservation);
  }
  if (courtCell.firstChild.classList.contains("reservation")) {
      courtCell.firstChild.classList.remove("reservation");
      courtCell.firstChild.classList.add("Available");
      courtCell.firstChild.textContent = "ADD";
      courtCell.classList.remove("reservation");
      courtCell.addEventListener("click", makeReservation);
  }
  let nextHourCell = document.getElementById(`court:${court}_hour:${hour + 1}`);
  if (nextHourCell != null && nextHourCell.classList.contains("reservation")) {
      nextHourCell.firstChild.classList.remove("reservation");
      nextHourCell.firstChild.classList.add("Available");
      nextHourCell.firstChild.textContent = "";
      nextHourCell.classList.remove("reservation");
      nextHourCell.addEventListener("click", makeReservation);
  }
  let nextHourCell2 = document.getElementById(`court:${court}_hour:${hour + 2}`);
  if (nextHourCell2 != null && nextHourCell2.classList.contains("reserved")) {
      nextHourCell.firstChild.classList.remove("Available");
      nextHourCell.removeEventListener("click", makeReservation);
  }

  const courtCells = document.querySelectorAll(".court-cell");
  for (const element of courtCells) {
      if (element.firstChild.classList.contains("Available")) {
          element.addEventListener("click", makeReservation);
      }
  }
}


function formatTime(time) {
  return time.toString().padStart(2, "0") + ":00" + ":00";
}

let today = new Date().toISOString().split('T')[0];
let maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
maxDate = maxDate.toISOString().split('T')[0];
document.getElementById("dateInput").setAttribute('min', today);
document.getElementById("dateInput").setAttribute('max', maxDate);

async function getCoaches(date, time) {
  const url = `reservations/data/coaches/${date}/${time}`;
  return fetch(url)
      .then((res) => res.json())
      .then((coaches) => coaches)
      .catch((err) => console.log(err));
}

// coaches
async function generateCoaches() {
  const dateInput = document.getElementById("dateInput");
  const selectedDate = dateInput.value;
  const courtReservation = document.querySelector(".reservation");
  let time = courtReservation.getAttribute("id").split("_")[1].split(":")[1];
  time = formatTime(time);
  const coaches = await getCoaches(selectedDate, time);
  // coach container
  if (document.getElementById("coachContainer") != null) {
      const coachContainer = document.getElementById("coachContainer");
      coachContainer.innerHTML = "Select a coach for your reservation:";
  }
  else {
      const coachContainer = document.createElement("div");
      coachContainer.classList.add("container");
      gridContainer.parentNode.insertBefore(coachContainer, gridContainer.nextSibling);
      coachContainer.textContent = "Select a coach for your reservation:";
      coachContainer.setAttribute("id", "coachContainer");
  }

  //radio buttons for available coaches
  const coach0 = document.createElement("div");
  coach0.classList.add("form-check");
  coach0.innerHTML = `<input class="form-check-input" type="radio" name="coach" id="coach0" value="coach0" checked>`;
  coach0.innerHTML += `<label class="form-check-label" for="coach0">No coach</label>`;
  coachContainer.appendChild(coach0);

  for (let i = 0; i < coaches.length; i++) {
      const coach = document.createElement("div");
      coach.classList.add("form-check");
      coach.innerHTML = `<input class="form-check-input" type="radio" name="coach" id="coach:${i + 1}" value="coach${i + 1}">`;
      coach.innerHTML += `<label class="form-check-label" for="coach:${i}">${coaches[i].Name}</label>`;
      coachContainer.appendChild(coach);
  }



  // submit button
  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-dark");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", submitReservation);
  coachContainer.appendChild(submitButton);

}


async function submitReservation() {
  const dateInput = document.getElementById("dateInput");
  const date = dateInput.value;
  const courtReservation = document.querySelector(".reservation");
  let time = courtReservation.getAttribute("id").split("_")[1].split(":")[1];
  time = formatTime(time);
  let court = courtReservation.getAttribute("id").split("_")[0].split(":")[1];

  let coach = document.querySelector('input[name="coach"]:checked')
  coach = coach.getAttribute("id").split(":")[1];
  if (coach == 0) {
      coach = null;
  }
  let payload={date,time,court,coach};
  const url = `reservations/submit/${date}/${time}/${court}/${coach}`;
  return fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then((res)=>res.json())
      .then((res)=>window.location.href=res.url)
      .catch((err) => console.log(err));

}

