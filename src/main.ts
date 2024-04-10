const getEndpoint = import.meta.env.VITE_GETAPIURL;
const postEndpoint = import.meta.env.VITE_POSTAPIURL;
const deleteEndpoint = import.meta.env.VITE_DELETEAPIURL;
const formEl: HTMLFormElement = document.querySelector("#form")!;

// Get All Data
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

// Cache data in session storage
async function getCachedData() {
  let cachedData = sessionStorage.getItem("cachedData");
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    const data = await getAllData(getEndpoint);
    sessionStorage.setItem("allData", JSON.stringify(data));
    return data;
  }
}

// Render data from cache
async function renderAllData() {
  const data = await getCachedData();
  let total = 0
  for (let i = 0; i < data.length; i++) {
    const start = document.querySelector("#allTableStart");
    const row = document.createElement("tr");
    const deleteBtn = document.createElement("button");
    const subtotal = parseFloat(data[i].amount)
    row.id = data[i].id.toString();
    start?.appendChild(row);
    const category = document.createElement("td");
    const description = document.createElement("td");
    const amount = document.createElement("td");
    category.textContent = data[i].category;
    description.textContent = data[i].description;
    amount.textContent = "$" + data[i].amount;
    total += subtotal;
    deleteBtn.textContent = "Delete";
    row?.appendChild(category);
    row?.appendChild(description);
    row?.appendChild(amount);
    row?.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function () {
      const item = {
        id: this.parentElement?.id
      }
      deleteItem(deleteEndpoint, item);
    });
  }
  const row = document.createElement("tr")
  const label = document.createElement("td")
  const tableTotal = document.createElement("td")
  const spacer = document.createElement("td")
  const spacer2 = document.createElement("td")
  total.toString()
  label.style.fontWeight = "bold"
  label.textContent = "Total"
  tableTotal.style.fontWeight = "bold"
  tableTotal.textContent = "$" + total.toString();
  document?.querySelector("#allTableStart")?.appendChild(row)
  row?.appendChild(label)
  row?.appendChild(spacer)  
  row?.appendChild(tableTotal)
  row?.appendChild(spacer2)
}

// Category Filter
async function categoryFilter(category: string) {
  const data = await getCachedData();
  const filteredData = data.filter((item: any) => item.category === category);
  return filteredData;
}

async function renderCategoryFilter(category: string, id: string) {
  // HTML Table Elements
  const filteredData = await categoryFilter(category);
  const start = document.querySelector(id);
  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableHeadRow = document.createElement("tr");
  const column1 = document.createElement("th");
  const column2 = document.createElement("th");
  const tableBody = document.createElement("tbody");

  // Render to DOM
  start?.appendChild(table);
  table?.append(tableHead);
  tableHead?.appendChild(tableHeadRow);
  tableHeadRow?.appendChild(column1);
  tableHeadRow?.appendChild(column2);
  table?.appendChild(tableBody);

  // Subtotal Store
  let total = 0

  // Set Attributes and Text
  column1.textContent = "Description";
  column2.textContent = "Amount";

  // Generate Table Data
  for (let i = 0; i < filteredData.length; i++) {
    const row = document.createElement("tr");
    const description = document.createElement("td");
    const amount = document.createElement("td");
    const subtotal = parseFloat(filteredData[i].amount)
    row.id = i.toString();
    total += subtotal;
    description.textContent = filteredData[i].description;
    amount.textContent = "$" + filteredData[i].amount;
    tableBody?.appendChild(row);
    row?.appendChild(description);
    row?.appendChild(amount);
  }
  const row = document.createElement("tr")
  const label = document.createElement("td")
  const tableTotal = document.createElement("td")
  total.toString()
  label.style.fontWeight = "bold"
  label.textContent = "Total"
  tableTotal.style.fontWeight = "bold"
  tableTotal.textContent = "$" + total.toString();
  tableBody?.appendChild(row)
  row?.appendChild(label)
  row?.appendChild(tableTotal)  
}

// New Item Form Submission
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
      sessionStorage.clear();
      refresh();
    }
  } catch (error) {
    console.error("There was an error: ", error);
  }
});

async function deleteItem(url: string, content: any) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (response.ok) {
      sessionStorage.clear();
      refresh();
    }
  } catch (error) {
    console.error("There was an error: ", error);
  }
}

async function onLoad() {
  await renderAllData();
  await renderCategoryFilter("expense", "#expensesTable");
  await renderCategoryFilter("discretionary", "#discretionaryTable");
  await renderCategoryFilter("savings", "#savingsTable");
}

async function refresh() {
  await getCachedData();
  window.location.reload();
}

onLoad();


