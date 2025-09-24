USE expressdb;

INSERT INTO users (id, email, password, name, surname) VALUES
(UUID_TO_BIN(UUID()), 'user@example.com', '12345678', 'John', 'Doe'),
(UUID_TO_BIN(UUID()), 'admin@example.com', 'abcdefgh', 'Sarah', 'Evans');

INSER INTO tags (id, name) VALUES 
(UUID_TO_BIN(UUID()), 'Nature'),
(UUID_TO_BIN(UUID()), 'Cities'),
(UUID_TO_BIN(UUID()), 'Sci-Fi');

INSERT INTO posts (id, title, content, user_id, status) VALUES
(UUID_TO_BIN(UUID()), 'Post 1', 'Some content here', SELECT id FROM users WHERE name = 'John', 'DRAFT'),
(UUID_TO_BIN(UUID()), 'Post 2', 'Some other content here too', SELECT id FROM users WHERE name = 'Sarah', 'FINAL'),
(UUID_TO_BIN(UUID()), 'Post 3', 'Draft content pending...', SELECT id FROM users WHERE name = 'Sarah', 'DRAFT');

INSERT INTO posts_tags (post_id, tag_id) VALUES
(SELECT id FROM posts WHERE title = 'Post 1', SELECT id FROM tags WHERE name = 'Nature'),
(SELECT id FROM posts WHERE title = 'Post 1', SELECT id FROM tags WHERE name = 'Cities'),
(SELECT id FROM posts WHERE title = 'Post 2', SELECT id FROM tags WHERE name = 'Cities'),
(SELECT id FROM posts WHERE title = 'Post 3', SELECT id FROM tags WHERE name = 'Sci-Fi');