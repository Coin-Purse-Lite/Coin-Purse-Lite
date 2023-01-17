import React, {useEffect} from 'react'
import CoinRow from './CoinRow'

export default function CoinDisplay(props) {

  const {dashList, handleDelete, searchTerm, setSearchTerm, setCoinData} = props;


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const url = `https://api.coincap.io/v2/assets?search=${searchTerm}`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          setCoinData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [searchTerm]);


  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100
  }
  
  
  function roundToMillionOrBillion(number) {
    if (number >= 1000000000) {
      return `${(number / 1000000000).toFixed(2)}b`;
    } else if (number >= 1000000) {
      return `${(number / 1000000).toFixed(2)}m`;
    } else {
      return number;
    }
  }



  return (
    <div className="CoinDisplay">
      <table className='table'>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Marketcap</th>
          <th>Price</th>
          <th>Supply</th>
          <th>Volume (24h)</th>
          {/* <th>One Year</th> */}
          {/* <th>Today Change</th> */}
        </tr>
      </table>
      <tbody>
        {dashList.map((el, index) => (
            // return <CoinRow handleDelete = {(el) => handleDelete(el)} el={el}/>
          <tr key = {index}>
            <td>{el.symbol}</td>
            <td>{el.name}</td>
            <td>{roundToMillionOrBillion(roundToTwoDecimals(el.marketCapUsd))}</td>
            <td>${roundToTwoDecimals(el.priceUsd)}</td>
            <td>{roundToMillionOrBillion(roundToTwoDecimals(el.supply))}</td>
            <td>{roundToMillionOrBillion(roundToTwoDecimals(el.volumeUsd24Hr))}</td>
            <td colSpan='6' >
            <button className='delete_btn' onClick={() => props.handleDelete(el)}>-</button>
            </td>
          </tr>
          ))}
      </tbody>
          {/* <CoinRow handleDelete = {(el) => handleDelete(el)}/> */}
    </div>
  )
}
