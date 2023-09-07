module.exports = {
    "up": "CREATE TABLE dependents (user_id INT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, age INT, relationship TEXT NOT NULL)",
    "down": "DROP TABLE dependents"
}