import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
];

export default function App() {
  const [packageList, setPackageList] = useState(initialItems);

  function handleAddPackageItem(newItem) {
    setPackageList((currentPackageList) => [...currentPackageList, newItem]);
  }

  function handleDeletePackageItem(id) {
    setPackageList((items) => items.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setPackageList((items) =>
      items.map((item) => {
        return item.id === id
          ? {
              ...item,
              packed: !item.packed,
            }
          : item;
      })
    );
  }

  function handleDeleteAll() {
    setPackageList((_items) => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddPackageItem={handleAddPackageItem} />
      <PackingList
        packageList={packageList}
        onDeletePackageItem={handleDeletePackageItem}
        onTogglePacked={handleTogglePacked}
        onDeleteAll={handleDeleteAll}
      />
      <Stats packageList={packageList} />
    </div>
  );
}

function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form({ onAddPackageItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    onAddPackageItem({
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    });

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span>What do you need for your trip?</span>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array(30)
          .fill()
          .map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ packageList, onDeletePackageItem, onTogglePacked, onDeleteAll }) {
  const status = {
    input: 'input',
    description: 'description',
    packed: 'packed'
  };
  const [sortStatus, setSortStatus] = useState(status.input);
  let sortedItems;

  if (sortStatus === status.input) {
    sortedItems = packageList;
  } else if (sortStatus === status.description) {
    sortedItems = packageList.slice().sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortedItems = packageList.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((packageItem) => (
          <PackageItem
            key={packageItem.id}
            item={packageItem}
            onDeletePackageItem={onDeletePackageItem}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortStatus}
          onChange={(e) => setSortStatus(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteAll}>Clear list</button>
      </div>
    </div>
  );
}

function PackageItem({ item, onDeletePackageItem, onTogglePacked }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onTogglePacked(item.id)}
        checked={item.packed}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeletePackageItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ packageList }) {
  if (!packageList.length) {
    return (
      <footer className="stats">
        <em>Start adding some items into your package list.</em>
      </footer>
    );
  }

  const total = packageList.length;
  const counterPackedItem = packageList.filter((item) => item.packed).length;
  const percentage = Math.floor((counterPackedItem / total) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You got everything. Ready to go.</em>
      ) : (
        <em>
          You have {total} items on your list, and you already packed{' '}
          {counterPackedItem} ({percentage}%)
        </em>
      )}
    </footer>
  );
}
