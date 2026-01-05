import { useState } from "react";
import CheckItem from "./CheckItem";
export default function CheckList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("created");

  function handleOnChange(e) {
    setSortBy(e.target.value);
  }

  let sortedItems;
  if (sortBy === "created") {
    sortedItems = items;
  } else if (sortBy === "due") {
    sortedItems = items
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortBy === "name") {
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "checked") {
    sortedItems = items.slice().sort((a, b) => a.isChecked - b.isChecked);
  }

  return (
    <div className="check-list-container">
      <div className="check-list">
        {sortedItems.map((item) => (
          <CheckItem
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </div>
      <div className="check-list-controller">
        <select value={sortBy} onChange={handleOnChange}>
          <option value="created">Sort By Creation</option>
          <option value="due">Sort By Due Date</option>
          <option value="name">Sort By Name</option>
          <option value="checked"> Sort By Checked Status</option>
        </select>
        <button onClick={onClearList}>Clear All</button>
      </div>
    </div>
  );
}
