export default function PackageItem({ item, onDeletePackageItem, onTogglePacked }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onTogglePacked(item.id)}
        checked={item.packed} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeletePackageItem(item.id)}>❌</button>
    </li>
  );
}
