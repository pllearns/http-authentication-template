DROP TABLE IF EXISTS users; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  encrypted_password VARCHAR(255)
);

