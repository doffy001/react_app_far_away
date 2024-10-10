export default function Stats({ packageList }) {
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
