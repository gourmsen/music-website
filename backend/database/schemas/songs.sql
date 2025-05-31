CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    track_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT NOT NULL,
    difficulty INTEGER NOT NULL,
    video_url TEXT,
    isolated_url TEXT,
    backing_url TEXT,
    tab_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);