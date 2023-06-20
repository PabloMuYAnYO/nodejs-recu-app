DROP DATABASE IF EXISTS db_aulas;
CREATE DATABASE db_aulas CHARSET utf8mb4;

USE db_aulas;

-- Tabla usuarios
CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

-- Tabla aulas
CREATE TABLE aulas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(155) NOT NULL,
    url VARCHAR(255) NOT NULL,
	description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO aulas(title,url,description) VALUES("Aula 1","https://c1.wallpaperflare.com/preview/940/856/834/various-education-school-study.jpg","Aula de ejemplo")