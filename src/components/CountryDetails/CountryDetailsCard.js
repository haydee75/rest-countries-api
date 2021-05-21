import React from "react";

const CountryDetailsCard = (props) => {

    return (
      <div className="Container">
          <div className="Column Img" style={{backgroundImage: `url(${props.flag})`}}>
          </div>
          <div className="Column Content">
            <h2>{props.name}</h2>
            <div className="SubCol">
              <div>
                <h4>Native Name: <span>{props.nativeName}</span></h4>
                <h4>Population: <span>{props.population}</span></h4>
                <h4>Region: <span>{props.region}</span></h4>
                <h4>Sub Region: <span>{props.subregion}</span></h4>
                <h4>Capital: <span>{props.capital}</span></h4>
              </div>
              <div>
                <h4>Top Level Domain: <span>{props.topLevelDomain}</span></h4>
                <h4>Currencies: <span>{props.currency}</span></h4>
                <h4>Languages: <span>{props.languages}</span></h4>
              </div>
            </div>
            <div className="Borders">
              <h4>Border Countries:</h4> <div>{props.listBorders}</div>
            </div>
          </div>
      </div>
    );
};
export default CountryDetailsCard;