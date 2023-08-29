import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolioStocks, onSellStock }) {


  
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioStocks.map(stock => <Stock key={stock.id} stock={stock} onStockClick={onSellStock} />)}
    </div>
  );
}

export default PortfolioContainer;
