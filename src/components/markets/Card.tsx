import { Link } from "react-router-dom";
import { Market } from "../../types";
import { formatNumber } from "../../utils";
import { useTheme } from "../../contexts/ThemeContext";

export const MarketCard = ({ market }: { market: Market }) => {

  const {OppositeTheme} = useTheme();

  return (
    <div className={`card marketCard border-${OppositeTheme}`}>
      <div className="card-body">
        <div className="cardHeader d-flex align-items-center justify-content-between mb-3">
          <div className="cardTitle">
            <h4 className="card-title">{market.currency1.title}</h4>
            <h6 className="card-subtitle text-muted">{market.title}</h6>
          </div>
          <div className="cardImageContainer position-relative">
            <img
              src={market.currency1.image}
              alt={market.currency1.title}
              className="cardImage currency1"
              width="40px"
              height="40px"
            />
            <img
              src={market.currency2.image}
              alt={market.currency2.title}
              className="cardImage currency2"
              width="20px"
              height="20px"
            />
          </div>
        </div>
        <p className="card-text">
          Price: {formatNumber(market.price)}
          <span className="text-muted">{" " + market.currency2.code}</span>
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <p className="card-text m-0">
            Volume 24h:{" "}
            <span
              className={`card-text ${
                market.price_info.change >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {market.price_info.change}%
            </span>
          </p>
          <Link to={`/market/${market.id}`} className="btn btn-primary align-self-end">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
