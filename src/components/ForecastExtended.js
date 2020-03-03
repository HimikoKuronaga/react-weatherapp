import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';
import './styles.css';

import { api_key, api_base_forecast } from './../constants/api_url';


class ForecastExtended extends Component {

    constructor(props) {
        super(props);
        const { city } = props;
        this.state = {
            city,
            forecastData: null
        }
    }

    componentDidMount() {
        this.updateCity(this.props.city);
    }

    /**Para hacer actualizaciones cuando se modifica la 
     * propiedad city.
     * 
     * Se ejecuta siempre, excepto la primera vez.
     */

    componentWillReceiveProps(nextProps) {
        if (nextProps.city !== this.props.city) {
            this.setState({ forecastData: null });
            this.updateCity(nextProps.city);
        }
    }

    updateCity = city => {
        const url_forecast = `${api_base_forecast}?q=${city}&appid=${api_key}`;

        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                const forecastData = transformForecast(weather_data);
                this.setState({
                    forecastData,
                })
            }
        );
    }

    renderForecastItemDays(forecastData) {
        return forecastData.map(forecast => (
            <ForecastItem
                key={`${forecast.weekDay}${forecast.hour}`}
                weekDay={forecast.weekDay}
                hour={forecast.hour}
                data={forecast.data}
            >
            </ForecastItem>
        ));
    }

    renderProgress = () => {
        return <h3>Cargando Pronostico Extendido...</h3>;
    }

    render() {
        const { city } = this.props;
        const { forecastData } = this.state;
        return (
            <div>
                <h2 className='forecast-title'>Pronóstico Extendido para {city}</h2>
                {
                    forecastData ?
                        this.renderForecastItemDays(forecastData) :
                        this.renderProgress()
                }
            </div>
        );
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;