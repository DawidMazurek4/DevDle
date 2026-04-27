CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    year INT,
    typing VARCHAR(50),
    paradigm VARCHAR(100),
    main_usage VARCHAR(100),
    execution_type VARCHAR(50),
    language_level VARCHAR(50)
);