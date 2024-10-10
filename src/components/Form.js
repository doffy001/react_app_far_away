import { useState } from "react";

export default function Form({ onAddPackageItem }) {
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
        onChange={(e) => setDescription(e.target.value)} />
      <button>ADD</button>
    </form>
  );
}
