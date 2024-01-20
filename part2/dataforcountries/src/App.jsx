import axios from 'axios'
import { useEffect, useState } from 'react'

const CountryView = (props) => {
  return(
    <div>
      <h2>{props.country.name.common}</h2>
        <p>capital {props.country.capital}</p>
        <p>area {props.country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.entries(props.country.languages).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))}
        </ul>
        <img src={props.country.flags.png}/>
    </div>
  )
}

const DisplayCountryList = (props) => {
  return(
    <div>
      {props.countriesToShow.map(country =>
        <p key={country.cca3}>
          {country.name.common}
          <button onClick={() => props.handleButton(country)}>show</button>
        </p>
        )}
      </div>
  )
}

const ShowCountries = (props) => {
  const countriesToShow = props.allCountries.filter((country) =>
    (country.name.common.toLowerCase().includes(props.searchCountries.toLowerCase())))

  const handleButton = (country) => {
    props.setSelectedCountry(country)
  }

  if (countriesToShow.length === 1) {
    const country = countriesToShow[0]
    return(
      <CountryView country={country}/>
    )
  } else if (countriesToShow.length <= 10) {
    if (props.selectedCountry === null) {
      return(
        <DisplayCountryList countriesToShow={countriesToShow} handleButton={handleButton}/>
      ) 
    } else {
      return(
        <CountryView country={props.selectedCountry} />
      )
    } 
  } else {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
}

const App = () => {
  const [searchCountries, setSearchCountries] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleCountriesChange = (event) => {
    setSearchCountries(event.target.value)
    setSelectedCountry(null)
  }

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountries(response.data)
    })
  }, [])

  return (
    <div>
      <form>
        <div>find countries
           <input value={searchCountries} onChange={handleCountriesChange}></input>
        </div>
      </form>
      <ShowCountries allCountries={allCountries} searchCountries={searchCountries}
      selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
    </div>
  )
}

export default App
