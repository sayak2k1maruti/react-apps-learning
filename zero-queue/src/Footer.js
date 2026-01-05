export default function Footer({ items }) {
  if (!items.length) {
    return (
      <footer className="footer">
        <p>Start Adding Some Items in your Queue...</p>
        <span>© 2026 Zero Queue</span>
      </footer>
    );
  }

  //Below two are derived state
  const total_items = items.length;
  const checked_items = items.reduce(
    (count, item) => count + (item.isChecked ? 1 : 0),
    0
  );

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
