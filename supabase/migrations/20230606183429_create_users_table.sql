create table
users (
id bigint primary key generated always as identity,
name text,
email text
);