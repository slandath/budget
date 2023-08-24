// Variables

const net = document.querySelector("#net");
const expenseAllo = document.querySelector("#expenseAllo");
const discretionaryAllo = document.querySelector("#discretionaryAllo");
const savingsAllo = document.querySelector("#savingsAllo");
const expenseBudget = document.querySelector("#expenseBudget");
const discretionaryBudget = document.querySelector("#discretionaryBudget");
const savingsBudget = document.querySelector("#savingsBudget");
const expenseSpent = document.querySelector("#expenseSpent");
const discretionarySpent = document.querySelector("#discretionarySpent");
const savingsSpent = document.querySelector("#savingsSpent");
const expenseDiff = document.querySelector("#expenseDiff");
const discretionaryDiff = document.querySelector("#discretionaryDiff");
const savingsDiff = document.querySelector("#savingsDiff");
const desc = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const addBtn = document.querySelector("#btn-add");

// Event Handler on page load

const handleClick = function (event) {
    const target = event.target;
    switch (true) {
		case target.tagName === "BUTTON" && target.id === "btn-add":
            createTransaction();
            break;
		case target.tagName === "INPUT":
            calcBudget();
            break;
        default:
            return;
    }
};

const buttons = document.querySelectorAll("button");
const inputs = document.querySelectorAll("input");

buttons.forEach((button) => button.addEventListener("click", handleClick));
inputs.forEach((input) => input.addEventListener("input", handleClick));

class Transaction {
    constructor(id, category, description, amount) {
		this.id = id;
        this.category = category;
        this.description = description;
        this.amount = amount;
    }
}

// Globals

const transactionLog = [];
let transactionLogCounter = 0;
const expenseItems = [];
const discretionaryItems = [];
const savingsItems = [];
const selects = [];
let expenseBudgetAmt = 0
let discretionaryBudgetAmt = 0
let savingsBudgetAmt = 0

// Functions

function changeColor() {
    selects.forEach((item) => {
        switch (true) {
            case item.value === "expense":
                item.parentElement.className = "transaction-subcontainer-red";
                break;
            case item.value === "discretionary":
                item.parentElement.className = "transaction-subcontainer-orange";
                break;
            case item.value === "savings":
                item.parentElement.className = "transaction-subcontainer-yellow";
                break;
        }
    });
}

function calcBudget() {
	expenseBudgetAmt = Math.round(+net.value * (expenseAllo.value * 0.01) * 100) / 100;
	discretionaryBudgetAmt = Math.round(+net.value * (discretionaryAllo.value * 0.01) * 100) / 100;
	savingsBudgetAmt = Math.round(+net.value * (savingsAllo.value * 0.01) * 100) / 100;
    expenseBudget.innerText = `$${expenseBudgetAmt}`
    discretionaryBudget.innerText = `$${discretionaryBudgetAmt}`
    savingsBudget.innerText = `$${savingsBudgetAmt}`
}

function enterTransaction() {
    const foo = event.currentTarget.parentElement.children;
    const transactionItems = [foo[1], foo[2], foo[3]];
	
    transactionItems.forEach((item) => {
        item.disabled = true;
    });

    const entry = new Transaction(transactionLogCounter, foo[1].value, foo[2].value, foo[3].value);
    transactionLog.push(entry);
	console.log(transactionLog);

	calcExpenses()
	calcDiscretionaries()
	calcSavings()
}

function calcExpenses() {

	let expenses = transactionLog.filter(function(transaction) {
		return transaction.category === "expense"
	});
	
	console.log(expenses);
		
	if (expenses.length > 0) { 
		expenses.forEach((transaction) => expenseItems.push(+transaction.amount))
		let expenseSum = 0
		for (let expense of expenseItems) {
			expenseSum += expense
		}
		expenseSpent.innerText = `$${expenseSum}`;
		expenseDiff.innerText = `$${expenseBudgetAmt - expenseSum}`
		
	expenseSum = 0;
	expenses.splice(0, expenses.length);
	expenseItems.splice(0, expenseItems.length);
} else {
	expenseSpent.innerText = "$0"
	expenseDiff.innerText = "$0"
}
}

function calcDiscretionaries() {
	
	let discretionaries = transactionLog.filter(function(transaction) {
		return transaction.category === "discretionary"
	});
		
	if (discretionaries.length > 0) { 
		discretionaries.forEach((transaction) => discretionaryItems.push(+transaction.amount))
		let discretionarySum = 0
		for (let discretionary of discretionaryItems) {
			discretionarySum += discretionary
		}
		discretionarySpent.innerText = `$${discretionarySum}`;
		discretionaryDiff.innerText = `$${discretionaryBudgetAmt - discretionarySum}`
		
	discretionarySum = 0;
	discretionaries.splice(0, discretionaries.length);
	discretionaryItems.splice(0, discretionaryItems.length);
} else {
	discretionarySpent.innerText = "$0"
	discretionaryDiff.innerText = "$0"
}
}

function calcSavings() {
	let savings = transactionLog.filter(function(transaction) {
		return transaction.category === "savings"
	});
		
	if (savings.length > 0) { 
		savings.forEach((transaction) => savingsItems.push(+transaction.amount))
		let savingsSum = 0
		for (let saving of savingsItems) {
			savingsSum += saving
		}
		savingsSpent.innerText = `$${savingsSum}`;
		savingsDiff.innerText = `$${savingsBudgetAmt - savingsSum}`
		
	savingsSum = 0;
	savings.splice(0, savings.length);
	savingsItems.splice(0, savingsItems.length);
} else {
	savingsSpent.innerText = "$0";
}
}

function createTransaction() {
	const div = document.createElement("div")
		div.className = "transaction-subcontainer"
		div.id = "transaction-subcontainer"
	const eyeDee = document.createElement("p")
		eyeDee.innerText = transactionLogCounter
	const selectCategory = document.createElement("select")
		selectCategory.name = "category"
		selectCategory.className = "input"
		selectCategory.id = "category"
	const option1 = document.createElement("option")
		option1.value = "expense";
		option1.innerText = "Expense";
	const option2 = document.createElement("option")
		option2.value = "discretionary";
		option2.innerText = "Discretionary";
	const option3 = document.createElement("option")
		option3.value = "savings";
		option3.innerText = "Savings";
	const input1 = document.createElement("input")
		input1.type = "text"
		input1.className = "input"
		input1.id = "desc"
		input1.placeholder = "description"
	const input2 = document.createElement("input")
		input2.type = "text"
		input2.className = "input"
		input2.id = "amount"
		input2.placeholder = "$"
	const button1 = document.createElement("button")
		button1.id = "enter"
		button1.className = "btn"
		button1.innerText = "\u2714"
	const button2 = document.createElement("button")
		button2.id = "delete"
		button2.className = "btn"
		button2.innerText = "\u2716"
	
	document.querySelector("#transaction-container").appendChild(div);
	div.appendChild(eyeDee);
	div.appendChild(selectCategory);
	selectCategory.appendChild(option1);
	selectCategory.appendChild(option2);
	selectCategory.appendChild(option3);
	div.appendChild(input1);
	div.appendChild(input2);
	div.appendChild(button1);
	div.appendChild(button2);
	
	eventHandler()
	changeColor();
	transactionLogCounter++
}

function eventHandler() {
	const handleClick = function (event) {
    const target = event.target;
    switch (true) {
        case target.tagName === "BUTTON" && target.id === "enter":
            enterTransaction();
            break;
		case target.tagName === "BUTTON" && target.id === "delete":
            deleteTransaction();
            break;
        case target.tagName === "SELECT":
            changeColor();
            break;
        default:
            return;
    }
};

const buttons = document.querySelectorAll("button");
const selectMenus = document.querySelectorAll("select");

buttons.forEach((button) => button.addEventListener("click", handleClick));
selectMenus.forEach((select) => select.addEventListener("input", handleClick));
selectMenus.forEach((select) => selects.push(select));

}

function deleteTransaction() {
	const target = event.target;
	const targetID = target.parentElement.children[0].innerText;
	transactionLog.pop(targetID);
	calcExpenses()
	calcDiscretionaries()
	calcSavings()
	target.parentElement.remove();
}