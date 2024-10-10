import { useState } from "react";
import PackageItem from "./PackageItem";

export default function PackingList({ packageList, onDeletePackageItem, onTogglePacked, onDeleteAll }) {
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
            onTogglePacked={onTogglePacked} />
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
