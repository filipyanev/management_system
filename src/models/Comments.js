const Sequelize = require('sequelize');
const db = require('../configurations/db');

const Comments = db.define('comments', {
  comment_content: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  employee_id:{
      type: Sequelize.INTEGER
    }
});

Comments.associate = (models) => {
  Comments.belongsTo(models.Employees, {
    foreignKey: "id"
  });
};

Comments.sync().then(() => {
  console.log("'comments' table created");
});

module.exports = Comments;