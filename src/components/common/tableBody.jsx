import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns, valueProperty }) => {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  const createRowKey = (item) => item[valueProperty];

  const createCellKey = (item, column) =>
    createRowKey(item) + (column.path || column.key);

  return (
    <tbody>
      {data.map((item) => (
        <tr key={createRowKey(item)}>
          {columns.map((column) => (
            <td key={createCellKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  valueProperty: "_id",
};

export default TableBody;
