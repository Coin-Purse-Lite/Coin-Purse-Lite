import React from 'react'

export default function Searchbar(props) {

  const { setWatchlist, watchlist} = props

  function onSubmitSearch () {
    // fetch



    // setWatchlist([...watchlist], {ticker: data retrieved on success
  } 

  return (
    <div className="Searchbar">
      <input type="text" placeholder='Ticker...' /> <button className='addticker-button'>Add</button>
    </div>
  )
}
