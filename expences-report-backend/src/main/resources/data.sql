-- Creazione tabelle

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE SET NULL,  -- oppure ON DELETE CASCADE se preferisci
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inserimento dati di esempio

INSERT INTO users(username, email, password, role)
VALUES
('alice', 'alice@example.com', 'password1', 'USER'),
('bob', 'bob@example.com', 'password2', 'USER');

INSERT INTO categories(name, type, user_id)
VALUES
('Stipendio', 'INCOME', 1),
('Cibo', 'EXPENSE', 1),
('Trasporti', 'EXPENSE', 1),
('Gift', 'INCOME', 2),
('Shopping', 'EXPENSE', 2);

INSERT INTO transactions(user_id, category_id, amount, description, date)
VALUES
(1, 2, 50.00, 'Spesa al supermercato', '2025-09-05'),
(1, 3, 15.75, 'Bus e trasporti', '2025-09-06'),
(1, 1, 2000.00, 'Stipendio mensile', '2025-09-01'),
(2, 5, 120.50, 'Nuova maglietta', '2025-09-03'),
(2, 4, 100.00, 'Regalo ricevuto', '2025-09-02');