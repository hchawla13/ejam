import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table'
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'




class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    initCity: 'Select',
    weatherFinalData: '',
  };
  getWeatherData = async () => {
    if (this.state.initCity !== 'Select') {
      const res = await this.callWeatherApi(this.state.initCity);
      this.setState({ weatherFinalData: res })
    }
  }
  callWeatherApi = async (cityName) => {
    const response = await fetch(`/weatherData?city=${cityName}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.data;
  };
  change = (event) => {
    this.setState({ initCity: event.target.value });
  }
  render() {
    var data = {
      "coord": {
        "lon": -87.65,
        "lat": 41.85
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 298.86,
        "feels_like": 294.58,
        "temp_min": 298.15,
        "temp_max": 299.82,
        "pressure": 1002,
        "humidity": 47
      },
      "visibility": 16093,
      "wind": {
        "speed": 7.7,
        "deg": 230,
        "gust": 11.8
      },
      "clouds": {
        "all": 40
      },
      "dt": 1586294330,
      "sys": {
        "type": 1,
        "id": 5228,
        "country": "US",
        "sunrise": 1586258533,
        "sunset": 1586305348
      },
      "timezone": -18000,
      "id": 4887398,
      "name": "Chicago",
      "cod": 200
    }
    return (
      <div className="App">
        <label htmlFor="city">Choose a city:</label>
        <select id="city" onChange={this.change} value={this.state.initCity}>
          <option value="Select">Select</option>
          <option value="chicago">Chicago</option>
          <option value="houston">Houston</option>
          <option value="dallas">Dallas</option>
        </select>
        <button onClick={this.getWeatherData}>Send</button>
        <p>Selected city is <span>{this.state.initCity}</span></p>
        {/* <p>{JSON.stringify(this.state.weatherFinalData)}</p> */}
        <Table>
          <Thead>
            <Tr>
              <Th>Latitude</Th>
              <Th>Longitude</Th>
              <Th>Temperature</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{this.state.weatherFinalData ? this.state.weatherFinalData.coord.lat : 'Default latitude'}</Td>
              <Td>{this.state.weatherFinalData ? this.state.weatherFinalData.coord.lon : 'Default latitude'}</Td>
              <Td>{this.state.weatherFinalData ? this.state.weatherFinalData.main.temp : 'Default temperature'}</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    );
  }
}

export default App;


