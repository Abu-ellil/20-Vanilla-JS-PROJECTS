const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recog

recognition.start();

///generat speech
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(e.results[0][0].transcript);

  // msgEl.innerText = e.results[0][0].transcript
  writeMessage(msg);
  checkNumber(msg);
}

//writ what said
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

//check msg againest numbeer
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
}

///generat Random num

function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

/// speak result

recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
