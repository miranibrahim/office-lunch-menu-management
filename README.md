

# Lunch Time

This is a Lunch menu management online based system using PERN (PostgreSQL, Express.Js, React.Js, Node.Js) stack.It incorporate with two types of user route functionalities. It has a contexed based authentication integrated with firebase.

## User Role
There are two distinct user roles within the system:

1. **Admin:** The admin role manages the overall system, like: add, delete, update menus and manage orders. (Managing user is under development) 

2. **General Users:** General users have the ability to view current menu, order items, and access previous history.

### Features:
1. Account create using firebase and save the user data to database table, password secured with bcrypt js npm package.

2. Authenticated user is catched through context api.

3. Admin can add menu, view orders and update current and future menu.

4. user can view current menu and orders items. User can view previous order history.
5. Admin can select user as admin  (Under development)


## Getting started: 
#### Prerequisites
Before running the application, make sure you have the following installed:

Node.js
PostgreSQL

#### Installation
Clone the repository

`git clone https://github.com/miranibrahim/office-lunch-menu-management.git`

2. Go to the project directory and install dependencies for both the client and server
`cd client
npm install`



# Lunch Time

This is a Lunch menu management online based system using PERN (PostgreSQL, Express.Js, React.Js, Node.Js) stack.It incorporate with two types of user route functionalities. It has a contexed based authentication integrated with firebase.

## User Role
There are two distinct user roles within the system:

1. **Admin:** The admin role manages the overall system, like: add, delete, update menus and manage orders. (Managing user is under development) 

2. <General Users:> General users have the ability to view current menu, order items, and access previous history.

### Features:
1. Account create using firebase and save the user data to database table, password secured with bcrypt js npm package.

2. Authenticated user is catched through context api.

3. Admin can add menu, view orders and update current and future menu.

4. user can view current menu and orders items. User can view previous order history.
5. Admin can select user as admin  (Under development)


## Getting started: 
#### Prerequisites
Before running the application, make sure you have the following installed:

Node.js
PostgreSQL

#### Installation
1. Clone the repository

`git clone https://github.com/miranibrahim/office-lunch-menu-management.git`


2. Go to the project directory and install dependencies for both the client and server
`cd client`

`npm install`

3. 
`cd server`

`npm install`


`nodemon index.js`

4. `.env` variable for client: 
```
VITE_apiKey=AIzaSyCVtvpzR-DWYPy01zG3kTdHsbLFH0tIMnc
VITE_authDomain=office-lunch-menu-manage-1f6e0.firebaseapp.com
VITE_projectId=office-lunch-menu-manage-1f6e0
VITE_storageBucket=office-lunch-menu-manage-1f6e0.appspot.com
VITE_messagingSenderId=263616658627
VITE_appId=1:263616658627:web:f0d41cca1861a520173676
```

5. In server db.js use: 
```
const pool = new Pool({
  host: 'localhost',
  port: 5432, // check your postgresql running port
  databse: 'lunchdb',
  user: 'postgres', //check your username in postgresql
  passwor: your postgresql password,
})
```

6. create databse and tables first: 
```
<!-- Database  -->
CREATE DATABASE lunchDB;

<!-- ---------  Create User Table --------- -->

CREATE TABLE users (
    u_id VARCHAR(255) PRIMARY KEY,
    emp_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

<!-- -- -------create menus table------- -->

CREATE TABLE menus (
    date DATE PRIMARY KEY,
    menu TEXT[] NOT NULL
);

<!-- -- ---------- create order table ---------- -->

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    choice TEXT[] NOT NULL,
    date DATE NOT NULL
);
```

