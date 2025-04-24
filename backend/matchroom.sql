CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    token VARCHAR(255),
    role VARCHAR(20) CHECK (role IN ('admin', 'user', 'hotelier')),
    statut BOOLEAN,
    device VARCHAR(10) CHECK (device IN ('phone', 'pc')),
    session_expires_at TIMESTAMP WITHOUT TIME ZONE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    two_factor_enabled BOOLEAN,
    two_factor_secret VARCHAR(255),
    status VARCHAR(50),
    session_token VARCHAR(255),
    adress VARCHAR(255),
    compAdress VARCHAR(255),
    postCode VARCHAR(20),
    city VARCHAR(100),
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    profilePic VARCHAR(255),
    -- special hotelier fields
    description TEXT,
    siret VARCHAR(50),
    tags TEXT[],
    rate NUMERIC(3, 2)
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    start DATE,
    end DATE,
    status VARCHAR(50),
    quantity INTEGER,
    photos TEXT[],
    price NUMERIC(10, 2)
);

CREATE TABLE reservation (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    rooms_id INTEGER REFERENCES rooms(id),
    bargainedPrice NUMERIC(10, 2),
    status VARCHAR(50),
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    decisionAt TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE swipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    rooms_id INTEGER REFERENCES rooms(id),
    action VARCHAR(50),
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    reservation_id INTEGER REFERENCES reservation(id),
    sender_id INTEGER REFERENCES users(id),
    content TEXT,
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
