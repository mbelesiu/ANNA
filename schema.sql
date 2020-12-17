DROP DATABASE IF EXISTS anna;

CREATE DATABASE anna;

\c anna;

-- //DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY NOT NULL ,
  email VARCHAR(240),
  EOD VARCHAR(10),
  prompts TEXT[]
);

CREATE TABLE IF NOT EXISTS records (
  record_id SERIAL PRIMARY KEY NOT NULL ,
  email VARCHAR(240),
  entry TEXT[],
  date VARCHAR(100)
);

CREATE TABLE user_records (
  user_id INTEGER REFERENCES users(user_id),
  record_id INTEGER REFERENCES records(record_id)
);

-- The below were used when I seeded the databse the first time. I kept them inc ase I have some bugs since the above is untested as of 10/15/2020
-- des_id INTEGER REFERENCES descriptions(des_id)
-- img_id INTEGER PRIMARY KEY,
-- des_id INTEGER PRIMARY KEY,