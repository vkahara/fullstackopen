import axios from 'axios'
import { useEffect, useState } from 'react'


const ShowCountries = (props) => {
  const countriesToShow = props.allCountries.filter((country) =>
    (country.name.common.toLowerCase().includes(props.searchCountries.toLowerCase())))

  console.log("countries length",countriesToShow.length);

  if (countriesToShow.length == 1) {
    const country = countriesToShow[0]
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))}
        </ul>
        <img src={country.flags.png}/>
      </div>   
    )

  } else if (countriesToShow.length <= 10) {
    return(
      <div>
      {countriesToShow.map(country =>
        <p key={country.cca3}>
          {country.name.common}
        </p>
        )}
      </div>
    )
  } else {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
}

const App = () => {
  const [searchCountries, setSearchCountries] = useState('')
  const [allCountries, setAllCountries] = useState([])

  const handleCountriesChange = (event) => {
    setSearchCountries(event.target.value)
  }

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
      <ShowCountries allCountries={allCountries} searchCountries={searchCountries}/>

    </div>
  )
}

export default App
