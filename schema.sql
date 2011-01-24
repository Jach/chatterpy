drop table if exists admins;
create table admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name STRING NOT NULL,
  password CHAR(40) NOT NULL
);

drop table if exists active_users;
create table active_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name STRING NOT NULL,
  last_active TEXT NOT NULL
);

drop table if exists messages;
create table messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  color CHAR(6) NOT NULL DEFAULT '000000',
  speaker STRING NOT NULL,
  message TEXT NOT NULL,
  sent_at TEXT NOT NULL
);
