import Card from './Card';

export default function List(props) {
  return (
    <div>
      <h2>📋 登録済みの服一覧</h2>
      {props.clothes.map((cloth) => (
        <Card key={cloth.id} brand={cloth.brand}>
          <strong>アイテム名:</strong> {cloth.name}<br />
          <strong>素材:</strong> {cloth.material}
        </Card>
      ))}
    </div>
  );
}