import React, { useEffect, useState } from "react";
import axios from "axios";

const States = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const [selectState, setSelectState] = useState(true);
  const [selectCity, setSelectCity] = useState(true);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStates = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCities = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    console.log(country);
    if (country) getStates();
    if (country && state) getCities();
    if (country && state && city)
      setMessage(
        <p style={{ display: "flex", flexDirection: "row" }}>
          <b>You selected {city}</b>, {state}, {country}
        </p>
      );
  }, [country, state, city]);
  return (
    <>
      <h1>Select Location</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <select
          name="countries"
          id="countries"
          autoFocus
          style={{ width: "300px", height: "30px" }}
          value={country}
          onChange={(event) => {
            setCountry(event.target.value);
            setSelectState(false);
          }}
        >
          <option value="">Select Country</option>
          {countries.map((element) => (
            <option value={element} key={element}>
              {element}
            </option>
          ))}
        </select>

        <select
          name="states"
          id="states"
          autoFocus
          style={{ width: "300px", height: "30px" }}
          disabled={selectState}
          value={state}
          onChange={(event) => {
            setState(event.target.value);
            setSelectCity(false);
          }}
        >
          <option value="">Select State</option>
          {states.map((element) => (
            <option value={element} key={element}>
              {element}
            </option>
          ))}
        </select>
        <select
          name="countries"
          id="countries"
          autoFocus
          style={{ width: "300px", height: "30px" }}
          disabled={selectCity}
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        >
          <option value="">Select City</option>
          {cities?.map((element) => (
            <option value={element} key={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {message}
      </div>
    </>
  );
};

export default States;
