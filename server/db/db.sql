CREATE DATABASE lunchDB;

CREATE TABLE users (
    u_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

INSERT INTO
    users (u_id, name, email, password, role)
VALUES
    (
        'unique_user_id_123',
        'John Doe',
        'john.doe@example.com',
        'hashed_password_here',
        'admin'
    );

SELECT * FROM users;

UPDATE users
SET role = 'admin'
WHERE email = 'miran@gmail.com';
