DROP DATABASE IF EXISTS anna;

CREATE DATABASE anna;

\c anna;

-- //DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS users (
  des_id INTEGER,
  email VARCHAR(240),
  prompts TEXT[]
);

CREATE TABLE IF NOT EXISTS records (
  img_id INTEGER,
  email VARCHAR(240),
  entry TEXT[],
  des_id INTEGER
);

-- The below were used when I seeded the databse the first time. I kept them inc ase I have some bugs since the above is untested as of 10/15/2020
-- des_id INTEGER REFERENCES descriptions(des_id)
-- img_id INTEGER PRIMARY KEY,
-- des_id INTEGER PRIMARY KEY,