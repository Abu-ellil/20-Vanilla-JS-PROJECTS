const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// function getRandomUser() {
//   fetch("https://randomuser.me/api")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
// }
function sortBy() {
  data.sort((a, b) => b.money-a.money);
  updateDOM();
}
function showOnlyMilionaires(){
 data = data.filter((m)=> +m.money>=1000000)
  updateDOM()
}
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.append(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
/////////////////add user//////////////////
addUserBtn.addEventListener("click", () => {
  getRandomUser();
});
/////////////////double///////////
doubleBtn.addEventListener("click", () => {
  data.map((e) => {
    e.money = e.money * 2;
    updateDOM();
  });
});
//////////////////sort////////////
function calculateWealth(){
  const wealth = data.reduce((acc, user)=> (acc+=user.money),0)
  console.log(formatMoney(wealth));
  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl)
  
}
//////////////////sort////////////
sortBtn.addEventListener("click", sortBy);
showMillionaires.addEventListener("click", showOnlyMilionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);




// const arr = [1, 11, 122, 34, 56, 77, 8, 99, 234];

// const sorted = arr.sort((a, b) => a - b);
// const abov30 = arr.filter((i) => i > 30);
// const total = arr.reduce((acc, num)=>(acc + num),0)
// console.log(sorted);
// console.log(abov30); 
// console.log(total); 
