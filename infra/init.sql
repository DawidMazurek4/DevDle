CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year INT,
    typing VARCHAR(50),
    paradigm VARCHAR(100),
    main_usage VARCHAR(100),
    execution_type VARCHAR(50),
    language_level VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    language_id INT NOT NULL,
    is_finished BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

