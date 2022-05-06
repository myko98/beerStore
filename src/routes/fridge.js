import React from "react";
import { useState } from "react";

const FridgeRow = ({ fridge, row, handleChange, addToFridge }) => {
  return (
    <div>
      <h1>Row {row}</h1>
      {fridge.map((item) => {
        if (item.row == row) {
          return (
            <>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <input
                min="0"
                type="number"
                name={item.name}
                value={addToFridge[item.name] || 0}
                onChange={handleChange}
              ></input>
            </>
          );
        }
      })}
    </div>
  );
};



const Fridge = ({ fridge, add, addToFridge, setAddToFridge, resetFridge }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setAddToFridge({
      ...addToFridge,
      [e.target.name]: value,
    });
  };
  // console.log(addToFridge);
  return (
    <>
      <button onClick={resetFridge}>Reset Values</button>
      <form onSubmit={add}>
        <button type="submit">Update Values</button>
        <div className="flex">
          <FridgeRow
            fridge={fridge}
            row="1"
            handleChange={handleChange}
            addToFridge={addToFridge}
          />
          <FridgeRow
            fridge={fridge}
            row="2"
            handleChange={handleChange}
            addToFridge={addToFridge}
          />
          <FridgeRow
            fridge={fridge}
            row="3"
            handleChange={handleChange}
            addToFridge={addToFridge}
          />
          <FridgeRow
            fridge={fridge}
            row="4"
            handleChange={handleChange}
            addToFridge={addToFridge}
          />
        </div>
      </form>
    </>
  );
};
export default Fridge;
