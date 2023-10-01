const net = document.querySelector('#monthlyNet');
const expenseAllo = document.querySelector('#expenseAllo');
const discretionaryAllo = document.querySelector('#discretionaryAllo');
const savingsAllo = document.querySelector('#savingsAllo');
const spdExpenseBdg = document.querySelector('#spdExpensesBdg');
const spdDiscretionaryBdg = document.querySelector('#spdDiscretionaryBdg');
const spdSavingsBdg = document.querySelector('#spdSavingsBdg');
const anchorDiv = document.querySelector('#anchorDiv');

let expenseAmt = 0;
let discretionaryAmt = 0;
let savingsAmt = 0;

document.addEventListener('input', inputHandler);
document.addEventListener('click', clickHandler);

function inputHandler() {
  switch (true) {
    case net.value > 0:
      displayAmts();
      break;
    default:
  }
}

function clickHandler(e) {
  switch (true) {
    case e.target.id === 'addTransBtn':
      new TransactionElement();
      break;
    case e.target.dataset.role === 'enter':
      enterTransaction(e);
      displayAmts();
      break;
    case e.target.dataset.role === 'delete':
      deleteTransaction(e);
      displayAmts();
      break;
    default:
  }
}

class TransactionElement {
  constructor() {
    this.div1 = document.createElement('div');
    this.div2 = document.createElement('div');
    this.div3 = document.createElement('div');
    this.div4 = document.createElement('div');
    this.div5 = document.createElement('div');
    this.select = document.createElement('select');
    this.option1 = document.createElement('option');
    this.option2 = document.createElement('option');
    this.option3 = document.createElement('option');
    this.input1 = document.createElement('input');
    this.input2 = document.createElement('input');
    this.button1 = document.createElement('button');
    this.button2 = document.createElement('button');

    this.div1.className = 'row border rounded-2 p-2 m-2 bg-dark';
    this.div2.className = 'col-lg-4 col-md-3 col-sm-6 col-6';
    this.div3.className = 'col-lg col-md-5 col-sm-6 col-6';
    this.div4.className =
      'col-lg-2 col-md-2 col-sm-6 col-6 mt-lg-0 mt-md-0 mt-sm-1 mt-1';
    this.div5.className =
      'col-lg-1 col-md-2 col-sm-2 col-2 mt-lg-0 mt-md-0 mt-sm-1 mt-1 d-flex justify-content-between';
    this.select.className = 'form-select form-select-sm';
    this.input1.className = 'form-control form-control-sm';
    this.input2.className = 'form-control form-control-sm';
    this.button1.className = 'btn btn-sm bg-success text-light';
    this.button2.className = 'btn btn-sm bg-danger text-light';

    this.select.ariaLabel = 'category';

    this.option1.value = 'expense';
    this.option1.innerText = 'Expense';
    this.option2.value = 'discretionary';
    this.option2.innerText = 'Discretionary';
    this.option3.value = 'savings';
    this.option3.innerText = 'Savings';

    this.input1.type = 'text';
    this.input1.placeholder = 'Description';
    this.input2.type = 'number';
    this.input2.placeholder = '$';
    this.button1.type = 'button';
    this.button1.innerText = '\u2713';
    this.button1.dataset.role = 'enter';
    this.button2.type = 'button';
    this.button2.innerText = 'X';
    this.button2.dataset.role = 'delete';

    anchorDiv.append(this.div1);
    this.div1.append(this.div2);
    this.div2.append(this.select);
    this.select.append(this.option1);
    this.select.append(this.option2);
    this.select.append(this.option3);
    this.div1.append(this.div3);
    this.div3.append(this.input1);
    this.div1.append(this.div4);
    this.div4.append(this.input2);
    this.div1.append(this.div5);
    this.div5.append(this.button1);
    this.div5.append(this.button2);
  }
}

function enterTransaction(e) {
  switch (true) {
    case e.target.parentElement.parentElement.children[0].children[0].value ===
      'expense':
      e.target.parentElement.parentElement.children[0].children[0].disabled = true;
      e.target.parentElement.parentElement.children[1].children[0].disabled = true;
      e.target.parentElement.parentElement.children[2].children[0].disabled = true;
      e.target.parentElement.parentElement.children[3].children[0].disabled = true;
      expenseAmt +=
        +e.target.parentElement.parentElement.children[2].children[0].value;
      break;
    case e.target.parentElement.parentElement.children[0].children[0].value ===
      'discretionary':
      e.target.parentElement.parentElement.children[0].children[0].disabled = true;
      e.target.parentElement.parentElement.children[1].children[0].disabled = true;
      e.target.parentElement.parentElement.children[2].children[0].disabled = true;
      e.target.parentElement.parentElement.children[3].children[0].disabled = true;
      discretionaryAmt +=
        +e.target.parentElement.parentElement.children[2].children[0].value;
      break;
    case e.target.parentElement.parentElement.children[0].children[0].value ===
      'savings':
      e.target.parentElement.parentElement.children[0].children[0].disabled = true;
      e.target.parentElement.parentElement.children[1].children[0].disabled = true;
      e.target.parentElement.parentElement.children[2].children[0].disabled = true;
      e.target.parentElement.parentElement.children[3].children[0].disabled = true;
      savingsAmt +=
        +e.target.parentElement.parentElement.children[2].children[0].value;
      break;
    default:
  }
}

function deleteTransaction(e) {
  switch (true) {
    case e.target.parentElement.parentElement.children[0].children[0].value ===
      'expense':
      e.target.parentElement.parentElement.remove();
      expenseAmt -=
        +e.target.parentElement.parentElement.children[2].children[0].value;
      break;
    case e.target.parentElement.parentElement.children[0].children[0].value ===
      'discretionary':
      e.target.parentElement.parentElement.remove();
      discretionaryAmt -=
        +e.target.parentElement.parentElement.children[2].children[0].value;
      break;
    case e.target.parentElement.parentElement.children[0].children[0].value ===
      'savings':
      e.target.parentElement.parentElement.remove();
      savingsAmt -=
        +e.target.parentElement.parentElement.children[2].children[0].value;
      break;
    default:
  }
}

function calcExpenseBudget() {
  return net.value * (expenseAllo.value / 100);
}

function calcDiscretionaryBudget() {
  return net.value * (discretionaryAllo.value / 100);
}

function calcSavingsBudget() {
  return net.value * (savingsAllo.value / 100);
}

function displayAmts() {
  const expenseBdg = calcExpenseBudget();
  const discretionaryBdg = calcDiscretionaryBudget();
  const savingsBdg = calcSavingsBudget();

  spdExpenseBdg.innerText = `$${expenseBdg}`;
  spdDiscretionaryBdg.innerText = `$${discretionaryBdg}`;
  spdSavingsBdg.innerText = `$${savingsBdg}`;

  document.querySelector('#spdExpenseAmt').innerText = `$${expenseAmt}`;
  document.querySelector(
    '#spdDiscretionaryAmt'
  ).innerText = `$${discretionaryAmt}`;
  document.querySelector('#spdSavingsAmt').innerText = `$${savingsAmt}`;

  document.querySelector('#spdExpenseDiff').innerText = `$${
    expenseBdg - expenseAmt
  }`;
  document.querySelector('#spdDiscretionaryDiff').innerText = `$${
    discretionaryBdg - discretionaryAmt
  }`;
  document.querySelector('#spdSavingsDiff').innerText = `$${
    savingsBdg - savingsAmt
  }`;
}
