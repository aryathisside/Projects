import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import sunImage from "../assets/sun.png";
import thunderImg from "../assets/thunder.png";
import tornado from "../assets/Tornado.png";
import rain from "../assets/rain.png";
import {
  Wrapper,
  CardSection,
  DATE,
  CITY,
  Temp,
  Weather,
  GlobalStyle,
  IMG,
  FORM,
} from "./styles";

const Card = () => {
  const [cityName, setCityName] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(sunImage);

  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "a8bc92a092ac91a5ef10345d35ebdef9";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setWeatherData(data);
        const weatherMain = data.weather[0].main;
        console.log(weatherMain);
        setIcon(getWeatherIconUrl(weatherMain)); // Update icon based on weather
      } else {
        console.error("Error fetching weather data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherIconUrl = (weather) => {
    switch (weather) {
      case "Clear":
        return sunImage; // Path to your sunny weather icon
      case "Rain":
        return rain; // Path to your rainy weather icon
      case "Snow":
        return tornado; // Path to your snowy weather icon
      case "Haze":
        return sunImage;
      case "Mist":
        return thunderImg; // Path to your misty weather icon
      default:
        return sunImage; // Default icon if no match
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    // Logic to handle city form submission if needed
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <CardSection>
          <DATE>{formattedDate}</DATE>
          <CITY>{cityName}</CITY>
          <IMG src={icon} alt="Weather Image" />
          <Temp>{weatherData && <h1>{weatherData.main.temp}°C</h1>}</Temp>
          <Weather>
            {weatherData && <h2>{weatherData.weather[0].description}</h2>}
          </Weather>

          <FORM onSubmit={handelSubmit}>
            <input
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter City Name"
              required
            />
            <button type="submit">Get</button>
          </FORM>
        </CardSection>
      </Wrapper>
    </>
  );
};

export default Card;
