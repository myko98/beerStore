import React from "react";
import { useState } from "react";

const FridgeRow = ({ fridge, row, handleChange, fridgeItem }) => {
  return (
    <div>
      <h1>Row {row}</h1>
      {fridge.map((item) => {
        if (item.row == row) {
          return (
            <>
              <p>{item.name}</p>
              <input
                min="1"
                type="number"
                name={item.name}
                value={fridgeItem[item.name]}
                onChange={handleChange}
              ></input>
              <p>{item.row}</p>
            </>
          );
        }
      })}
    </div>
  );
};
const Fridge = ({ fridge }) => {
  const [fridgeItem, setFridgeItem] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setFridgeItem({
      ...fridgeItem,
      [e.target.name]: value,
    });
  };
  console.log(fridgeItem);

  return (
    <>
      <button>Update Values</button>
      <div className="flex">
        <FridgeRow
          fridge={fridge}
          row="1"
          handleChange={handleChange}
          fridgeItem={fridgeItem}
        />
        <FridgeRow
          fridge={fridge}
          row="2"
          handleChange={handleChange}
          fridgeItem={fridgeItem}
        />
        <FridgeRow
          fridge={fridge}
          row="3"
          handleChange={handleChange}
          fridgeItem={fridgeItem}
        />
        <FridgeRow
          fridge={fridge}
          row="4"
          handleChange={handleChange}
          fridgeItem={fridgeItem}
        />
      </div>
    </>
  );
};
export default Fridge;
