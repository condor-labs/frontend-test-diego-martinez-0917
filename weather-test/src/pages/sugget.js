import React, { useEffect, useState } from 'react';
import swal from 'sweetalert'
import { getValues } from '../utils/httpRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '../components/Badge/badge';
import 'weather-icons/css/weather-icons.css';

export default function Suggets () {
  
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
               
    getValues('818d0158-727b-461e-9f76-06734ed7e582')
    .then(response=>{

        const filterTemp = (response.data.places.filter((day) => 
            Math.round(day.main.temp - 273.15)>=25 && 
            Math.round(day.main.temp - 273.15)<=28))
        let min = filterTemp[0]
        filterTemp.forEach(day => {
            
            if (day.main.humidity < min.main.humidity) {
                min = day;
              }
        })
        setCity(min)
        setLoading(false)
        })
    .catch(error=>
        swal("error", `${error.message}`, "error")
        )
},[])
  return (
    <section id='widget-suggest' className='widget-suggest'>
      <h2 className='mt-4 mb-3 title-section'>
        HeadQuater <span>Suggest</span>
      </h2>
      {!loading && (
        <div className='widget-card'>
        <i className={`wi wi-day-${city.weather[0].icon} widget-icon`} style={{ fontSize: '60px', color:'yellow' }}/>               
        <div className='widget-card-wrapper'>
            <div className='widget-card-image'>
                <img src={city.image} alt='city' />
            </div>
            <div className='content'>
                <div className={`purple-background widget-headquarter-content`}>
                    {city.icon && <FontAwesomeIcon icon={faMapMarkedAlt}/>}
                    <p className={`widget-headquarter-name `}>{city.name}</p>
                </div>                          
                <p className='widget-headquarter-desc'>{city.description}</p>
                <div className='badges'>
                    <Badge
                        className='widget-temperature'
                        title={`${Math.round(city.main.temp - 273.15)} °C`}
                        color={'yellow'}/>
                    <Badge
                        className='widget-humidity'
                        title={`${city.main.humidity} %`}
                        color={'pink'}/>
                    <Badge
                        className='widget-wind'
                        title={`${city.wind.speed} m/s`}
                        color={'blue'}/>
                </div>
            </div>
        </div>
  </div>
      )}
    </section>
  );
};