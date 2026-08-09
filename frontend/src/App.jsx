import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';

export default function App() {
  const [clothes, setClothes] = useState([]);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [material, setMaterial] = useState('');

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setClothes(data));
  }, []);

  const handleAdd = async () => {
    if (!brand || !name || !material) {
      alert('すべての項目を入力してください');
      return;
    }

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, name, material }),
      });

      if (!res.ok) {
        throw new Error('登録に失敗しました');
      }

      const newCloth = await res.json();
      setClothes([...clothes, newCloth]);

      setBrand('');
      setName('');
      setMaterial('');
    } catch (error) {
      console.error(error);
      alert('エラーが発生しました');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '20px auto', padding: '0 10px', color: '#333' }}>
      <h1>服管理アプリケーション</h1>
      <hr style={{ border: '1px solid #222', margin: '20px 0' }} />
      
      <Form 
        brand={brand} 
        name={name} 
        material={material}
        setBrand={setBrand}
        setName={setName}
        setMaterial={setMaterial}
        onAdd={handleAdd}
      />
      
      <List clothes={clothes} />
    </div>
  );
}