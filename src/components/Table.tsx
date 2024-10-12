import { ReactElement } from "react";
import { formatNumber } from "../utils";
import { useTheme } from "../contexts/ThemeContext";

interface TableProps<T extends string> {
  columns: T[];
  data: Array<Record<T, any>>;
  footer?: (columns: T[], data: Array<Record<T, any>>) => ReactElement;
}

export function Table<T extends string>({
  columns,
  data,
  footer,
}: TableProps<T>) {

  const {theme} = useTheme();

  return (
    <table className="table table-striped table-hover text-center">
      <thead className={`table-${theme === 'light' ? 'dark' : 'light'}`}>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className={`table-${theme}`}>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>
                {isNaN(row[column]) ? row[column] : formatNumber(row[column])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer ? footer(columns, data) : ""}
    </table>
  );
}
