const getEndpoint = import.meta.env.VITE_GETAPIURL
const postEndpoint = import.meta.env.VITE_POSTAPIURL
const form = document.querySelector('form')!;

// Event Listeners
form?.addEventListener("submit", function(e) {
  formSubmit(e,postEndpoint)
})


async function getData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("There was an unexpected error =", error);
  }
}

async function renderData(url: string) {
  const data = await getData(url);
  for (let i = 0; i < data.length; i++) {
    const start = document.querySelector('#start')
    const row = document.createElement('tr')
    row.id = i.toString();
    start?.appendChild(row)
    const category = document.createElement('td')
    const description = document.createElement('td')
    const amount = document.createElement('td')
    category.textContent = data[i].category
    description.textContent = data[i].description
    amount.textContent = data[i].amount
    row?.appendChild(category)
    row?.appendChild(description)
    row?.appendChild(amount)
  }
}

async function formSubmit(e: Event, url: string) {
e.preventDefault();
const formData = new FormData(form)
try {
  const response = await fetch(url, {
    method: "POST", 
    body: formData})
    const data = await response.json();
    console.log(data)
} catch (error) {
  (console.error("Error: ", error))
}
}
renderData(getEndpoint);
