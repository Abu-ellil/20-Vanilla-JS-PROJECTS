const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

///////////////////////FUNCTIONS EARYA///////////////////

function success(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const smallEl = input.nextElementSibling;
  smallEl.innerText = message;
}
/////////////////////check email ///////////////////////
function validateEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    success(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

///////////////////Password match//////////////

function passMatch (input1, input2){
  if(input1.value !== input2.value){
    showError(input2, 'PASSWORD must match!')
  }else{
    success(input)
  }
}

///////////////////check inputs//////////////
function checkInputs(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${upperCase(input)} is required!`);
    
    }else {
      success(input);
    }
  });
}
//////////////////////firest letter to upper case//////////////////
function upperCase(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
///////////////////////LENGTH CHECK////////////////////
// function checkLength(input, min, max){
//   if(input.value.length < min){
//     showError(`${input} must be at least ${min} characters!`)
//   }else if(input.value.length > max){
//     showError(`${input} must be less than ${max} characters!`)
//   }else{
//     success(input)
//   }
// }

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${upperCase(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${upperCase(input)} must be less than ${max} characters`
    );
  } else {
    success(input);
  }
}

///////////////////////EVENT LISTENER///////////////////

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs([username, email, password, password2]);
  validateEmail(email)
  checkLength(username,3,15)
  checkLength(password,6,25)
  passMatch(password,password2)
});

///////////////////////FUNCTIONS EARYA///////////////////
