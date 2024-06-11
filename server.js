const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'your_username',
  password: 'your_password',
  host: 'localhost',
  database: 'your_database',
  port: 5432,
});


app.post('/register', async (req, res) => {
  const { firstName, lastName, address, telephone, birthday, sex, maritalStatus, dateRegistered,
          } = req.body;

  try {
    const client = await pool.connect();

    // Prepared statement to prevent SQL injection vulnerabilities
    const query = 'INSERT INTO patients (first_name, last_name, address, telephone, birthday, sex, maritalStatus, dateRegistered) VALUES ($1, $2, ...)';
    const values = [firstName, lastName, address, telephone, birthday, sex, maritalStatus, dateRegistered];

    await client.query(query, values);

    res.json({ message: 'Patient registration successful!' });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    pool.release(client); // Release the connection back to the pool
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
