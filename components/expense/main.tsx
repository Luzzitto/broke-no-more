import React from "react";
import Manage from "./manage";
import View from "./view";

const Expense = () => {
  return (
    <div className="flex gap-4">
      <Manage />
      <View />
    </div>
  );
};

export default Expense;
