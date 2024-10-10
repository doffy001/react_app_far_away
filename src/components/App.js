import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import Stats from './Stats';
import PackingList from './PackingList';

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
    const isConfirm = window.confirm('Are you sure that you want to delete all?');
    if (isConfirm) setPackageList([]);
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
