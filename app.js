const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());

// フロントエンド（HTMLファイル）を配信するための設定
app.use(express.static(path.join(__dirname)));

// PostgreSQLの接続設定
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clothe_db',      // 👈 自分のデータベース名
  password: 'postgre',        // 👈 自分のパスワード
  port: 5432,
});

// テーブルの自動作成（新項目に対応）
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

// 1. 服の一覧取得 (GET /api/items)
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clothes_v2 ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

// 2. 新しい服の登録 (POST /api/items)
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});