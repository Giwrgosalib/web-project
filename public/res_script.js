function generateGrid() {
    const dateInput = document.getElementById("date");
    let selectedDate = dateInput.value;
    const inputContainer = document.getElementById("inputContainer");

    
    if (!selectedDate) {
      alert("Please select a date!");
      return;
    }
    selectedDate=selectedDate.split("-").reverse().join("-");
    //format date like MM/DD/YYYY

    selectedDate = selectedDate.split("-");
    selectedDate = selectedDate[1] + "/" + selectedDate[0] + "/" + selectedDate[2];
    console.log(selectedDate);
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
      if(court<=3 && court>0)
        courtCell.textContent = `Clay Court ${court}`;
      else if(court==4)
        courtCell.textContent = `Hard Court`;
      else if(court>4 && court<7)
        courtCell.textContent = `Grass Court ${court-4}`;
      
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
         //add id that represents the court number and hour
        courtCell.setAttribute("id", `court:${court+1}_hour:${hour}`);
        const reservation = document.createElement("div");
        reservation.classList.add("Available");
        reservation.textContent = "ADD";
        gridContainer.appendChild(courtCell);
        courtCell.appendChild(reservation);
        courtCell.addEventListener("click", makeReservation);
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
      const courtCells=document.querySelectorAll(".court-cell");
      for(let i=0;i<courtCells.length;i++){
        courtCells[i].removeEventListener("click", makeReservation);}
  }
  generateCoaches();
}
//clear the last reservation and make the court available again
function cancelReservation(event) {
    const courtCell = event.currentTarget;
    if (courtCell.firstChild.classList.contains("reservation")) {
      courtCell.firstChild.classList.remove("reservation");
      courtCell.firstChild.classList.add("Available");
      courtCell.firstChild.textContent = "ADD";
      courtCell.classList.remove("reservation");
      courtCell.addEventListener("click", makeReservation);
      const courtCells=document.querySelectorAll(".court-cell");
      for(let i=0;i<courtCells.length;i++){
        courtCells[i].addEventListener("click", makeReservation);}
    }
  }


  function formatTime(time) {
    return time.toString().padStart(2, "0") + ":00";
  }

let today = new Date().toISOString().split('T')[0];
let maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
maxDate = maxDate.toISOString().split('T')[0];
document.getElementById("date").setAttribute('min', today);
document.getElementById("date").setAttribute('max', maxDate);


// coaches
function generateCoaches() {
  // coach container
  if(document.getElementById("coachContainer") != null){
    const coachContainer=document.getElementById("coachContainer");
    coachContainer.innerHTML = "Select a coach for your reservation:";}
  else{
    const coachContainer = document.createElement("div");
    coachContainer.classList.add("container");
    gridContainer.parentNode.insertBefore(coachContainer, gridContainer.nextSibling);
    coachContainer.textContent="Select a coach for your reservation:";
    coachContainer.setAttribute("id", "coachContainer");
  }

  // radio buttons for coach selection
  const coach0 = document.createElement("div");
  coach0.classList.add("form-check");
  coach0.innerHTML = `<input class="form-check-input" type="radio" name="coach" id="coach0" value="coach0" checked>`;
  coach0.innerHTML += `<label class="form-check-label" for="coach0">No coach</label>`;
  coachContainer.appendChild(coach0);

  const coach1 = document.createElement("div");
  coach1.classList.add("form-check");
  coach1.innerHTML = `<input class="form-check-input" type="radio" name="coach" id="coach1" value="coach1">`;
  coach1.innerHTML += `<label class="form-check-label" for="coach1">Dimitris Papadopoulos</label>`;
  coachContainer.appendChild(coach1);

  const coach2 = document.createElement("div");
  coach2.classList.add("form-check");
  coach2.innerHTML = `<input class="form-check-input" type="radio" name="coach" id="coach2" value="coach2">`;
  coach2.innerHTML += `<label class="form-check-label" for="coach2">Maria Georgiou</label>`;
  coachContainer.appendChild(coach2);

  const coach3 = document.createElement("div");
  coach3.classList.add("form-check");
  coach3.innerHTML = `<input class="form-check-input" type="radio" name="coach" id="coach3" value="coach3">`;
  coach3.innerHTML += `<label class="form-check-label" for="coach3">Petros Konstantinou</label>`;
  coachContainer.appendChild(coach3);

  const coach4 = document.createElement("div");
  coach4.classList.add("form-check");
  coach4.innerHTML = `<input class="form-check-input" type="radio" name="coach" id="coach4" value="coach4">`;
  coach4.innerHTML += `<label class="form-check-label" for="coach4">Anna Papadopoulou</label>`;
  coachContainer.appendChild(coach4);

  // submit button
  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-dark");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", submitReservation);
  coachContainer.appendChild(submitButton);

}
function submitReservation() {
  alert("Your reservation has been submitted!");
  location.reload();
}

