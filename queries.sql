CREATE DATABASE libros_autores;

CREATE TABLE libros (
	id SERIAL PRIMARY KEY,
	titulo VARCHAR(255) NOT NULL,
	descripcion TEXT,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(45),
    apellido VARCHAR (45),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE libros_autores (
    id SERIAL PRIMARY KEY,
    id_libro INT NOT NULL,
    id_autor INT NOT NULL,
    CONSTRAINT fk_libro FOREIGN KEY (id_libro) REFERENCES libros (id),
    CONSTRAINT fk_autor FOREIGN KEY (id_autor) REFERENCES autores (id)
);
