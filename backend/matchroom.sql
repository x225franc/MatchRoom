-- MySQL Schema for MatchRoom

-- Création de la base de données (décommentez si nécessaire)
-- CREATE DATABASE IF NOT EXISTS matchroom;
-- USE matchroom;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    role VARCHAR(50),
    status VARCHAR(50),
    device VARCHAR(50),
    session_expires_at DATETIME,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    session_token VARCHAR(255),
    adress VARCHAR(255),
    compAdress VARCHAR(255),
    postCode VARCHAR(20),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    profilePic VARCHAR(255),
    description TEXT,
    siret VARCHAR(50),
    tags TEXT,
    rate DECIMAL(3, 2)
);

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    quantity INT,
    photos TEXT,
    price DECIMAL(10, 2),
    capacity INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    rooms_id INT,
    bargainedPrice DECIMAL(10, 2),
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    decisionAt DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rooms_id) REFERENCES rooms(id)
);

CREATE TABLE swipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    rooms_id INT,
    action VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rooms_id) REFERENCES rooms(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    reservation_id INT,
    sender_id INT,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reservation_id) REFERENCES reservation(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);
