import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from 'prop-types';
import getUrlByCity from './../../services/getUrlWeatherByCity';
import transformWeather from './../../services/transformWeather';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';


class WeatherLocation extends Component {

    constructor(props) {
        super(props);
        const { city } = props;

        this.state = {
            city,
            data: null,
        };
    }

    componentDidMount() {
        this.handleUpdateClick();
    }

    componentDidUpdate(prevProps, prevState) {
        // this.handleUpdateClick();
    }

    handleUpdateClick = () => {
        const api_weather = getUrlByCity(this.state.city);
        fetch(api_weather).then(resolve => {
            return resolve.json();
        }).then(data => {
            const newWeather = transformWeather(data);
            this.setState({
                data: newWeather
            });
        });
    }

    render() {

        const { city, data } = this.state;
        const { onWeatherLocationClick } = this.props;
        return (
            <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
                <Location city={city} ></Location>
                {data ?
                    <WeatherData data={data}></WeatherData> :
                    <CircularProgress size={50} />
                }
            </div>
        );
    }
}
WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func,
}

export default WeatherLocation;