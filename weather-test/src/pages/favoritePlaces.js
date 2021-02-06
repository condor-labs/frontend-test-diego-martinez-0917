import React, { useState, useEffect  } from "react";
import swal from 'sweetalert'
import { getValues } from '../utils/httpRequest';
import { Badge } from '../components/Badge/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'weather-icons/css/weather-icons.css';

export default function FavoritePlaces() {

    const [loading, setLoading] = useState(true);
    const [venues , setVenues] = useState([])

    useEffect(()=>{
        getValues('818d0158-727b-461e-9f76-06734ed7e582')
        .then(response=>{
            setVenues(response.data.places.filter((place) => place.main_headquarter === false))
            setLoading(false)
        })
        .catch(error=>
            swal("error", `${error.message}`, "error")
        )
    },[])

    return(
        <section
         id='widget-favorite'
         className='widget-favorite'>
            <h2 className='title-section'> Our favorite <span>places</span></h2>
            <div className='favorite-list'>
             {!loading &&
                venues.map((seat) => (                    
                    <div className='widget-card' key={seat.id} >
                        <div className='container-card'>
                            <i className={`wi wi-day-${seat.weather[0].icon} widget-icon`}/>               
                            <div className='widget-card-wrapper'>
                            <div className='widget-card-image'>
                                <img src={seat.image} alt='city' />
                            </div>
                            <div className='content'>
                                <div className='headquarter-content'>
                                    <FontAwesomeIcon  className='headquarter-icon' icon={faMapMarkerAlt}/>
                                    <p className='widget-headquarter-name'>{seat.name} - {seat.sys.country}</p>
                                </div>                          
                                <p className='headquarter-desc'>{seat.description}</p>
                                <div className='badges'>
                                    <Badge
                                        className='widget-temperature'
                                        title={`${Math.round(seat.main.temp - 273.15)} °C`}
                                        color={'yellow'}/>
                                    <Badge
                                        className='widget-humidity'
                                        title={`${seat.main.humidity} %`}
                                        color={'pink'}/>
                                    <Badge
                                        className='widget-wind'
                                        title={`${seat.wind.speed} m/s`}
                                        color={'blue'}/>
                                </div>
                            </div>
                        </div>
                        </div>
                  </div>
                ))}
            </div>
        </section>
    )
}