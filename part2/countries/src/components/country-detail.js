/*
Description:

*/

import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetail = ({country}) => {

    const [flagSource, setFlagSource] = useState("");
    const [capital, setCapital] = useState("");
    const [languages, setLanguages] = useState([])


    useEffect(() => {
        axios
        .get(`https://placesapi.dev/api/v1/countries/${country.iso3166Alpha2}/languages`)
        .then(res => {
            let parsedLanguages = res.data.data.map(languageToParse => languageToParse.name);
            setLanguages(parsedLanguages)
        })

        axios
        .get(`https://placesapi.dev/api/v1/countries/${country.iso3166Alpha2}/flag`)
        .then(res => {
            setFlagSource(res.data.data.url)
        })

    }, [])

    return (
        <>
            <h2>{country.name}</h2>
            <div>population: {country.population}</div>
            <div>area: {country.area}km²</div>
            
            <h3>languages:</h3>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={flagSource}></img>
        </>
    );
}

export default CountryDetail;