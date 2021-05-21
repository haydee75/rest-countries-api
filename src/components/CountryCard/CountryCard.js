import React from "react";
import { Link } from "react-router-dom";
import "./CountryCard.scss";

const CountryCard = (props) => {

    const { countries } = props;

    if(countries.length > 0 ) {
        return (
            <section className="CountryCard">
                {countries.map((country) => {
                    return (
                        <Link className="Box" key={country.alpha3Code} to={`/countries/${country.alpha3Code}`}>
                            <div className="image"
                                 style={{
                                    backgroundImage: `url(${country.flag})`
                                 }}></div>
                            <div className="content">
                                <h2>{country.name}</h2>
                                <h3>Population: <span>{country.population}</span></h3>
                                <h3>Region: <span>{country.region}</span></h3>
                                <h3>Capital: <span>{country.capital}</span></h3>
                            </div>
                        </Link>
                    )
                })}
            </section>
        )     
    }

  return (
    <div>
      
    </div>
  );
};
export default CountryCard;
