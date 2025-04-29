const bookingForm = document.getElementById('booking-form');
const movieSelect = document.getElementById('movie');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const seatsContainer = document.getElementById('seats');
const popup = document.getElementById('popup');
const summaryElement = document.getElementById('summary');
const closePopup = document.getElementById('close-popup');
const successMessage = document.getElementById('success-message');
const downloadTicket = document.getElementById('download-ticket');

// Generate seats (Example: 40 seats)
for (let i = 1; i <= 40; i++) {
  const seat = document.createElement('div');
  seat.classList.add('seat');
  seat.innerText = i;
  
  // Randomly mark some seats as already booked
  if (Math.random() < 0.2) { 
    seat.classList.add('booked');
  } else {
    seat.addEventListener('click', () => {
      seat.classList.toggle('selected');
    });
  }

  seatsContainer.appendChild(seat);
}

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const movie = movieSelect.value;
  const date = dateInput.value;
  const time = timeInput.value;
  const selectedSeats = document.querySelectorAll('.seat.selected');

  if (selectedSeats.length === 0) {
    alert('Please select at least one seat!');
    return;
  }

  const seatsNumbers = Array.from(selectedSeats).map(seat => seat.innerText).join(', ');
  const totalCost = selectedSeats.length * 10; // assuming $10 per seat

  const ticketDetails = `
    Movie: ${movie}\n
    Date: ${date}\n
    Time: ${time}\n
    Seats: ${seatsNumbers}\n
    Total Seats: ${selectedSeats.length}\n
    Total Cost: $${totalCost}
  `;

  summaryElement.innerHTML = ticketDetails.replace(/\n/g, '<br>');

  popup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
  successMessage.classList.remove('hidden');

  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
});

downloadTicket.addEventListener('click', () => {
  const element = document.createElement('a');
  const ticketText = summaryElement.innerText;
  const file = new Blob([ticketText], { type: 'text/plain' });

  element.href = URL.createObjectURL(file);
  element.download = 'ticket.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});