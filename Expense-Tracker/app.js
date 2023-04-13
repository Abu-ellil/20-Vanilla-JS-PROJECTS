const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "flower", amount: -20 },
  { id: 1, text: "Salary", amount: 300 },
  { id: 1, text: "Book", amount: -15 },
  { id: 1, text: "Camera", amount: 150 },
];

let transactions = dummyTransactions;

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransFromDOM(${
    transaction.id
  })">x</button>
  `;
  list.appendChild(item);
}

////UpdateBalance////////

function addTransaction(e) {
  e.preventDefault();

  if (text.value === "" || amount.value === "") {
    alert("Please Enter Title and Amount!");
  } else {
    const obj = { id: createId(), text: text.value, amount: +amount.value };
    dummyTransactions.push(obj);
    
    text.value = "";
    amount.value = "";
    UpdateValues()
  }
}

function createId() {
  return Math.floor(Math.random() * 10000000);
}

/////////////remove frome DOM///////////

function removeTransFromDOM(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  // updateLocalStorage();

  init();
}


function UpdateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  // const plas = []
  // const min = []
  balance.innerText = amounts.reduce((a, b) => a + b, 0).toFixed(2);
  money_plus.textContent = `$${amounts
    .filter((item) => item > 0)
    .reduce((a, b) => a + b, 0)
    .toFixed(2)}`;
  money_minus.textContent = `$${amounts
    .filter((item) => item < 0)
    .reduce((a, b) => a + b, 0)
    .toFixed(2)}`;
  //   amounts.map(num => {
  //     if (num > 0) {
  //       plas.push(num)
  //     } else {
  //       min.push(num)
  //     }
  //   })

  // money_plus.textContent = `$${plas.reduce((a,b)=>a+b).toFixed(2)}`
  // money_minus.textContent = `$${(min.reduce((a,b)=>a+b)*-1).toFixed(2)}`

  // console.log(plas);
  // console.log(min);
  //
}

form.addEventListener("submit", addTransaction);

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  UpdateValues();
}

init();

// list.childNodes.forEach((e) => {
//   const del = document.querySelector(".delete-btn");
// });
// del.addEventListener('click', () => {
//   dummyTransactions.pop()
//   init()
//   console.log(dummyTransactions);
// })
// console.log(del);
