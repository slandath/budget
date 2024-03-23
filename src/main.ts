const getEndpoint = import.meta.env.VITE_GETAPIURL;
const postEndpoint = import.meta.env.VITE_POSTAPIURL;
const formEl: HTMLFormElement = document.querySelector("#form")!;

async function getAllData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an unexpected error =", error);
  }
}

async function renderAllData(url: string) {
  const data = await getAllData(url);
  let total = 0
  for (let i = 0; i < data.length; i++) {
    const start = document.querySelector("#allTableStart");
    const row = document.createElement("tr");
    const deleteBtn = document.createElement("button")
    row.id = i.toString();
    start?.appendChild(row);
    const category = document.createElement("td");
    const description = document.createElement("td");
    const amount = document.createElement("td");
    category.textContent = data[i].category;
    description.textContent = data[i].description;
    amount.textContent = data[i].amount;
    total += data[i].amount
    deleteBtn.textContent = "Delete"
    row?.appendChild(category);
    row?.appendChild(description);
    row?.appendChild(amount);
    row?.appendChild(deleteBtn)
  }
}

async function renderCategoryFilter(category: string, id: string, url: string) {
  // HTML Table Elements
  const filteredData = await categoryFilter(category, url);
  const start = document.querySelector(id);
  const table = document.createElement("table")
  const tableHead = document.createElement("thead")
  const tableHeadRow = document.createElement("tr")
  const column1 = document.createElement("th")
  const column2 = document.createElement("th")
  const tableBody = document.createElement("tbody")

  // Render to DOM
  start?.appendChild(table);
  table?.append(tableHead);
  tableHead?.appendChild(tableHeadRow)
  tableHeadRow?.appendChild(column1)
  tableHeadRow?.appendChild(column2)
  table?.appendChild(tableBody)

  // Set Attributes and Text
  table.setAttribute("style", "border: 1px solid black")
  column1.textContent = "Description"
  column2.textContent = "Amount"

  // Generate Table Data
  for (let i = 0; i < filteredData.length; i++) {
    const row = document.createElement("tr");
    const description = document.createElement("td");
    const amount = document.createElement("td");
    row.id = i.toString();
    description.textContent = filteredData[i].description;
    amount.textContent = filteredData[i].amount;
    tableBody?.appendChild(row)
    row?.appendChild(description);
    row?.appendChild(amount);
    console.log(filteredData)
  }
}

async function categoryFilter(category: string, url: string) {
  const data = await getAllData(url);
  const filteredData = data.filter((item: any) => item.category === category);
  return filteredData;
}

formEl.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(formEl);
  const content = Object.fromEntries(formData);
  try {
    const response = await fetch(postEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error("There was an error: ", error);
  }
});


renderAllData(getEndpoint);
renderCategoryFilter("expense", "#expensesTable", getEndpoint);
renderCategoryFilter("discretionary", "#discretionaryTable", getEndpoint)
renderCategoryFilter("savings", "#savingsTable", getEndpoint)
