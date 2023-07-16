import React from 'react'
import {addDays, format} from 'date-fns';

export default function DateCell({index, selectedPlaces, unavailablePlaces,handlePlaceClick}) {

  return (

    <td 
    key={index}
    onClick={() => handlePlaceClick(index + 1)}
    style={{
      backgroundColor: selectedPlaces.has(index + 1) ? '#48BB78' : unavailablePlaces.has(index + 1) ? 'red' : '#af9a7d',
      cursor: unavailablePlaces.has(index + 1) ? 'not-allowed' : 'pointer',
    }}
    className = "border p-1 hover:scale-110  rounded-lg"
    >{format(addDays(new Date(), index + 1), 'MMM d')}</td>

  )
}
