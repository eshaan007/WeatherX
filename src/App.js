import React from "react";
import "./App.css";
import Form from "./app_component/form";
import Weather from "./app_component/weather";
import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/eshaan007/WeatherX
import "weather-icons/css/weather-icons.css";

const Api_Key = "2244550d53377cca8d65c736320c9691";

class App extends React.Component {
  constructor() {
    super();

    // setting state to empty initially
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      wind_speed: "",
      error: false
    };  

    // setting weather to their respective icons
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  // Switch statements specified to get the specific icon for that specific weather condition 
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  // Converting the Temperature to the default - Celsius
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  // event handler for onSubmit button in the form component
  getWeather = async e => {
    e.preventDefault();

    // Retrieve the value in 'city' from the Textbox
    const city = e.target.elements.city.value;

    // When city is entered, the data is fetched and retrieved from the OpenWeatherAPI
    if (city) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`
      );

      // The response received is stored in the form of Standard JSON format 
      const response = await api_call.json();

      // Values are retrieved from the API and Specified to the state
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        wind_speed: response.wind.speed,
        error: false
      });

      // Icons are set
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      // Response is console logged to check if it is working, if not, then the error function is thrown
      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <div className="App-Body">
        <h1 className="heading"> WeatherX </h1>
        <div className="App">
          <Form loadweather={this.getWeather} error={this.state.error} />
          <Weather
            cityname={this.state.city}
            weatherIcon={this.state.icon}
            temp_celsius={this.state.celsius}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            wind_speed={this.state.wind_speed}
          />
        </div>
      </div>
    );
  }
}

export default App;


// Repsonsive 
// Suggestions 
// Dynamic -> Background Color -> Animations