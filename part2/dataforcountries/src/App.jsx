import axios from 'axios'
import { useEffect, useState } from 'react'


function App() {
  const [searchCountries, setSearchCountries] = useState('')
  const [allCountries, setAllCountries] = useState([])

  const handleCountriesChange = (event) => {
    setSearchCountries(event.target.value)
    console.log('countries',searchCountries)
  }

  const countriesToShow = allCountries.filter((country) =>
    (country.name.common.toLowerCase().includes(searchCountries.toLowerCase())))


  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountries(response.data)
      console.log("allcountries", allCountries)
      
    })
  }, [])

  

  return (
    <div>
      <form>
        <div>find countries
           <input value={searchCountries} onChange={handleCountriesChange}></input>
        </div>
      </form>

      {countriesToShow.map(country =>
      <p key={country.cca3}>
        {country.name.common}
      </p>
      )}

    </div>
  )
}

export default App
