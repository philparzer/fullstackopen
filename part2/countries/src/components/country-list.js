/*
Description:

*/

import { useState } from "react";

import CountryDetail from "./country-detail";

const CountryList = ({countryList}) => {
    const [countryDetailed, setCountryDetailed] = useState(null);

    return (
        <> {countryDetailed === null
            ? 
                <ul>
                    {countryList.map(country => 
                        <li key={country.iso3166Alpha2}>
                            {country.name} {' '}
                            <button onClick={() => setCountryDetailed(country)}>show</button>
                        </li>
                    )}
                </ul>
            : <CountryDetail country={countryDetailed} />
            }
        </>
    );
}

export default CountryList;