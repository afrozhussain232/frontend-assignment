import style from "./style.module.scss";
import { TableData } from "../../types/dataTable";

type DataTableProps = {
  data: TableData;
  loading: boolean;
};

const DataTable = ({ data, loading }: DataTableProps) => {
  const columns = data.columns;
  const rows = data.rows;

  const getRowSkeleton = () => {
    const skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push([1, 3, 4, 5, 6]);
    }
    return skeletons;
  };

  if (loading)
    return (
      <table className={style.skeletonTable}>
        <thead className={style.columns}>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getRowSkeleton().map((row, index) => (
            <tr key={index}>
              {row.map((index) => (
                <td className="skeleton-loader" key={index}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );

  const getColumnsStyle = () => {
    return {
      gridTemplateColumns: `repeat(${columns.length},1fr)`,
    };
  };

  return (
    <table className={style.table}>
      <thead className={style.columns}>
        <tr style={getColumnsStyle()}>
          {columns.map((column, index) => (
            <th key={index}>
              <span className={style.full}>{column.label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={columns.length} className={style.noData}>
              No data available
            </td>
          </tr>
        )}
        {rows.map((row, index) => (
          <tr style={getColumnsStyle()} key={index}>
            {columns.map((column, index) => (
              <td key={index}>{row[column.id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DataTable;
