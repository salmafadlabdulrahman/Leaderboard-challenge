let addPlayerBtn = document.querySelector(".AddPlayer");
let form = document.querySelector(".input-fields");
let inputContainers = document.querySelector(".input-containers");
let firstNameInput = document.querySelector(".firstName");
let lastNameInput = document.querySelector(".lastName");
let countryInput = document.querySelector(".country");
let scoreInput = document.querySelector(".score");
let errorMsg = document.querySelector(".errorMsg");
let inputsArr = Array.from(inputContainers.querySelectorAll("input"));
let playersWrapper = document.querySelector(".player-wrapper");

//Getting the date
function Todaydate() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();

  const month = monthNames[now.getMonth()].substring(0, 3);
  const day = now.getDate();
  const year = now.getFullYear();
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");

  return `${month} ${day}, ${year} ${hour}:${minute}`;
}
console.log(Todaydate());

function clearInputFields() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  countryInput.value = "";
  scoreInput.value = "";
}

let players = [];

function sorting(arr) {
  arr.sort((a, b) => b.score - a.score);
  return arr;
}

function renderPlayers(players) {
  let sortedPlayers = sorting(players);
  playersWrapper.innerHTML = "";
  sortedPlayers.forEach((person) => {
    let player = document.createElement("div");
    player.classList.add("player");
    player.innerHTML = `
      <div class="player">
        <div class="player-info">
          <div class="name-date-container">
            <h3 class="first-name">${person.firstName} ${person.lastName}</h3>
            <p class="date">${Todaydate()}</p>
          </div>

          <p class="player-country">${person.country}</p>
          <p class="player-score">${person.score}</p>

          <div class="playerBtn">
            <button class="delete">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <button class="increase">+5</button>
            <button class="decrease">-5</button>
          </div>
        </div>
      </div>
    `;

    // add event listeners to buttons
    let deleteBtn = player.querySelector(".delete");
    let increaseBtn = player.querySelector(".increase");
    let decreaseBtn = player.querySelector(".decrease");

    deleteBtn.addEventListener("click", function () {
      player.innerHTML = ``;
      player.classList.add("none");
      let personIndex = players.indexOf(person);
      players.splice(personIndex, 1);
      renderPlayers(players);
    });

    increaseBtn.addEventListener("click", function () {
      let scoreElement = player.querySelector(".player-score");
      let score = parseInt(scoreElement.textContent) + 5;
      scoreElement.textContent = score;

      let myScore = parseInt(person.score) + 5;
      person.score = myScore;

      renderPlayers(players);
    });

    decreaseBtn.addEventListener("click", function () {
      let scoreElement = player.querySelector(".player-score");
      let score = parseInt(scoreElement.textContent) - 5;
      scoreElement.textContent = score;

      let myScore = parseInt(person.score) - 5;
      person.score = myScore;

      renderPlayers(players);
    });

    playersWrapper.appendChild(player);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    firstNameInput.value === "" ||
    lastNameInput.value === "" ||
    countryInput.value === "" ||
    scoreInput.value === ""
  ) {
    errorMsg.textContent = `All fields are required`;
  } else {
    errorMsg.textContent = ``;

    players.push({
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      country: countryInput.value,
      score: scoreInput.value,
    });

    clearInputFields();

    renderPlayers(players);
  }
});

