const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

localStorage();

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", JSON.stringify(movieIndex));
  localStorage.setItem("selectedMoviePrice", JSON.stringify(moviePrice));
}
function updateSelectedCount(seat) {
  let ticketPrice = +movieSelect.value;
  const selectedSeats = document.querySelectorAll(".row .seat.selected").length;
  const selectedSeatsArr = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeatsArr].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selected", JSON.stringify(seatsIndex));

  console.log(seatsIndex);
  count.innerText = selectedSeats;
  total.innerText = selectedSeats * ticketPrice;
}
/////////////LocalStorage//////////////

function localStorage() {
  let selectedSeatsArr = JSON.parse(localStorage.getItem("selected"));

  if (selectedSeatsArr !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsArr.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}


//movie selection////////
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

////////////seats selected///////////
seats.forEach((seat) => {
  seat.addEventListener("click", (e) => {
    seat.classList.toggle("selected");
    updateSelectedCount();
  });
});
