const balanceAmount = document.getElementById('balance');
const moneyPlusAmount = document.getElementById('money-plus');
const moneyMinusAmount = document.getElementById('money-minus');
const historyList = document.getElementById('list');
const addTransactionForm = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if( text.value.trim() === "" || amount.value.trim() === ""){
    alert("Please Enter Text and Value"); 
  }else{
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateLocalStorage();
    updateValues();
    text.value = "";
    amount.value = "";

  }

}

// generate id
function generateId() {
  return Math.floor(Math.random() * 100000000)
}

function addTransactionDOM(transaction){
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");


  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
  )

  item.innerHTML = 
  `${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="deleteTransaction(${transaction.id})" >x</button>
  `;
  historyList.appendChild(item);
}

// delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(item => item.id !== id);
  updateLocalStorage()
  Init()
}



//  updateValues

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc +=item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0 ).reduce((acc, item) => (acc += item),0).toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc +=item), 0)*-1).toFixed(2);

    balanceAmount.innerText = `$${total}`;
    moneyPlusAmount.innerText = `$${income}`;
    moneyMinusAmount.innerText = `$${expense}`
}

// local storage
function updateLocalStorage() {
  localStorage.setItem(
    "transactions", JSON.stringify(transactions)
  )
}


function Init() {
  historyList.iinerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init()

addTransactionForm.addEventListener('submit', addTransaction);
