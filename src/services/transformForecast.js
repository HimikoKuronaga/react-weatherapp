import moment from 'moment';
import 'moment/locale/es'
import transformWeather from './../services/transformWeather';

const transformForecast = data => (
    data.list.filter (item => (
        moment.unix(item.dt).hour() === 6 ||
        moment.unix(item.dt).hour() === 12 ||
        moment.unix(item.dt).hour() === 18 
    )).map(item =>{
        const forecast = {
            weekDay: moment.unix(item.dt).format('ddd'),
            hour: moment.unix(item.dt).hour(),
            data: transformWeather(item),
        }
        const temperature = Number(forecast.data.temperature);
        forecast.data.temperature = temperature;
        
        console.log(forecast);
        return forecast;
    })
);

export default transformForecast;