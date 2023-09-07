module.exports = {
    "up": "CREATE TABLE goals (user_id INT NOT NULL, name TEXT NOT NULL, value DECIMAL(12,2) NOT NULL)",
    "down": "DROP TABLE goals"
}