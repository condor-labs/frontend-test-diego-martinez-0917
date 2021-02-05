/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert'
import { getValues } from '../utils/httpRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Slider(){
    
    const [sliderData, setSlideData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slider, setSlider] = useState({ current: 0, next: 3 });
    
    useEffect(()=>{               
        getValues('73c29128-d158-40db-aeae-ea78a0d762b7')
        .then(response=>{
            setSlideData(response.data.list)
            setLoading(false)
            })
        .catch(error=>
            swal("error", `${error.message}`, "error")
            )
    },[])

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

    const CarouselItem = ({ date, temp, humidity, windSpeed }) => {
        return (
          <div className='widget-carousel-item'>
            <p className='widget-day'>{getDay(date)}</p>
            <p>{Math.round(temp - 273.15)} °C</p>
            <div className='badges'>
              <samp>{humidity} %</samp>
              <samp>{windSpeed} m/s</samp>
            </div>
          </div>
        );
    };

    const change = (text)=>{
        switch (text) {
            case 'left':
                setSlider({
                    current:0,
                    next:3
                })
                break;
            case 'right':
                setSlider({
                    current:3,
                    next:6
                })
                break;
        
            default:
                break;
        }
    }

    return(
        <section
         id='widget-carousel'
         className='widget-carousel'>
            <div className='widget-carousel-header'>
                <h3 className='widget-carousel-header-title'>Forecast Extended</h3>
                <div className='wrapper-button'>
                    <button className='arrow-button' onClick={()=>change('left')} disabled={slider.current===0}>
                        <FontAwesomeIcon icon={faArrowLeft} color="blue"/>
                    </button>
                    <button className='arrow-button' onClick={()=>change('right')} disabled={slider.current===3}>
                        <FontAwesomeIcon icon={faArrowRight} color="blue"/>
                    </button>
                </div>
            </div>
            <div className='list-items'>
                {!loading &&
                sliderData
                    .slice(slider.current, slider.next)
                    .map((item, index) => (
                        <CarouselItem
                            key={index}
                            date={item.date}
                            temp={item.main.temp}
                            humidity={item.main.humidity}
                            windSpeed={item.wind.speed}/>
                    ))}
            </div>
        </section>
    )
}