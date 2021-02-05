/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert'
import { getValues } from '../utils/httpRequest';
import CardHeader from '../components/cardHeader';

export default function header(){
    
    const [mainHeadquarter, setMainHeadquarter] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
               
        getValues('818d0158-727b-461e-9f76-06734ed7e582')
        .then(response=>{
            const [resul] = (response.data.places.filter((venue) => venue.main_headquarter === true))
            setMainHeadquarter(resul)
            setLoading(false)
            })
        .catch(error=>
            swal("error", `${error.message}`, "error")
            )
    },[])

    return(
        <header>
        {!loading  &&<CardHeader
            city={mainHeadquarter?.name}
            icon={mainHeadquarter?.weather[0].icon}
            image={mainHeadquarter?.image}
            humidity={mainHeadquarter?.main.humidity}
            temp={mainHeadquarter?.main.temp}
            windSpeed={mainHeadquarter?.wind.speed}
            date={mainHeadquarter?.date}
            />
        }
        </header>
    )
}