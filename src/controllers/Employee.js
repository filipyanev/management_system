const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Employees = require("../models/Employees");

class Employee {
    // Get all employees
    async getEmployees() {
        let results;
        try {
            results = await Employees.findAll();
        } catch (e) {
            console.log(e);
        }

        return results;
    }

    /**
     * Get all employee by Id
     * @param {number} id 
     * @returns 
     */
    async getEmployeeById(id) {
        let result = {};
        try {
            result = await Employees.findByPk(id);
        } catch (e) {
            console.log(e);
        }

        return result;
    }

    /**
     * Get employees for given string, act as a search
     * @param {string} searchText 
     * @returns 
     */
    async searchEmployees(searchText) {
        let results;

        try {
            results = await Employees.findAll({
                where: {
                    name: { [Op.iLike]: "%" + searchText + "%" },
                },
                raw: true,
            });
        } catch (e) {
            console.log(e);
        }

        return results;
    }

    /**
     * Create new employee
     * @param {object} employee 
     * @returns 
     */
    async createEmployee(employee) {
        try {
            await Employees.create(employee);
        } catch (e) {
            console.log(e);
        }

        return;
    }
}

module.exports = Employee;