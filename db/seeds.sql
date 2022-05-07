INSERT INTO departments (name) 
  VALUES 
  ("Sales"), 
  ("Engineering"), 
  ("Finance"), 
  ("Tech"),
  ("R&D"),
  ("Legal");

INSERT INTO roles (title, salary, department_id)
  VALUES
  ("Sales manager", 120000, 1),
  ("Salesperson", 60000, 1),
  ("Software Engineer", 150000, 2),
  ("Accounts Manager", 120000, 3),
  ("Accountant", 80000, 3),
  ("Legal Team manager", 300000, 6),
  ("Lead R&D Engineer", 275000, 5),
  ("R&D Assistant", 125000, 5),
  ("Front-End Developer", 160000, 4),
  ("Back-End Developer", 160000, 4),
  ("Legal Intern", 30000, 6),
  ("Tech-Intern", 160000, 4),
  ("Lawyer", 150000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES
  ("Amber", "Smith", 1, 1),
  ("Micheal", "Chamber", 2, NULL),
  ("Ash", "Roddy", 3, NULL),
  ("Keiren", "Tommy", 4, 4),
  ("Kul", "Ember", 5, NULL),
  ("Maly", "Bally", 6, 6),
  ("Sara", "Dam", 7, 7),
  ("Tommy", "Aligator", 8, NULL),
  ('Doris', 'Mamms', 9, NULL),
  ('Joe', 'Mories', 10, NULL),
  ('Gol', 'D-Roger', 11, NULL),
  ('Port', 'DAce', 12, NULL),
  ('Luffy', 'Unknown',  13, NULL),
  ('Naruto', 'Uzimaki', 12, NULL),
  ('Howard', 'Start', 11, NULL),
  ('Tony', 'Stark',  5, NULL),
  ('Wanda', 'Vision',  3, NULL),
  ('Bruce', 'Wayne',  2, NULL);

