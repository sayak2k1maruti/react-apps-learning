import { useState } from "react";
import Header from "./Header";
import EntryForm from "./EntryForm";
import CheckList from "./CheckList";
import Footer from "./Footer";

export default function App() {
  const [items, setItems] = useState([]);

  // //Below two are derived state
  // const totalItemsCount = items.length;
  // const checkItemCount = items.reduce(
  //   (count, item) => (count + item.isChecked ? 1 : 0),
  //   0
  // );

  function handleAddItem(item) {
    /** Add the new item to the list */
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    /** Remove the item from the list */
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    /** Remove all items from the list */
    setItems([]);
  }

  function handleItemToggled(id) {
    /** Modify item to checked */
    setItems((items) =>
      items.map(
        (item) =>
          item.id === id ? { ...item, isChecked: !item.isChecked } : item //always remember don't mutate any objevy in react
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <EntryForm onAddItem={handleAddItem} />
      <CheckList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleItemToggled}
        onClearList={handleClearList}
      />
      <Footer items={items} />
    </div>
  );
}
