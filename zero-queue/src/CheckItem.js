export default function CheckItem({ item, onDeleteItem, onToggleItem }) {
  const dueDateObj = new Date(item.dueDate);
  const today = new Date();
  const diffDays = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));
  const isOverdue = diffDays < 0;

  const item_classes = [
    "check-item",
    !item.isChecked && isOverdue ? "overdue_check_list" : "",
    item.isChecked ? "completed_check_list" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const days_classes = [
    "days-remaining",
    item.isChecked ? "completed" : "",
    !item.isChecked && isOverdue ? "overdue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const day_text = item.isChecked
    ? "done & dusted "
    : isOverdue
    ? "days overdue"
    : "days left to finish";

  return (
    <div className={item_classes}>
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={() => onToggleItem(item.id)}
      />
      <p>{item.name}</p>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      <div className={days_classes}>
        {!item.isChecked && <span>{Math.abs(diffDays)} </span>}
        <span>{day_text}</span>
      </div>
    </div>
  );
}
