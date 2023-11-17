import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const Country = () => {
  const [country, setCountry] = useState({})
  const [lived, setLived] = useState([])
  const [burn, setBurn] = useState(1978)
  const [death, setDeath] = useState(2000)
  const {id} = useParams()


  const getAllCountries = () => {
    axios
      .get(`http://localhost:3000/country/${id}`)
      .then(res => {
        setCountry(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function findPeopleByPeriod() {
    const livingPeople = country.people.filter(person => {
      if (person.death) {
        return person.burn <= death && person.death >= burn;
      } else {
        return person.burn <= burn;
      }
    });
    setLived(livingPeople)
  }



  useEffect(() => {
    getAllCountries()
  }, [])
  return (
    <div>
      <Link to={'/'}>back to home</Link>
      <br/>
      <br/>
      <br/>


      <h1>{country.city}</h1>

      <div>
        <h1>Sort by period</h1>
        <input type="number" value={burn} placeholder='start year' onChange={(e)=> setBurn(e.target.value)}/>
        <input type="number" value={death} placeholder='end year' onChange={(e)=> setDeath(e.target.value)}/>
        <button onClick={()=> findPeopleByPeriod()}>get</button>
      </div>

      <br/>
      <br/>
      <br/>

      <div className='people'>
        {!lived.length && country.people?.map(person => (
          <div key={person.id} className='person'>
            <h1>{person.name}</h1>
            <p>{person.burn} {person.death ? `- ${person.death}` : '-'}</p>
          </div>
        ))}

        {lived?.map(person => (
          <div key={person.id} className='person'>
            <h1>{person.name}</h1>
            <p>{person.burn} {person.death ? `- ${person.death}` : '-'}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Country;