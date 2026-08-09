import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// フロントエンド（ビルド結果）の静的ファイルを配信する設定
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// PostgreSQLの接続設定（VPS用の正しい情報）
const pool = new Pool({
  user: 'student01',
  host: 'localhost',
  database: 'student01_db',
  password: '9EGL72fzjVX6',
  port: 5432,
});

// テーブルの自動作成
const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clothes_v2 (
      id SERIAL PRIMARY KEY,
      brand VARCHAR(100),
      name VARCHAR(100) NOT NULL,
      material VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
initDb().catch(console.error);

// APIエンドポイント
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clothes_v2 ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

app.post('/api/items', async (req, res) => {
  const { brand, name, material } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'アイテム名は必須入力です' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO clothes_v2 (brand, name, material) VALUES ($1, $2, $3) RETURNING *',
      [brand, name, material]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

// ポート番号の設定（環境変数からポートを取得）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});