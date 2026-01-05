import { useState } from "react";
export default function EntryForm({ onAddItem }) {
  const [item, setItem] = useState("");
  const [date, setDate] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();
    if (!item) return;
    const newItem = {
      id: Date.now(), //using current timestamp as unique ID
      dueDate: date,
      name: item,
      isChecked: false,
    };
    onAddItem(newItem);
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
