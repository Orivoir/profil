import React from 'react';

const Item = ({
  item,
  className
}) => {
  return (
    <li
      className={`item ${className}-item`}
    >
      {item}
    </li>
  );
}

export default Item;
