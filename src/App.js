import "./App.css";
import ExpenseItem from "./components/ExpenseItem";

function App() {
  const expenses = [
    {
      id: "e1",
      date: new Date(2023, 4, 10),
      title: "Toilet Paper",
      amount: "294.67",
    },
    {
      id: "e2",
      date: new Date(2023, 4, 10),
      title: "Car Insurance",
      amount: "124.5",
    },
    {
      id: "e3",
      date: new Date(2023, 4, 10),
      title: "Car Insurance",
      amount: "272",
    },
    {
      id: "e4",
      date: new Date(2023, 4, 10),
      title: "Car Insurance",
      amount: "2.67",
    },
    {
      id: "e5",
      date: new Date(2023, 4, 10),
      title: "Car Insurance",
      amount: "450",
    },
  ];

  return (
    <div className="App">
      {expenses.map((item) => (
        <ExpenseItem
          key={item.id}
          date={item.date}
          title={item.title}
          amount={item.amount}
        />
      ))}
    </div>
  );
}

export default App;
