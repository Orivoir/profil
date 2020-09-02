import React from 'react';

import Item from './Item/Item.js';

import './ListItem.css';

const ListItem = ({
  items,
  className
}) => {
  return (
    <ul
      className={`list-item list-${className}`}
    >
      {items.map( (item,key) => (
        <Item
          key={item.id || key}
          item={item}
          className={className}
        />
      ))}
    </ul>
  );
};

export default ListItem;