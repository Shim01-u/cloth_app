export default function Card(props) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '12px', 
      marginTop: '12px', 
      borderRadius: '6px', 
      background: '#fdfdfd', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
    }}>
      <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: 'bold' }}>{props.brand || '未設定'}</span>
      <div style={{ margin: '5px 0' }}>{props.children}</div>
    </div>
  );
}