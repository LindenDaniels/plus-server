create table recipes (
	id INTEGER primary key generated by default as identity,
	name text not null,
	modified TIMESTAMP not null default now(),
	folderId INTEGER not null,
	ingredients text not null,
    instructions text not null
	);