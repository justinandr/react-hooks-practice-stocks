import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [portfolioStocks, setPortfolioStocks] = useState([])
  const [sortBy, setSortBy] = useState('Alphabetically')
  const [filterBy, setFilterBy] = useState('Tech')

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(res => res.json())
    .then(data => setStocks(data))
  }, [])

  function handleAddToPortfolio(newStock) {
    setPortfolioStocks([...portfolioStocks, newStock])
  }

  function handleSellStock(stockToSell) {
    const updatedPortfolio = portfolioStocks.filter(stock => stock.id !== stockToSell.id)
    setPortfolioStocks(updatedPortfolio)
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filteredStocks = sortedStocks.filter(
    (stock) => stock.type === filterBy
  );

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onAddStock={handleAddToPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioStocks={portfolioStocks} onSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
