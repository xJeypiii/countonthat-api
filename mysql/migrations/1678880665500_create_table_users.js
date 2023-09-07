module.exports = {
    "up": "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(45) NOT NULL UNIQUE, password TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, age INT, contact text, currency TEXT, resetPasswordToken TEXT, resetPasswordExpires BIGINT)",
    "down": "DROP TABLE users"
}