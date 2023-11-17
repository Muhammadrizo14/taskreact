import './App.scss';
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";


function App() {

  const data = eval(window.localStorage.getItem('data'))

  return (
    <div className="App">
      <Link to={'/settings'}>go to settings</Link>
      <h1>Home</h1>


      <div className="product__list">
        {data.map(res => (
          <div key={res.id} className='product'>
            <h1>{res.title}</h1>
            <p>Price: {res.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
