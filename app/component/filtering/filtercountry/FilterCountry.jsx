'use client'
import React, { useEffect, useState } from 'react'
import { UseFilterCountryStore } from '@/app/zustand/UseFilterCountryStore'
import { UseFilterCountry } from '@/app/zustand/UseFilterCountryIndex'
function FilterCountry({ styles , styles2 }) {
   const {country}=UseFilterCountry()
  const { countryValue, setCountryValue } = UseFilterCountryStore()
  const [items, SetItemms] = useState([])
  useEffect(() => {
    const arrItems = country?.map((country) => country.country.toString()) || []
    const uniqueArray = [...new Set(arrItems)]
    const updatedItems = [...uniqueArray, "تمام کشور ها"].reverse();
    SetItemms(updatedItems)

  }, [country])
  return (
    <div className={styles}>

      {items.length > 0 ? items.map((x, i) => (
        <div className="control-group min-w-full " key={i}>
          <label className={`control control-radio ${styles2}`}>
            <input type="radio" name={x} checked={countryValue === x} value={x} onChange={(e) => setCountryValue(e.target.value)} />
          {x} 
            <div className="control_indicator"></div>
          </label>

        </div>
      )) : null
      }

    </div>
  )
}

export default FilterCountry