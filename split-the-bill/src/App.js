import { useState } from "react";
const friendList = [
  {
    id: 1,
    name: "John Doe",
    imgUrl: "https://i.pravatar.cc/48?u=1",
    balance: -3,
  },
  {
    id: 2,
    name: "Alice Doe",
    imgUrl: "https://i.pravatar.cc/48?u=2",
    balance: 5,
  },
  {
    id: 3,
    name: "Frank Doe",
    imgUrl: "https://i.pravatar.cc/48?u=3",
    balance: -10,
  },
];

export default function App() {
  const [contactList, setContactList] = useState(friendList);
  const [selectedContact, setSelectedContact] = useState(null);
  function handleAddFriend(name, image_url) {
    const id = Date.now();
    const newFriend = {
      id: id,
      name,
      imgUrl:
        image_url === "" ? `https://i.pravatar.cc/48?u={${id}}` : image_url,
      balance: 0,
    };
    setContactList((contactList) => [...contactList, newFriend]);
  }

  function handleSplitBill(iowetofriend, friend) {
    let newContactList = contactList.map((contact) => {
      if (contact.id === friend.id) {
        return { ...contact, balance: contact.balance - iowetofriend };
      } else {
        return contact;
      }
    });
    setSelectedContact(null);
    setContactList(newContactList);
  }

  return (
    <div className="app">
      <SideBar
        contactList={contactList}
        onAddFriend={handleAddFriend}
        onSelectContact={setSelectedContact}
        selectedContact={selectedContact}
      />
      {selectedContact && (
        <SpiltBillForm friend={selectedContact} onSubmit={handleSplitBill} />
      )}
    </div>
  );
}

function SideBar({
  contactList,
  onAddFriend,
  selectedContact,
  onSelectContact,
}) {
  const [formOpen, setFormOpen] = useState(false);

  function toggleForm() {
    setFormOpen((formOpen) => !formOpen);
  }

  return (
    <div className="sidebar">
      <ul className="contacts">
        {contactList.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            isSelected={contact.id === selectedContact?.id}
            onSelectContact={onSelectContact}
          />
        ))}
      </ul>
      {formOpen && (
        <AddFriendForm onAddFriend={onAddFriend} onClose={toggleForm} />
      )}
      <Button onClick={toggleForm}>{formOpen ? "Close" : "Add Friend"}</Button>
    </div>
  );
}

function SpiltBillForm({ friend, onSubmit }) {
  const [whoIsPaying, setWhoIsPaying] = useState("You");
  const [billValue, setBillValue] = useState("");
  const [myExpense, setmyExpense] = useState("");

  function handleMyExpenseOnChange(n) {
    let num_n = Number(n);
    if (num_n <= billValue) setmyExpense(num_n);
  }

  function handleFormSumbit() {
    let iowetofriend =
      whoIsPaying === "You" ? Number(myExpense - billValue) : Number(myExpense);
    onSubmit(iowetofriend, friend);
  }
  return (
    <Form onSubmitForm={handleFormSumbit} className="split-bill-form">
      <h2> Split bill with {friend.name}</h2>
      <NumberInput
        label={"Bill value"}
        onChange={setBillValue}
        value={billValue}
      />
      <NumberInput
        label={"Your expense"}
        onChange={handleMyExpenseOnChange}
        maxValue={billValue}
        value={myExpense}
      />
      <TextInput
        label={"Your friend's expense"}
        disabled={true}
        value={billValue - myExpense}
      />
      <DropDownInput
        label={"Who is paying the bill"}
        options={["You", friend.name]}
        onChange={setWhoIsPaying}
      />
      <Button onClick={handleFormSumbit}>Split Bill</Button>
    </Form>
  );
}

function AddFriendForm({ onAddFriend, onClose }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  function handleSubmitForm(e) {
    if (name !== "") onAddFriend(name, image);
    onClose();
  }
  return (
    <Form onSubmitForm={handleSubmitForm}>
      <TextInput label={"Friend name"} onChange={setName} value={name} />
      <TextInput label={"Image Url"} onChange={setImage} value={image} />
      <Button onClick={handleSubmitForm}>Add</Button>
    </Form>
  );
}

function Form({ onSubmitForm, children }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmitForm();
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      {children}
    </form>
  );
}
function TextInput({ label, value, onChange, placeholder, disabled }) {
  return (
    <div className="text-input">
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled || false}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  maxValue,
}) {
  return (
    <div className="text-input">
      {label && <label>{label}</label>}
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        disabled={disabled || false}
        max={`${maxValue}`}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function DropDownInput({ label, options, value, onChange }) {
  return (
    <div className="text-input">
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} className="text" value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
function ContactCard({ contact, onSelectContact, isSelected }) {
  return (
    <li className={`contact ${isSelected ? "selected" : ""}`}>
      <img src={contact.imgUrl} alt="avatar" />
      <h3>{contact.name}</h3>

      {contact.balance < 0 ? (
        <p className="red">
          You owe {contact.name} ${Math.abs(contact.balance)}
        </p>
      ) : (
        <p className="green">
          {contact.name} owes you ${Math.abs(contact.balance)}
        </p>
      )}
      <Button onClick={() => onSelectContact(contact)}>Select</Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
