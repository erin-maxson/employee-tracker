USE employee_db;

INSERT INTO department(name)
VALUES ("Finance"),
       ("Development"),
       ("Marketing"),
       ("Operations");

INSERT INTO role(title, salary, department_id)
VALUES ("Finance Lead", 200000,1),
       ("Software Developer", 100000,2),
       ("Marketing Manager", 65000,3),
       ("Operations Manager", 80000,4)

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Boland")