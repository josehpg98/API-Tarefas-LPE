create table autor (
	codigo serial not null primary key,
	nome varchar(150) not null,
);
create table tarefa (
	codigo serial not null primary key,
	nome varchar(50) not null,
	descricao varchar(150) not null,
	codigo_autor serial not null,
	foreign key (codigo_autor) REFERENCES autor (codigo)
);

create table usuario (
	codigo serial not null primary key,
	email varchar(150) not null,
	senha varchar(150) not null
);

insert into tarefa(codigo, nome, descricao,codigo_autor) values (1, 'mercado','comprar feijao',1)
insert into autor(codigo, nome) values (1, 'jose da silva')
insert into usuario(codigo, email, senha) values (1, 'jose@test','12345678')