const express = require("express");
const router = express.Router();
const Employee = require('../controllers/Employee');
const Comment = require('../controllers/Comments');

const EmployeeInstance = new Employee();
const CommentInstance = new Comment();

// Get search employees.
router.get('/search', async (req, res) => {
    const { text } = req.query;
    let employees = await EmployeeInstance.searchEmployees(text);
    return res.render('search', { employees, text });
});

// Get all employee.
router.get('/employees', async (req, res) => {
    let employees = await EmployeeInstance.getEmployees();
    return res.render('employees', { employees });
});

// Get signle employee.
router.get('/employees/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const id = parseInt(employeeId);
    if (isNaN(id)) {
        return res.redirect('/notFound');
    }
    let employee = await EmployeeInstance.getEmployeeById(id);
    if (!employee) {
        return res.redirect('/notFound');
    }
    let comments = await CommentInstance.getCommentsByEmployeeId(id);
    return res.render('employee', { employee, comments });
});

// Get add employee form page.
router.get('/employee', async (req, res) => {
    return res.render('addEmployee');
});

// Create employee.
router.post('/employee', async (req, res) => {
        // TODO: add body validation
        await EmployeeInstance.createEmployee(req.body);
        return res.redirect('/employees')
    });

// Update employee.
router.put('/employees/:employeeId', async (req, res) => {
    // not implemented
});

// Delete employee.
router.delete('/employees/:employeeId', async (req, res) => {
    // not implemented
});

module.exports = router;