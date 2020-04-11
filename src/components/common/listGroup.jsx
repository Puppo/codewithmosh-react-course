import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  if (items.length === 0) return null;

  return (
    <ul className="list-group">
      {items.map((item) => {
        let className = "list-group-item";
        if (item === selectedItem) {
          className += " active";
        }
        return (
          <li
            key={item[valueProperty]}
            className={className}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
