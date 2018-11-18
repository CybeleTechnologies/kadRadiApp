import React from 'react';
import ObjectButton from './ObjectButton';
const elements = [
  {
    name: "Najbitnije",
  },
  {
    name: "Informacije",
  },
  {
    name: 'Galerija',
  },
];
const createButtons = (onSelect, current) => {
  let mapers = elements.map((item, index) => {
    return { element: () => (<ObjectButton current={current} onSelect={onSelect} index={index} itemName={item.name} />) }
  })
  return mapers;
}
export default createButtons;
