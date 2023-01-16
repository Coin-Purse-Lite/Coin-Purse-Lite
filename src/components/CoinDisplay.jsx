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
        <div className="watchlist--list">
          {dashList.map((el, index) => {
            return <CoinRow handleDelete = {(el) => handleDelete(el)} el={el}/>
          })}
          </div>
          </tbody>
          {/* <CoinRow handleDelete = {(el) => handleDelete(el)}/> */}
    </div>
  )
}
