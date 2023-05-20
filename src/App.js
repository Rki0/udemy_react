import React, { useState } from "react";
import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     date: new Date(2023, 4, 10),
//     title: "Toilet Paper",
//     amount: "294.67",
//   },
//   {
//     id: "e2",
//     date: new Date(2023, 4, 10),
//     title: "Car Insurance",
//     amount: "124.5",
//   },
//   {
//     id: "e3",
//     date: new Date(2023, 4, 10),
//     title: "Car Insurance",
//     amount: "272",
//   },
//   {
//     id: "e4",
//     date: new Date(2023, 4, 10),
//     title: "Car Insurance",
//     amount: "2.67",
//   },
//   {
//     id: "e5",
//     date: new Date(2023, 4, 10),
//     title: "Car Insurance",
//     amount: "450",
//   },
// ];

const DUMMY_EXPENSES = [
  {
    id: "e1",
    date: new Date(2023, 4, 10),
    title: "Toilet Paper",
    amount: 294.67,
  },
  {
    id: "e2",
    date: new Date(2023, 4, 10),
    title: "Car Insurance",
    amount: 124.5,
  },
  {
    id: "e3",
    date: new Date(2023, 4, 10),
    title: "Car Insurance",
    amount: 272,
  },
  {
    id: "e4",
    date: new Date(2023, 4, 10),
    title: "Car Insurance",
    amount: 2.67,
  },
  {
    id: "e5",
    date: new Date(2023, 4, 10),
    title: "Car Insurance",
    amount: 450,
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  // JSX 코드는 아래 코드와 같은 방식이며, 이를 편하게 사용할 수 있게 해주는데
  // 두 개 이상 return 할 수 없기 때문에 react는 항상 루트 컴포넌트가 필요한 것이다.
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Let's get started!"),
  //   React.createElement(Expenses, { expenses })
  // );

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />

      <Expenses items={expenses} />
    </div>
  );
};

export default App;
