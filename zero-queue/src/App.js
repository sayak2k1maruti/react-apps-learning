import { useState } from "react";

const checkList = [
  { id: 1, due_date: "2026-01-12", item: "Apples", isChecked: false },
  { id: 2, due_date: "2026-01-12", item: "Oranges", isChecked: true },
  { id: 3, due_date: "2025-01-12", item: "Oranges", isChecked: false },
  { id: 4, due_date: "2026-01-15", item: "Bananas", isChecked: false },
  { id: 5, due_date: "2026-01-17", item: "Mangoes", isChecked: false },
  { id: 6, due_date: "2026-01-18", item: "Pears", isChecked: false },
  { id: 7, due_date: "2025-01-19", item: "Grapes", isChecked: true },
  { id: 8, due_date: "2026-01-20", item: "Pineapples", isChecked: false },
  { id: 9, due_date: "2026-01-21", item: "Watermelon", isChecked: false },
  { id: 10, due_date: "2026-01-22", item: "Strawberries", isChecked: false },
];
export default function App() {
  return (
    <div className="app">
      <Header />
      <EntryForm />
      <CheckList />
      <Footer checked_items={3} total_items={10} />
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>🚀 Zero Ur Queue ✅</h1>
    </header>
  );
}

function EntryForm() {
  const [item, setItem] = useState("");
  const [date, setDate] = useState(new Date());
  function handleSubmit(e) {
    e.preventDefault();
    if (!item) return;
    const newItem = {
      id: Date.now(), //using current timestamp as unique ID
      due_date: date,
      item: item,
      isChecked: false,
    };
    console.log(newItem);
    setDefault();
  }

  function setDefault() {
    setItem("");
    setDate(new Date());
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <h2>What do you want to add?</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add Here..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function CheckItem({ name, isChecked, dueDate }) {
  const dueDateObj = new Date(dueDate);
  const today = new Date();
  const isOverdue = dueDateObj < today;
  const diffDays = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));

  const item_classes = [
    "check-item",
    !isChecked && isOverdue ? "overdue_check_list" : "",
    isChecked ? "completed_check_list" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const days_classes = [
    "days-remaining",
    isChecked ? "completed" : "",
    !isChecked && isOverdue ? "overdue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const day_text = isChecked
    ? "done & dusted "
    : isOverdue
    ? "days overdue"
    : "days left to finish";

  return (
    <div className={item_classes}>
      <input type="checkbox" checked={isChecked} />
      <p>{name}</p>
      <button>❌</button>
      <div className={days_classes}>
        {!isChecked && <span>{Math.abs(diffDays)} </span>}
        <span>{day_text}</span>
      </div>
    </div>
  );
}

function CheckList() {
  return (
    <div className="check-list">
      {checkList.map((item, _key) => (
        <CheckItem
          key={_key}
          name={item.item}
          isChecked={item.isChecked}
          dueDate={item.due_date}
        />
      ))}
    </div>
  );
}

function Footer({ checked_items, total_items }) {
  const completion_rate = ((checked_items / total_items) * 100).toFixed(2);
  return (
    <footer className="footer">
      <p>
        {" "}
        You have {total_items}, and you already finished {checked_items} items (
        {completion_rate}%){" "}
      </p>
      <span>© 2026 Zero Queue</span>
    </footer>
  );
}
