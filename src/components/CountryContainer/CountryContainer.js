import React, { useState, useEffect } from "react";
import CountryCard from '../CountryCard/CountryCard';
import "./CountryContainer.scss";
import axios from "axios";
import Select from 'react-select';

const CountryContainer = (props) => {
  const [countries, getCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesSearchResult, setCountriesSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const URL = "https://restcountries.eu/rest/v2?fields=alpha3Code;name;population;region;capital;flag";

  const options = [
    { value: '', label: 'Filter By Region' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Oceania', label: 'Oceania' },
    { value: 'Europe', label: 'Europe' }
  ]

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}`)
      .then((response) => {
        const allCountries = response.data;

        getCountries(allCountries);
        setLoading(false);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  useEffect(() => {
    setCountriesSearchResult(
      countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  if (loading) {
    return <div className="LoadingContainer"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
  }

  const handleSelectRegions = async (selectedOption) => {
    setSelectedOption(selectedOption)
    if(selectedOption.value) {
        await axios.get(`https://restcountries.eu/rest/v2/region/${selectedOption.value}`)
    .then((response) => {
        const searchResults = response.data;
        getCountries(searchResults);
    }).catch((error) => console.error(`Error: ${error}`))
    } else {
        await axios.get(`${URL}`)
        .then((response) => {
            const searchResults = response.data;
            getCountries(searchResults);
        }).catch((error) => console.error(`Error: ${error}`))
    }
  }

  const customStyles = {
    control: () => ({
      cursor: "pointer",
      borderRadius: "5px",
      width: 200,
      height: 56,
      backgroundColor: props.bgColorSelect,
      display: "flex",
      justifyContent: "space-between"
    }),
    singleValue: () => ({
      color: props.colorSelect,
      paddingLeft: "12px"
    }),
    indicatorSeparator: () => ({
      display: "none"
    }),
    placeholder: () => ({
      color: props.colorSelect,
    }),
    input: () => ({
      color: props.colorSelect,
    }),
    menu: () => ({
      backgroundColor: props.bgColorSelect,
      color: props.colorSelect,
      position: "absolute",
      width: 200,
      marginTop: "4px",
      borderRadius: "5px",
    })
  }

  return (
    <div className="CountryContainer">
      <nav className="CountryNavigation">
        <div className="SearchBar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="search"><path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z" fill="#848484"></path></g></svg>
          <input
            type="text"
            placeholder="Search for a country…"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select styles={customStyles} className="SelectBar" value={selectedOption} options={options} defaultValue={{ value: '', label: 'Filter By Region' }} onChange={handleSelectRegions}/>
      </nav>
      <CountryCard countries={countriesSearchResult} />
    </div>
  );
};
export default CountryContainer;
