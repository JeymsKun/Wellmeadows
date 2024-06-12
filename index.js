const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5500;

const pool = new Pool({
  user: 'postgres',
  password: 'gwapo123',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, address, telephone, birthday, sex, maritalStatus, dateRegistered } = req.body;

  try {
    const client = await pool.connect();

    const formattedBirthday = new Date(birthday).toISOString().slice(0, 10);

    const query = 'INSERT INTO patients (first_name, last_name, address, telephone, date_of_birth, sex, marital_status, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [firstName, lastName, address, telephone, formattedBirthday, sex, maritalStatus, dateRegistered];

    await client.query(query, values);

    res.json({ message: 'Patient registration successful!' });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    pool.release(client);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
