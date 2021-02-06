/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert'
import { getValues } from '../utils/httpRequest';
import 'weather-icons/css/weather-icons.css';

export default function Visit () {
  
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getValues('f8926877-849a-416f-8226-9fd9d9fc5e07')
    .then(response=>{
        const suge = suggestDay(response.data.result)    
        setCities(suge)
        setLoading(false)
        })
    .catch(error=>
        swal("error", `${error.message}`, "error")
        )
  },[])

  const suggestDay = (days = []) => {
    const tempFilter = days.filter(
      (day) =>(
        Math.round(day.main.temp - 273.15)>=24 && 
        Math.round(day.main.temp - 273.15)<=30)
    );
    return tempFilter;
  };

  return (
    <section id='widget-cities' className='widget-cities'>
      <h2 className='title-section'>
        PLACE TO <span>VISIT</span>
      </h2>
      {!loading && (
        <div className='cities-list'>
          {cities
            .slice(0, 3)
            .map((city)=>(
              <div className='widget-card' key={city.id}>
                <div className='widget-card-image'>
                  <img className='cities-image' src={city.image} alt='city' />
                </div>
                <div className='widget-card-content'>
                  <p className='widget-city-name'>{city.name}</p>
                  <a
                    href='https://condorlabs.io/about'
                    target='_blank'
                    className='visit-button'
                  >
                    Visit place
                  </a>
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};