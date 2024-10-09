import { Link } from "react-router-dom";
import { Market } from "../../../types";
import { formatNumber } from "../../../utils";

export const MarketCard = ({ market }: { market: Market }) => {
  return (
    <div className="card marketCard">
      <div className="card-body">
        <div className="cardHeader d-flex align-items-center justify-content-between mb-3">
          <div className="cardTitle">
            <h4 className="card-title">{market.currency1.title_fa}</h4>
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
          قیمت: {formatNumber(market.price)}
          <span className="text-muted">
            {market.currency2.code === "IRT" ? " تومان" : " تتر"}
          </span>
        </p>
        <p className="card-text">
          تغییر ۲۴ ساعته:{" "}
          <span
            className={`card-text ${
              market.price_info.change >= 0 ? "text-success" : "text-danger"
            }`}
            dir="ltr"
          >
            {market.price_info.change}%
          </span>
        </p>
        <Link to={`/market/${market.id}`} className="btn btn-primary">
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  );
};
