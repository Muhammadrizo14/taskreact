import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([])

  const getAllCountries = () => {
    axios
      .get('http://localhost:3000/country')
      .then(res=> {
        setCountries(res.data)
      })
      .catch(err=> {
        console.log(err)
      })
  }


  useEffect(()=> {
    getAllCountries()
  }, [])

  return (
    <div>
      <Link to={'/'}>back to home</Link>
      <br/>
      <br/>

      {countries.map(country=> (
        <div key={country.id}>
          <Link to={`/country/${country.id}`}>Жители {country.city}а</Link>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default Countries;