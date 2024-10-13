import Decimal from "decimal.js";
import { Table } from "../Table";
import { ActiveOrder, Match } from "../../types";
import { formatNumber, formatTime } from "../../utils";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface MarketDetailListProps {
  data: Match[] | ActiveOrder[];
  type: "match" | "buy" | "sell";
}

function isMatchList(
  type: "match" | "buy" | "sell",
  data: Match[] | ActiveOrder[]
): data is Match[] {
  return type === "match";
}

export function MarketDetailList({ data, type }: MarketDetailListProps) {
  const { OppositeTheme } = useTheme();

  // states
  const [percentage, setPercentage] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState({
    totalVolume: 0,
    weightedPrice: 0,
    totalPayable: 0,
  });

  // handlers
  const getTotal = (column: keyof ActiveOrder) => {
    if (!data.length || isMatchList(type, data)) {
      return new Decimal(0);
    }
    return Decimal.sum(...data.map((order) => new Decimal(order[column])));
  };

  const calculateOutput = () => {
    if (!data.length || isMatchList(type, data)) {
      return;
    }

    const userPercentage = new Decimal(percentage);

    const totalRemain = getTotal("remain");
    const totalPriceInRemain = Decimal.sum(
      ...data.map((order) =>
        new Decimal(order.price).times(new Decimal(order.remain))
      )
    );

    if (totalRemain.isZero() || percentage === 0) {
      setCalculatedValues({
        totalVolume: 0,
        weightedPrice: 0,
        totalPayable: 0,
      });
      return;
    }

    const weightedPrice = totalPriceInRemain.dividedBy(totalRemain).toNumber();
    const totalVolume = totalRemain
      .times(userPercentage)
      .dividedBy(100)
      .toNumber();
    const totalPayable = totalPriceInRemain
      .times(userPercentage)
      .dividedBy(100)
      .toNumber();

    setCalculatedValues({
      totalVolume,
      weightedPrice,
      totalPayable,
    });
  };

  const tableFooter = (columns: (keyof ActiveOrder)[], data: ActiveOrder[]) => (
    <tfoot className={`table-${OppositeTheme}`}>
      <tr>
        {data.length &&
          columns.map((column, index) => (
            <td key={index}>
              {column === "price"
                ? formatNumber(
                    getTotal("price")
                      .dividedBy(new Decimal(data.length))
                      .toNumber()
                  ) + " (.avg)"
                : formatNumber(getTotal(column).toNumber())}
            </td>
          ))}
      </tr>
    </tfoot>
  );

  const handleInputChange = (percentage: number) => {
    if (percentage > 100) {
      setPercentage(100);
    } else if (percentage <= 0) {
      setPercentage(0);
    } else {
      setPercentage(percentage);
    }
  };

  return (
    <div>
      {isMatchList(type, data) ? (
        <Table
          columns={["time", "price", "match_amount"]}
          data={data.map((match) => ({
            ...match,
            time: formatTime(match.time),
          }))}
        />
      ) : (
        <>
          <Table
            columns={["remain", "price", "value"]}
            data={data}
            footer={tableFooter}
          />
          <div className={`card border-${OppositeTheme} mt-4`}>
            <div className="card-body">
              <h3 className="card-title">Percentage Order</h3>
              <div className="col col-md-6">
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <button
                      className={`btn btn-outline-${OppositeTheme}`}
                      type="button"
                      onClick={calculateOutput}
                    >
                      Calculate
                    </button>
                  </div>
                  <input
                    type="number"
                    className={`form-control border-${OppositeTheme} mb-3 ms-3 rounded`}
                    min="0"
                    max="100"
                    value={percentage}
                    onChange={(e) =>
                      handleInputChange(parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center text-center">
                <div className="col-md-3">
                  <p className="fw-bold">Total Volume:</p>
                  <p className="fs-4 text-success">
                    {formatNumber(calculatedValues.totalVolume)}
                  </p>
                </div>
                <div className="col-md-3">
                  <p className="fw-bold">Weighted Price:</p>
                  <p className="fs-4 text-info">
                    {formatNumber(calculatedValues.weightedPrice)}
                  </p>
                </div>
                <div className="col-md-3">
                  <p className="fw-bold">Total Payable:</p>
                  <p className="fs-4 text-danger">
                    {formatNumber(calculatedValues.totalPayable)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
