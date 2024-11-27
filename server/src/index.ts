import express, { Request, Response } from 'express';
import cors from 'cors';
import { Database } from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));
app.use(express.json());

const db = new Database('spins.db');

interface Spin {
  id: string;
  name: string;
  email: string;
  sucursal: string;
  award: string;
  createdAt?: string;
}

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS spins (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    sucursal TEXT NOT NULL,
    award TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add new spin
app.post('/api/spins', (req: Request, res: Response) => {
  const { name, email, sucursal, award } = req.body as Spin;
  const id = uuidv4();

  db.run(
    'INSERT INTO spins (id, name, email, sucursal, award) VALUES (?, ?, ?, ?, ?)',
    [id, name, email, sucursal, award],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id, name, email, sucursal, award });
    }
  );
});

// Get all spins
app.get('/api/spins', (_: Request, res: Response) => {
  db.all('SELECT * FROM spins ORDER BY createdAt DESC', (err, rows: Spin[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
}); 