// Problem statement:
// Given a component consisting of 3 checkboxes and a button.
// The task is to implement the functionality of the button,
// which will change according to the following conditions:

// - If one or more checkboxes are not selected (checked: false),
// then when the button is clicked, all unselected checkboxes become selected.
// - If all checkboxes are selected (checked: true),
// then when the button is clicked, all checkboxes become unselected.
import React, { useState, useEffect } from "react";

import { generatInitialCheckboxes } from "./utils/generatInitialCheckboxes";
import Checkbox from "./components/Checkbox";

interface Checkboxes {
  [key: string]: boolean;
}

const initialCheckboxes: Checkboxes = generatInitialCheckboxes(3);

export default function App() {
  const [checkboxes, setCheckboxes] = useState<Checkboxes>(initialCheckboxes);

  // #1 - properly calculate isAllSelected value
  //const isAllSelected = false;
  const [isAllSelected, setIsAllSelected] = useState(false);

  const changeValue = (key: string, value: boolean) => {
    setCheckboxes((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    refreshSelState();
  }, [checkboxes]);

  // #2 - implement button functionality described in the problem statement
  const handleButtonClick = () => {
    let newCheckboxes: Checkboxes = {};
    for (let cbKey in checkboxes) {
      newCheckboxes[cbKey] = !isAllSelected;
    }
    setCheckboxes(newCheckboxes);
    refreshSelState();
  };

  const refreshSelState = () => {
    let allSelected = true;
    for (let cb in checkboxes) {
      if (checkboxes[cb] == false) allSelected = false;
    }
    setIsAllSelected(allSelected);
  };

  return (
    <>
      <button onClick={handleButtonClick}>
        {isAllSelected ? "Unselect All" : "Select All"}
      </button>
      <p />
      {Object.entries(checkboxes).map(([key, value]) => (
        <Checkbox
          key={key}
          checked={value}
          name={key}
          onChange={(ev) => changeValue(key, ev.target.checked)}
        />
      ))}
    </>
  );
}
