document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', generateGrid);})
  
    function generateGrid() {
      const dateInput = document.getElementById('dateInput');
      const selectedDate = dateInput.value;
  
      if (!selectedDate) {
        alert('Please select a date!');
        return;
      }
  
      fetch(`/reservation?date=${selectedDate}`)
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          return response.json();
        })
        .then(function (data) {
          updateGrid(data);
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }

    function updateGrid(data) {
        const gridContainer = document.getElementById('gridContainer');
        gridContainer.innerHTML = '';
      
        const dateCell = document.createElement('div');
        dateCell.classList.add('date-cell');
        dateCell.textContent = data.selectedDate;
        gridContainer.appendChild(dateCell);
      
        const timeCell = document.createElement('div');
        timeCell.classList.add('hour-cell');
        timeCell.textContent = 'Time';
        gridContainer.appendChild(timeCell);
      
        data.courts.forEach(function (court) {
          const courtCell = document.createElement('div');
          courtCell.classList.add('court-tittle');
          courtCell.textContent = court.title;
          gridContainer.appendChild(courtCell);
        });
      
        data.hours.forEach(function (hour) {
          const hourCell = document.createElement('div');
          hourCell.classList.add('hour-cell');
          hourCell.textContent = hour.label;
          gridContainer.appendChild(hourCell);
      
          data.courts.forEach(function (court) {
            const courtCell = document.createElement('div');
            courtCell.classList.add('court-cell');
            courtCell.setAttribute('id', `court:${court.id}_hour:${hour.id}`);
      
            const reservation = document.createElement('div');
            reservation.classList.add('Available');
            reservation.textContent = court.reservations.includes(hour.id) ? 'Booked' : 'ADD';
      
            gridContainer.appendChild(courtCell);
            courtCell.appendChild(reservation);
            courtCell.addEventListener('click', makeReservation);
          });
        });
      }

      function makeReservation(event) {
        const courtCell = event.currentTarget;
        const courtId = courtCell.getAttribute('data-court-id');
        const hourId = courtCell.getAttribute('data-hour-id');
      
        // Send a request to the backend to make a reservation
        fetch('/make-reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courtId, hourId }),
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error('Reservation request failed');
            }
            return response.json();
          })
          .then(function (data) {
            // Handle the response from the backend
            if (data.success) {
              // Reservation was successful, update the UI accordingly
              courtCell.classList.add('reserved');
              courtCell.querySelector('.reservation').textContent = 'Booked';
            } else {
              // Reservation failed, display an error message or take appropriate action
              console.error('Reservation failed:', data.message);
            }
          })
          .catch(function (error) {
            console.error('Error:', error);
          });
      }

      
      /*  function deleteReservation(event) {
        const courtCell = event.currentTarget;
        const courtId = courtCell.getAttribute('data-court-id');
        const hourId = courtCell.getAttribute('data-hour-id');
        
    }*/