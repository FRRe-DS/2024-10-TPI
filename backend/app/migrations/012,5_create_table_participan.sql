
CREATE TABLE IF NOT EXISTS Participan(
    id_edicion INT,
    id_autor INT,
    PRIMARY KEY (id_edicion, id_autor), 
    FOREIGN KEY (id_edicion) REFERENCES Eventos(edicion),
    FOREIGN KEY (id_autor) REFERENCES Autores(id) 
);

