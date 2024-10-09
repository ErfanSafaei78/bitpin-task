import { Market } from "../../../types";
import { useState } from "react";
import { MarketCard } from "./Card";
import { useTheme } from "../../../contexts/ThemeContext";

type MarketListProps = {
  markets: Market[];
};

export const MarketList = ({ markets }: MarketListProps) => {
  const limit = 10;

  const { theme } = useTheme();

  // states
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.ceil(markets.length / limit);
  const paginatedMarkets = markets.slice(limit * (page - 1), limit * page);

  return (
    <div className="row marketList">
      {paginatedMarkets.map((market) => (
        <div key={market.id} className="col-md-6 mb-3">
          <MarketCard market={market} />
        </div>
      ))}
      <div className="d-flex align-items-center justify-content-center mb-5">
        <button
          className={`btn btn-outline-${theme === 'light' ? 'dark' : 'light'} mx-2`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          {"<"}
        </button>
        Page {page} of {totalPages}
        <button
          className={`btn btn-outline-${theme === 'light' ? 'dark' : 'light'} mx-2`}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
