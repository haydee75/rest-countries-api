import React, { useState } from "react";
import CountryContainer from "./components/CountryContainer/CountryContainer";
import CountryDetails from "./components/CountryDetails/CountryDetails"
import Header from "./components/Header/Header"
import NotFound from './components/NotFound';
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import "./DarkTheme.scss";
import "./LightTheme.scss";

const App = () => {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  const toggleModeClass = isToggled ? "DarkTheme" : "LightTheme";
  const toggleModeName = !isToggled ? "Dark Mode" : "Light Mode";
  const bgColorSelect = isToggled ? "#2b3844" : "#fff";
  const colorSelect = isToggled ? "#fff" : "#2b3844";

  return (
    <div className={`App ${toggleModeClass}`}>
      <div className="page-wrapper">
        <Header toggleAction={toggleTrueFalse} toggleClass={toggleModeClass} toggleName={toggleModeName} />
        <Switch>
          <Route exact path="/rest-countries-api">
            <CountryContainer bgColorSelect={bgColorSelect} colorSelect={colorSelect} />
          </Route>
          <Route path="/countries/:countryId" component={(props) => <CountryDetails {...props} key={window.location.pathname}/>}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};
export default App;
