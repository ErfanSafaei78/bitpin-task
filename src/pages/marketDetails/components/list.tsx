import Decimal from "decimal.js";
import { Table } from "../../../components/Table";
import { ActiveOrder, Match } from "../../../types";
import { formatNumber, formatTime } from "../../../utils";
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface MarketDetailListProps {
  data: Match[] | ActiveOrder[];
  type: "match" | "buy" | "sell";
}

export function MarketDetailList({ data, type }: MarketDetailListProps) {
  const { theme } = useTheme();

  // states
  const [percentage, setPercentage] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState({
    totalVolume: 0,
    weightedPrice: 0,
    totalPayable: 0,
  });

  // handlers
  const getTotal = (column: keyof ActiveOrder) => {
    return Decimal.sum(
      ...(data as ActiveOrder[]).map((order) => new Decimal(order[column]))
    );
  };

  const calculateOutput = () => {
    const userPercentage = new Decimal(percentage);

    const totalRemain = getTotal("remain");
    const totalPriceInRemain = Decimal.sum(
      ...(data as ActiveOrder[]).map((order) =>
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
    <tfoot className={`table-${theme === "light" ? "dark" : "light"}`}>
      <tr>
        {columns.map((column, index) => (
          <td key={index} dir="ltr">
            {column === "price"
              ? formatNumber(
                  getTotal("price")
                    .dividedBy(new Decimal(data.length))
                    .toNumber()
                ) + ' (.avg)'
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
    <div className="p-4">
      {type === "match" ? (
        <Table
          columns={["time", "price", "match_amount"]}
          data={(data as Match[]).map((match) => ({
            ...match,
            time: formatTime(match.time),
          }))}
        />
      ) : (
        <>
          <Table
            columns={["remain", "price", "value"]}
            data={data as ActiveOrder[]}
            footer={tableFooter}
          />
          <div className="mt-4 card">
            <div className="card-body">
              <h3 className="card-title">Percentage Order</h3>
              <div className="input-group mb-3 w-50">
                <div className="input-group-append">
                  <button
                    className={`btn btn-outline-${
                      theme === "light" ? "dark" : "light"
                    }`}
                    type="button"
                    onClick={calculateOutput}
                  >
                    Calculate
                  </button>
                </div>
                <input
                  type="number"
                  className={`form-control border-${
                    theme === "light" ? "dark" : "light"
                  } mb-3 mx-3 rounded`}
                  min="0"
                  max="100"
                  value={percentage}
                  onChange={(e) => handleInputChange(parseInt(e.target.value))}
                />
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
