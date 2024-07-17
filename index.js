const inquirer = require('inquirer');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;

const pool = new Pool(
    {
        user: 'postgres',
        password: 'Pelmeni1',
        host: 'localhost',
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee_tracker_db database!')
);

pool.connect();

const viewDepartments = async () => {
    const query = 'SELECT * FROM departments';
    const { rows } = await pool
        .query(query);
    console.table(rows);
    startApp();
}

const viewRoles = async () => {
    const query = 'SELECT * FROM roles';
    const { rows } = await pool
        .query(query);
    console.table(rows);
    startApp();
}

const viewEmployees = async () => {
    const query = 'SELECT * FROM employees';
    const { rows } = await pool
        .query(query);
    console.table(rows);
    startApp();
}

const addDepartment = async () => {
    const { departmentName } = await inquirer.prompt({
        name: 'departmentName',
        type: 'input',
        message: 'What is the name of the department?'
    });

    const query = 'INSERT INTO departments (name) VALUES ($1)';
    await pool.query(query, [departmentName]);
    console.log('Department added!');
    startApp();
}

const addRole = async () => {
    const { title, salary, departmentId } = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?'
        },
        {
            name: 'departmentId',
            type: 'input',
            message: 'What is the department ID of the role?'
        }
    ]);

    const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
    await pool.query(query, [title, salary, departmentId]);
    console.log('Role added!');
    startApp();
}

const addEmployee = async () => {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the employee?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the employee?'
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'What is the role ID of the employee?'
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'What is the manager ID of the employee?'
        }
    ]);

    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [firstName, lastName, roleId, managerId]);
    console.log('Employee added!');
    startApp();
}


const startApp = async () => {
    const options = [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
    ];

    const { choice } = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: options
    });

    switch (choice) {
        case 'View all departments':
            // Call a function to view all departments
            viewDepartments();
            break;
        case 'View all roles':
            // Call a function to view all roles
            viewRoles();
            break;
        case 'View all employees':
            // Call a function to view all employees
            viewEmployees();
            break;
        case 'Add a department':
            // Call a function to add a department
            addDepartment();
            break;
        case 'Add a role':
            // Call a function to add a role
            addRole();
            break;
        case 'Add an employee':
            // Call a function to add an employee
            addEmployee();
            break;
        case 'Update an employee role':
            // Call a function to update an employee role
            updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }
};

startApp();