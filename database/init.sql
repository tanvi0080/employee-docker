CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employees (name, email, department)
VALUES
('Tanvi Patel', 'tanvi@example.com', 'IT'),
('Amit Shah', 'amit@example.com', 'HR')
ON CONFLICT (email) DO NOTHING;