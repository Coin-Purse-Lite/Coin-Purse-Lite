import React from 'react'
import Searchbar from './Searchbar';
import SearchList from './SearchList';

export default function HeadModule(props) {

  const {handleSearch, coinData, dashList, watchlist, handleAdd} = props;

  return (
    <div className="HeadModule">
      <Searchbar onSearch={handleSearch}/>
      <SearchList coinData={coinData} dashList={dashList} watchlist={watchlist} handleAdd={handleAdd}/>
    </div>
  )
}
