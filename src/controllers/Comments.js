const Employees = require("../models/Employees");
const Comments = require("../models/Comments");

class Comment {
    /**
    * Create new employee comment
    * @param {number} employeeId 
    * @param {object} comment 
    */
    async createComment(employeeId, comment) {
        try {
            const employee = await Employees.findOne({
                where: { id: employeeId },
            });

            if (employee) {
                await Comments.create({
                    ...comment,
                    employee_id: employee.id,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Update existing comment
     * @param {number} id 
     * @param {object} newCommentData 
     */
    async updateComment(id, newCommentData) {
        try {
            // find comment
            const comment = await Comments.findByPk(id);
            if (comment) {
                // Update properties
                for (const key of Object.keys(newCommentData)) {
                    // prevent updating employee id related to comment
                    if (key !== "employee_id") {
                        comment[key] = newCommentData[key];
                    }
                }

                await comment.save();
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Get all existing comments
     */
    async getComments() {
        let results;
        try {
            results = await Comments.findAll();
        } catch (e) {
            console.log(e);
        }

        return results;
    }

    /**
     * Get all comments for employee with given id
     * @param {number} employeeId
     */
    async getCommentsByEmployeeId(employeeId) {
        let results = [];

        try {
            results = await Comments.findAll({
                where: { employee_id: employeeId },
                raw: true,
            });
        } catch (e) {
            console.log(e);
        }

        return results;
    }

    /**
     * Get comment by id
     * @param {number} id 
     */
    async getCommentById(id) {
        try {
            const comment = await Comments.findByPk(id);
            if (comment) {
                return comment;
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Detele single comment by id
     * @param {number} id 
     */
    async deleteComment(id) {
        const comment = await Comments.findByPk(id);
        if (comment) {
            await Comments.destroy({
                where: {
                    id: comment.id,
                },
            });
        }

        return;
    }

    /**
     * Delete all comments for given employee id
     * @param {number} employeeId 
     */
    async deleteEmployeeComments(employeeId) {
        try {
            const employee = await Employees.findByPk(employeeId);
            if (employee) {
                await Comments.destroy({
                    where: {
                        employee_id,
                    },
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Comment;