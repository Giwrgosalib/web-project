function generateGrid() {
    const dateInput = document.getElementById("date");
    const selectedDate = dateInput.value;
    const inputContainer = document.getElementById("inputContainer");
    
    if (!selectedDate) {
      alert("Please select a date!");
      return;
    }
    
    if(document.getElementById("gridContainer") != null){
      const gridContainer=document.getElementById("gridContainer");
      gridContainer.innerHTML = "";}
    else{
      const gridContainer = document.createElement("div");
      gridContainer.classList.add("container");
      inputContainer.parentNode.insertBefore(gridContainer, inputContainer.nextSibling);
      gridContainer.innerHTML = "";
      gridContainer.setAttribute("id", "gridContainer");}

    if(document.getElementById("prompt") != null){
      const prompt=document.getElementById("prompt");
      prompt.innerHTML = "Select a time slot to make a reservation for the corresponding court:";}    
    else{
      const prompt = document.createElement("div");
      prompt.classList.add("container");
      inputContainer.parentNode.insertBefore(prompt, inputContainer.nextSibling);
      prompt.textContent="Select a time slot to make a reservation for the corresponding court:";
      prompt.setAttribute("id","prompt");}

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
      courtCell.textContent = `Court ${court}`;
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
        const reservation = document.createElement("div");
        reservation.classList.add("Available");
        reservation.textContent = "ADD";
        gridContainer.appendChild(courtCell);
        courtCell.appendChild(reservation);
        courtCell.addEventListener("click", makeReservation);
      }
    }
  }

  function makeReservation() {
    const reservation = this.querySelector(".court-cell>div");
    if (reservation.classList.contains("reservation")) {
      reservation.classList.remove("reservation");
      reservation.parentNode.classList.remove("reservation");
      reservation.classList.add("Available");
      reservation.textContent = "ADD";
      return;
    }
    else if (reservation.classList.contains("Available")) {
    reservation.classList.remove("Available");
    reservation.classList.add("reservation");
    reservation.textContent = "Reservation";
    reservation.parentNode.classList.add("reservation");
  }}

  function formatTime(time) {
    return time.toString().padStart(2, "0") + ":00";
  }

let today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute('min', today);
