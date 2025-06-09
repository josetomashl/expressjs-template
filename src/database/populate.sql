USE expressdb;

INSERT INTO user (id, email, password) VALUES
(UUID_TO_BIN(UUID()), 'user@example.com', '12345678'),
(UUID_TO_BIN(UUID()), 'admin@example.com', 'abcdefgh');