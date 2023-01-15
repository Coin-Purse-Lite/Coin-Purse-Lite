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
    
      fetch('/dashboard/search', {
        method: 'POST',
        body: JSON.stringify({
          ticker: tickerName,
          
        }), // should send tickername, username
        headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())  // will receive list of all tickers as an array of objects
        .then((response) => {
          console.log(response)
          if(response.ok) {
            setWatchlist(watchlist.push(response.ticker)) // alternatively pass in callback
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
