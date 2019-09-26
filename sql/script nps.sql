use 
master

create database nps
go

use 
nps

-- Tabelas
create table dbo.users (
	 id int IDENTITY(1,1) NOT NULL
	,login varchar(100) NOT NULL
	,password varchar(100) NOT NULL
	,is_admin bit default(0) NOT NULL
	,removed bit default(0) NOT NULL
	,constraint pk_id_users primary key (id)
)
go

create table dbo.avaliations(
	 id int IDENTITY(1,1) NOT NULL
	,code nvarchar(150) NOT NULL
	,month nvarchar(10) NOT NULL
	,year nvarchar(6) NOT NULL
	,area int NOT NULL	
	,finished bit NOT NULL default(0) 
	,detrators int default(0) 
	,neutrals int default(0) 
	,promoters int default(0) 
	,result decimal(5, 2) default(0.0) 
	,removed int default(0)
	,id_user int null 
	,constraint pk_id_avaliations primary key (id)
	,constraint fk_idx_avaliations_users foreign key (id_user) references dbo.users(id)
)
go

create table dbo.customers(
	 id int IDENTITY(1,1) NOT NULL
	,name nvarchar(150) NOT NULL
	,responsible nvarchar(150) NOT NULL
	,customer_since date NOT NULL
	,removed int NOT NULL default(0)
	,constraint pk_id_customers primary key (id)
)
go

create table dbo.questions(
	 id int IDENTITY(1,1) NOT NULL
	,question varchar(400) default('')
	,level int
	,level_required int
	,removed int NOT NULL default(0)
	,is_nps bit NULL
	,constraint pk_id_questions primary key(id)
)
go

create table dbo.avaliations_participants(
	 id int IDENTITY(1,1) NOT NULL
	,id_avaliation int NULL
	,id_customer int
	,id_questions int
	,score int NOT NULL default(0)
	,feedback varchar(250) NOT NULL default('')
	,is_valid bit default(1)
	,finished bit default(0)
	,area int NOT NULL default(0)
	,justificative varchar(400) default('')
	,feedback_category varchar(250) default('')
	,constraint pk_id_avaliations_participants primary key(id)
	,constraint fk_id_avaliations_avaliations_participants foreign key (id_avaliation) references dbo.avaliations(id)
	,constraint fk_id_customers_avaliations_participants foreign key (id_customer) references dbo.customers(id)
	,constraint fk_id_questions_avaliations_participants foreign key (id_questions) references dbo.questions(id)
)
go