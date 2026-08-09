import Button from './Button';

export default function Form(props) {
  return (
    <div style={{ border: '1px dashed #ccc', padding: '15px', marginBottom: '20px' }}>
      <h2>👚 新しい服の登録</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>ブランド:</label>
        <input 
          type="text" 
          placeholder="例: Professor. E" 
          value={props.brand}
          onChange={(e) => props.setBrand(e.target.value)}
          style={{ padding: '5px', width: '200px' }} 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>アイテム名:</label>
        <input 
          type="text" 
          placeholder="例: ダメージデニム" 
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          style={{ padding: '5px', width: '200px' }} 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>素材:</label>
        <input 
          type="text" 
          placeholder="例: Cotton" 
          value={props.material}
          onChange={(e) => props.setMaterial(e.target.value)}
          style={{ padding: '5px', width: '200px' }} 
        />
      </div>
      
      <Button onClick={props.onAdd}>登録する</Button>
    </div>
  );
}