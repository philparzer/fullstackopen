import {useState, useEffect} from "react";
import axios from "axios";

import CountryDetail from "./components/country-detail";
import CountryList from "./components/country-list";


function App() {
  
  const [countries, setCountries] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [countryList, setCountryList] = useState([]);

  let fetchedCountries = [];

  const fetchPaginatedCountries = (nextLink) => {
    console.log("fetching...")
    axios
      .get(nextLink)
      .then(res => {
        fetchedCountries = [...fetchedCountries, ...res.data.data]
        if (res.data.links.next === null) {
          setCountries(fetchedCountries);
          setIsFetching(false);
          return;
        }

        fetchPaginatedCountries(res.data.links.next);

      })
  }

  const updateSearchInput = (event) => {
    let filteredList = countries.filter(country => country.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setCountryList(filteredList);
  }

  useEffect(() => {
    axios
      .get("https://placesapi.dev/api/v1/countries")
      .then(res => {
        fetchedCountries = [...res.data.data];
        fetchPaginatedCountries(res.data.links.next)
      })
  }, [])
  
  return (
    <>
      {isFetching 
        ? 
          <>
            loading...
          </> 
        : 
          <>
            <div>
                find countries{' '}
                <input onChange={updateSearchInput}></input>
            </div>

            { countryList.length > 5 || countryList.length === 0
              ? null
              :
                <>{countryList.length > 1 
                    ? <CountryList countryList={countryList}/>
                    : <CountryDetail country={countryList[0]}/>
                  }
                </>
            }
          </>
      }
      
    </>
  );
}

export default App;
