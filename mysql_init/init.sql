USE mysql_db;

create table USER(
    id int primary key auto_increment,
    username varchar(255) not null unique,
    `password` varchar(255) not null,
    `name` varchar(255) not null,
    email varchar(255) not null unique,
    gender enum('female', 'male', 'other') not null,
    telephone char(10) not null,
    `address` text not null,
    created_datetime datetime not null default now(),
    modified_datetime datetime not null default now() on update now(),
    `type` enum('customer', 'driver', 'operator', 'shipping', 'supervisor', 'transport') not null,
    manage_by int,
    foreign key (manage_by) references USER(id)
);
create table CUSTOMER_OPERATOR(
    id int primary key auto_increment,
    document varchar(255) not null,
    `status` enum('pending', 'completed', 'in progress', 'confirmed', 'unconfirmed', 'reject') not null,
    created_datetime datetime not null default now(),
    modified_datetime datetime not null default now() on update now(),
    customer_id int not null,
    operator_id int not null,
    foreign key (customer_id) references USER(id),
    foreign key (operator_id) references USER(id)
);
create table FEEDBACK(
    id int primary key auto_increment,
    comment text not null,
    created_datetime datetime not null default now(),
    customer_id int not null,
    foreign key (customer_id) references USER(id)
);
create table CONTACTS(
    id int primary key auto_increment,
    sender_id int not null,
    receiver_id int not null,
    `message` text not null,
    `status` enum('unreaded', 'readed') not null default 'unreaded',
    created_datetime datetime not null default now(),
    foreign key (sender_id) references USER(id),
    foreign key (receiver_id) references USER(id)
);
create table ORDERS(
    id int primary key auto_increment,
    company_name varchar(255) not null,
    receiver_address text not null,
    pickup_address text not null,
    invoice_id varchar(255) not null,
    container_id varchar(255) not null,
    created_datetime datetime not null default now(),
    modified_datetime datetime not null default now(),
    request_id int not null,
    operator_id int not null,
    foreign key (request_id) references CUSTOMER_OPERATOR(id),
    foreign key (operator_id) references USER(id)
);
create table GOODS(
    id int primary key auto_increment,
    `name` varchar(255) not null,
    `weight` float(10,2) not null,
    quantity int not null,
    created_datetime datetime not null default now(),
    modified_datetime datetime not null default now() on update now(),
    order_id int not null,
    foreign key (order_id) references ORDERS(id)
);
create table VEHICLE(
    plate_number varchar(20) primary key,
    `name` varchar(255) not null,
    `type` varchar(255) not null,
    brand varchar(255) not null,
    manage_by int not null,
    foreign key (manage_by) references USER(id)
);
create table LOCATIONS(
    id int primary key auto_increment,
    `location` text not null,
    created_datetime datetime not null default now(),
    driver_id int not null,
    order_id int not null,
    foreign key (driver_id) references USER(id),
    foreign key (order_id) references ORDERS(id)
);
create table SCHEDULE(
    id int primary key auto_increment,
    pickup_datetime datetime,
    arrived_datetime datetime,
    create_datetime datetime not null default now(),
    modified_datetime datetime not null default now() on update now(),
    driver_id int,
    transport_id int not null,
    order_id int not null,
    shipping_id int not null,
    vehicle_plate_number varchar(20),
    foreign key (driver_id) references USER(id),
    foreign key (transport_id) references USER(id),
    foreign key (order_id) references ORDERS(id),
    foreign key (shipping_id) references USER(id),
    foreign key (vehicle_plate_number) references VEHICLE(plate_number)
);
-- CREATE TABLE User(
--     account_id int(10) primary key auto_increment,
--     account_username varchar(255) not null unique,
--     account_password varchar(255) not null,
--     user_type enum('customer', 'staff') not null,
--     created_datetime datetime not null default now()
-- );

-- CREATE TABLE Staff(
--     staff_id int(10) auto_increment,
--     staff_name varchar(255) not null,
--     staff_email varchar(255) not null unique,
--     staff_tel char(10) not null,
--     staff_gender enum('female', 'male') not null,
--     staff_address varchar(255) not null,
--     staff_type enum('messenger', 'order_manager', 'supervisor') not null,
--     account_id int(10),
--     primary key (staff_id, account_id),
--     foreign key (account_id) references User(account_id)
-- );

-- CREATE TABLE Customer(
--     customer_id int(10) auto_increment,
--     customer_name varchar(255) not null,
--     customer_email varchar(255) not null unique,
--     customer_tel char(10) not null,
--     customer_address text,
--     account_id int(10),
--     primary key (customer_id, account_id),
--     foreign key (account_id) references User(account_id)
-- );

-- CREATE TABLE Supervisor(
--     staff_id int(10) primary key,
--     foreign key (staff_id) references Staff(staff_id)
-- );

-- CREATE TABLE Order_manager(
--     staff_id int(10) primary key,
--     supervisor_staff_id int(10) not null,
--     foreign key (staff_id) references Staff(staff_id),
--     foreign key (supervisor_staff_id) references Supervisor(staff_id)
-- );

-- CREATE TABLE Messenger(
--     staff_id int(10) primary key,
--     order_manager_staff_id int(10) not null,
--     foreign key (staff_id) references Staff(staff_id),
--     foreign key (order_manager_staff_id) references Order_manager(staff_id)
-- );

-- CREATE TABLE Vehicle(
--     vehicle_id int(10) primary key auto_increment,
--     staff_id int(10) not null,
--     plate_number varchar(255) not null unique,
--     vehicle_brand varchar(255) not null,
--     vehicle_type varchar(255) not null,
--     vehicle_name varchar(255) not null,
--     manufacture_date date not null,
--     foreign key (staff_id) references Messenger(staff_id)
-- );

-- CREATE TABLE Problem(
--     problem_id int(10) primary key auto_increment,
--     problem_datetime datetime not null,
--     problem_detail text not null,
--     problem_status enum('pending','solved') not null,
--     report_datetime datetime not null default now(),
--     staff_id int(10) not null,
--     foreign key (staff_id) references Messenger(staff_id)
-- );

-- CREATE TABLE Problem_alert(
--     alert_id int(10) primary key auto_increment,
--     `message` text not null,
--     problem_id int(10) not null,
--     foreign key (problem_id) references Problem(problem_id)
-- );

-- CREATE TABLE Orders(
--     order_id int(10) primary key auto_increment,
--     customer_id int(10) not null,
--     messenger_staff_id int(10) not null,
--     arrived_datetime datetime,
--     order_receiver varchar(255) not null,
--     send_datetime datetime,
--     order_cost float(10,3),
--     created_datetime datetime not null default now(),
--     foreign key (messenger_staff_id) references Messenger(staff_id),
--     foreign key (customer_id) references Customer(customer_id)
-- );

-- CREATE TABLE Goods(
--     goods_id int(10) primary key auto_increment,
--     goods_name varchar(255) not null,
--     goods_type varchar(255) not null,
--     goods_quantity int(10) not null,
--     goods_status enum('delivered','issued','pending', 'delivering'),
--     order_id int(10) not null,
--     foreign key (order_id) references Orders(order_id)
-- );

-- CREATE TABLE Contacts(
--     contacts_id int(10) primary key auto_increment,
--     sender_id int(10),
--     receiver_id int(10),
--     `message` text,
--     sent_datetime datetime not null default now(),
--     foreign key (sender_id) references User(account_id),
--     foreign key (receiver_id) references User(account_id)
-- );
