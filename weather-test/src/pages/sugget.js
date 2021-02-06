/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert'
import { getValues } from '../utils/httpRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '../components/Badge/badge';
import 'weather-icons/css/weather-icons.css';

export default function Suggets () {
  
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getValues('818d0158-727b-461e-9f76-06734ed7e582')
    .then(response=>{
      const min = suggestDay(response.data.places)
      setCity(min)
      setLoading(false)
    })
    .catch(error=>
      swal("error", `${error.message}`, "error")
    )
  },[])

  const suggestDay = (days = []) => {
    const tempFilter = days.filter(
      (day) =>(
      day.main.temp>298.15 && 
      day.main.temp<301.15)
    );
    return Humidity(tempFilter);
  };

  const Humidity = (humiditys = []) => {
    let less = humiditys[0];
    humiditys.forEach((item) => {
      if (item.main.humidity < less.main.humidity) less = item
    });
    return less;
  };

  const getDay = (date) => {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  return (
    <section id='widget-suggest' className='widget-suggest'>
      <h2 className='title-section'>
        HeadQuater <span>Suggest</span>
      </h2>
      {!loading && (
        <div className='widget-card'>
        <i className={`wi wi-day-${city.weather[0].icon} widget-icon`}/>               
          <div className={`widget-headquarter-content`}>
            <FontAwesomeIcon icon={faMapMarkerAlt}/>
            <p className={`widget-headquarter`}>{city.name} - {city.sys.country}</p>
          </div>                          
          <p className='temp-title widget-temperature'>{`${Math.round(city.main.temp - 273.15)} °C`}</p>
          <div className="footer-card">
            <div className="badges">
              <Badge
                className='widget-humidity'
                title={`${city.main.humidity} %`}
                color={'pink'}/>
              <Badge
                className='widget-wind'
                title={`${city.wind.speed} m/s`}
                color={'blue'}/>
            </div>
            <p className="widget-day">{getDay(city.date)}</p>
          </div>
        </div>        
      )}
    </section>
  );
};