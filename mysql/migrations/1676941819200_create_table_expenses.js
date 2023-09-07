module.exports = {
    "up": "CREATE TABLE expenses (user_id INT NOT NULL, value DECIMAL(12,2) NOT NULL, multiplier DECIMAL(12,2) NOT NULL)",
    "down": "DROP TABLE expenses"
}