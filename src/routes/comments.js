const express = require("express");
const router = express.Router();
const Employee = require('../controllers/Employee');
const Comment = require('../controllers/Comments');

const EmployeeInstance = new Employee();
const CommentInstance = new Comment();

// Get all comments for user.
router.get('/comments', async (req, res) => {
});


// Get aignle component update page.
router.get('/comments/:employeeId/:commentId', async (req, res) => {
    const { employeeId, commentId } = req.params;
    const employeeIdNumber = parseInt(employeeId);
    const commentIdNumber = parseInt(commentId);

    if (isNaN(employeeIdNumber) || isNaN(commentIdNumber)) return res.redirect('/notFound');

    let employee = await EmployeeInstance.getEmployeeById(employeeIdNumber);
    if (!employee) return res.redirect('/notFound');

    let comment = await CommentInstance.getCommentById(commentIdNumber);
    if (!comment) return res.redirect('/notFound');

    return res.render('editComment', { employee, comment });
});

// Create comment.
router.post('/comments/:employeeId/create', async (req, res) => {
    const { employeeId } = req.params;
    await CommentInstance.createComment(employeeId, req.body);
    return res.redirect(`/employees/${employeeId}`)
});

// Update comment.
router.post('/comments/:employeeId/:commentId', async (req, res) => {
    const { commentId, employeeId } = req.params;
    await CommentInstance.updateComment(commentId, req.body);
    return res.redirect(`/employees/${employeeId}`)
});

// Delete comment.
router.delete('/comments/:employeeId/:commentId', async (req, res) => {
    const { commentId } = req.params;
    await CommentInstance.deleteComment(commentId);
    return res.render('home');
});

module.exports = router;