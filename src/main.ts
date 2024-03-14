const endpoint = import.meta.env.VITE_APIURL

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

renderData(endpoint);
