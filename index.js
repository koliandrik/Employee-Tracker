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
            break;
        case 'View all employees':
            // Call a function to view all employees
            break;
        case 'Add a department':
            // Call a function to add a department
            break;
        case 'Add a role':
            // Call a function to add a role
            break;
        case 'Add an employee':
            // Call a function to add an employee
            break;
        case 'Update an employee role':
            // Call a function to update an employee role
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }
};

startApp();