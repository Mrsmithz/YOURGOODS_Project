USE my_db;

CREATE TABLE User(
    account_id int(10) primary key auto_increment,
    account_username varchar(255) not null unique,
    account_password varchar(255) not null,
    created_datetime datetime not null default now()
);

CREATE TABLE Staff(
    staff_id int(10) auto_increment,
    staff_name varchar(255) not null,
    staff_email varchar(255) not null unique,
    staff_tel char(10) not null,
    staff_gender enum('female', 'male') not null,
    staff_address varchar(255) not null,
    account_id int(10),
    primary key (staff_id, account_id),
    foreign key (account_id) references User(account_id)
);

CREATE TABLE Customer(
    customer_id int(10) auto_increment,
    customer_name varchar(255) not null,
    customer_email varchar(255) not null unique,
    customer_tel char(10) not null,
    customer_address text,
    account_id int(10),
    primary key (customer_id, account_id),
    foreign key (account_id) references User(account_id)
);

CREATE TABLE Supervisor(
    staff_id int(10) primary key,
    foreign key (staff_id) references Staff(staff_id)
);

CREATE TABLE Order_manager(
    staff_id int(10) primary key,
    supervisor_staff_id int(10) not null,
    foreign key (staff_id) references Staff(staff_id),
    foreign key (supervisor_staff_id) references Supervisor(staff_id)
);

CREATE TABLE Vehicle(
    vehicle_id int(10) primary key auto_increment,
    plate_number varchar(255) not null unique,
    vehicle_brand varchar(255) not null,
    vehicle_type varchar(255) not null,
    vehicle_name varchar(255) not null,
    manufacture_date date not null
);

CREATE TABLE Messenger(
    staff_id int(10) primary key,
    order_manager_staff_id int(10) not null,
    vehicle_id int(10) not null,
    foreign key (staff_id) references Staff(staff_id),
    foreign key (order_manager_staff_id) references Order_manager(staff_id),
    foreign key (vehicle_id) references Vehicle(vehicle_id)
);

CREATE TABLE Problem(
    problem_id int(10) primary key auto_increment,
    problem_datetime datetime not null,
    problem_detail text not null,
    problem_status enum('pending','solved') not null,
    report_datetime datetime not null default now(),
    staff_id int(10) not null,
    foreign key (staff_id) references Messenger(staff_id)
);

CREATE TABLE Problem_alert(
    alert_id int(10) primary key auto_increment,
    `message` text not null,
    problem_id int(10) not null,
    foreign key (problem_id) references Problem(problem_id)
);

CREATE TABLE Orders(
    order_id int(10) primary key auto_increment,
    customer_id int(10) not null,
    messenger_staff_id int(10) not null,
    arrived_datetime datetime,
    order_receiver varchar(255) not null,
    send_datetime datetime,
    order_cost float(10,3) not null,
    created_datetime datetime not null default now(),
    foreign key (messenger_staff_id) references Messenger(staff_id),
    foreign key (customer_id) references Customer(customer_id)
);

CREATE TABLE Goods(
    goods_id int(10) primary key auto_increment,
    goods_name varchar(255) not null,
    goods_type varchar(255) not null,
    goods_quantity int(10) not null,
    goods_status enum('delivered','issued','pending'),
    order_id int(10) not null,
    foreign key (order_id) references Orders(order_id)
);

CREATE TABLE Contacts(
    sender_id int(10),
    receiver_id int(10),
    `message` text,
    sent_datetime datetime not null default now(),
    primary key (sender_id, receiver_id),
    foreign key (sender_id) references User(account_id),
    foreign key (receiver_id) references User(account_id)
);
