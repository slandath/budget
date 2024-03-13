const endpoint = 'https://webserver-production-e620.up.railway.app/'

async function getData(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error (`${response.status}: ${response.statusText}`)
    }
    const data = response.json()
    console.log(data)
  } catch (error) {
    console.error('There was an unexpected error =', error)
  }

  // const appData = document.querySelector('#app')
  // appData!.innerHTML = `
  //   <h1>Monthly Budget<h1>
  //   <p>${data}</p>
  // `
}

getData(endpoint)