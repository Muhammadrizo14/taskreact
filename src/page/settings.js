import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import '../App.scss'


const Settings = () => {

  const [cards, setCards] = useState([])

  const getData = () => {
    axios
      .get('http://localhost:3000/products')
      .then(res => {
        setCards(res.data)
        window.localStorage.setItem('data', JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    const localData = window.localStorage.getItem('data');
    if (localData) {
      setCards(JSON.parse(localData));
    } else {
      getData();
    }
  }, []);


  useEffect(()=> {
    if (cards.length > 1) {
      window.localStorage.setItem('data', JSON.stringify(cards));
    }
  }, [cards])


  const [curCard, setCurCard] = useState(null)


  function dragStartHandler(e, card) {
    setCurCard(card)
  }

  function dragHandlerEnd(e) {
    e.target.style.background = 'white'
  }

  function dragHandlerOver(e) {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }

  function dropHandler(e, card) {
    e.preventDefault()
    setCards(
      cards.map(c => {
        if (c.id === card.id) {
          return {...c, order: curCard.order}
        }
        if (c.id === curCard.id) {
          return {...c, order: card.order}
        }
        return c
      })
    )

    e.target.style.background = 'white'
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div>
      <Link to={'/'}>back to home</Link>
      <h1>settings</h1>
      <div className='product__list'>
        {cards.sort(sortCards).map(card => (
          <div
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragLeave={(e) => dragHandlerEnd(e)}
            onDragEnd={(e) => dragHandlerEnd(e)}
            onDragOver={(e) => dragHandlerOver(e)}
            onDrop={(e) => dropHandler(e, card)}
            draggable={true}
            className='product'
            key={card.id}>
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;