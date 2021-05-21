import React, { useState, useEffect } from "react";
import CountryDetailsCard from "./CountryDetailsCard";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CountryDetails.scss";

const CountryDetails = (props) => {
    const { countryId } = useParams();
    const [country, getCountryId] = useState([]);
    const [currency, getCurrency] = useState([]);
    const [languages, getLanguages] = useState([]);
    const [borders, getBorders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [datas, setDatas] = useState(false);

    let URLOne = `https://restcountries.eu/rest/v2/alpha/${countryId}`;
    let URLTwo = "https://restcountries.eu/rest/v2?fields=alpha3Code;name";
    
    const requestOne = axios.get(URLOne);
    const requestTwo = axios.get(URLTwo);

    useEffect(() => {
      setLoading(true);
      setDatas(false)
      
      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
          const countryDetail = responses[0].data;
          const countriesList = responses[1].data;

          getCountryId(countryDetail);
          setLoading(false);
          setDatas(true)
          getCurrency(countryDetail.currencies[0].name);
      
          let arrLangs = [];
          countryDetail.languages.map(lang => {
            return arrLangs.push(lang.name)
          })
          getLanguages(arrLangs.join(', '))

          let arrBords = [];
          countryDetail.borders.map(border => {
            let res = countriesList.find((cty) => cty.alpha3Code === border)
            return arrBords.push(res)
          })
          getBorders(arrBords)
    })
  )
  .catch(errors => {
    console.error(errors);
    if (errors.response.status === 400) {
      setDatas(false)
      setLoading(false);
    }
  });
    }, []);

    if (loading) {
      return <div className="LoadingContainer"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
    }
    
    let bordersLink = borders.map(bd => {
      return (
        <Link className="Border" key={bd.alpha3Code} to={`/countries/${bd.alpha3Code}`}>{bd.name}</Link>
      )
    })

    let listBorders = borders.length === 0 ? `No Border` : bordersLink

    return (
      <div className="CountryContainer">
        <Link className="BackLink" to="/rest-countries-api"><span><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 476.213 476.213">
<polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5   57.427,253.107 476.213,253.107 "/></svg></span>Back</Link>
        { datas ?
        <CountryDetailsCard name={country.name} topLevelDomain={country.topLevelDomain} flag={country.flag} nativeName={country.nativeName} population={country.population} region={country.region} subregion={country.subregion} capital={country.capital} currency={currency} languages={languages} listBorders={listBorders}/>
        :
        <CountryDetailsCard name="Unknown" flag="Unknown" nativeName="Unknown" population="Unknown" region="Unknown" subregion="Unknown" capital="Unknown" currency="Unknown" languages="Unknown" listBorders="Unknown"/>
        }
      </div>
    );
};
export default CountryDetails;