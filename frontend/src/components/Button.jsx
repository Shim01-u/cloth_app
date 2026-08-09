export default function Button(props) {
  return (
    <button 
      onClick={props.onClick} 
      style={{ padding: '7px 20px', backgroundColor: '#222', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
    >
      {props.children}
    </button>
  );
}