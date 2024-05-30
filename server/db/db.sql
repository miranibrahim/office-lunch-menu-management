CREATE DATABASE lunchDB;

---------  User Table created---------
CREATE TABLE users (
    u_id VARCHAR(255) PRIMARY KEY,
    emp_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- -----------insert user-----------------
INSERT INTO users (u_id, emp_id, name, email, password, role)
VALUES
    (
        'unique_user_id_123',
        'e-101',
        'John Doe',
        'john.doe@example.com',
        'hashed_password_here',
        'admin'
    );

-- ---------GET all users---------------
SELECT * FROM users;


-- ---------Update user role-----------
UPDATE users
SET role = 'admin'
WHERE email = 'miran@gmail.com';


-- -------create menus table-------
CREATE TABLE menus (
    date DATE PRIMARY KEY,
    menu TEXT[] NOT NULL
);

-- ------insert menu--------------
INSERT INTO menus (date, menu) VALUES ('2024-05-28', ARRAY['Pasta', 'Salad', 'Soup']);

-- -------- GET all Menu-------------
SELECT * FROM menus;

-- ---------UPDATE Menu--------------
UPDATE menus
SET menu = ARRAY['Grilled Chicken', 'Caesar Salad', 'Tomato Soup']
WHERE date = '2024-05-28';

-- -------Delete Menu------------
DELETE FROM menus WHERE date= '2024-05-28';

-- --------Searched Menu---------------
SELECT date, menu
      FROM menu
      WHERE date BETWEEN $1 AND $2
      ORDER BY date;




-- ---------- create order table ----------
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    choice TEXT[] NOT NULL,
    date DATE NOT NULL
);