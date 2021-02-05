import React from "react";
import { Badge } from '../components/Badge/badge';
import 'weather-icons/css/weather-icons.css';

export default function CardHeader({
    city,
    temp,
    humidity,
    windSpeed,
    icon,
    image,
    date,
  }){
    const dateMessage = (date) => {
        const dateTransform = new Date(date).getHours();
        if (dateTransform > 4 && dateTransform < 12) return 'Good Morning';
        else if (dateTransform >= 12 && dateTransform < 18) return 'Good Afternoon';
        else return 'Good Nigth';
      };
    return(
        <div
        id='widget-header'
        className='widget-header'>
        <img className='card-borde' style={{position:'absolute', zIndex:-1,width: '400px'}} src={image} alt='city'/>
        <i className={`wi wi-day-${icon} widget-icon`}></i>
        <p className='widget-headquarter'>{city}</p>
        <p>{Math.round(temp - 273.15)} °C</p>
        <Badge
            className='widget-humidity'
            title={`${humidity} %`}
            color={'pink'}/>
        <Badge
            className='widget-wind'
            title={`${windSpeed} m/s`}
            color={'blue'}/>
         <p>{dateMessage(date)}</p>
         <h2>Condor!</h2>
        </div>
    )
}