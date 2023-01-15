import React, {useState, useEffect} from 'react'

export default function Searchbar(props) {

  const { setWatchlist, watchlist }  = props

  //Obtaining the search bar ticker name 
  const [ tickerName, setTickerName ] = useState("")

  // change tickerName state to input value
  function onSearchChange (event) {
    setTickerName(event.target.value)
  }

  //This adds new ticker to the existing array of tickers 
  //? coin or ticker?
  function handleAdd (target) { // fix input, NOT TARGET!!!
    console.log('invoking handleAdd on search');
    console.log('tickerName is ', tickerName);

    // fetch
    
      fetch('/where we want to go', {
        method: 'POST',
        body: JSON.stringify(tickerName),
        headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if(response.ok) {
            setWatchlist(watchlist.push(response.ticker)) // fix input
          }
        })
      }
    

  return (
    <div className="Searchbar">
      {/* Capture inputed text and set as value of ticker */}
      <input type="text" placeholder='Ticker...' value={tickerName} onChange={onSearchChange}/> 
      {/* Upon click event, add new ticker to watchList */}
      <button onClick={handleAdd} className='addticker-button'>Add</button>
    </div>
  )
}

// 
