import React from "react";
import { Badge } from '../components/Badge/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'weather-icons/css/weather-icons.css';

export default function CardHeader({city,temp,humidity,windSpeed,icon,date}){
    
  const dateMessage = (date) => {
    const dateTransform = new Date(date).getHours();
    if (dateTransform > 4 && dateTransform < 12) return 'Good Morning';
    else if (dateTransform >= 12 && dateTransform < 18) return 'Good Afternoon';
    else return 'Good Nigth';
  }

  return(
    <div className='widget-content'> 
      <i className={`wi wi-day-${icon} widget-icon`} ></i>
      <div className='purple-background'>
        <FontAwesomeIcon icon={faMapMarkerAlt}/>
        <p className='widget-headquarter'>{city}</p>
      </div>
      <p className='temp widget-temperature' >{Math.round(temp - 273.15)} °C</p>
      <div className='badges-content'>
        <Badge
            className='widget-humidity'
            title={`${humidity} %`}
            color={'pink'}/>
        <Badge
            className='widget-wind'
            title={`${windSpeed} m/s`}
            color={'blue'}/>
      </div>
      <div className='date-msg'>
        <p>{dateMessage(date)}</p>
        <h1>Condor!</h1>
      </div>
    </div>
  )
}