const express = require('express');
const db = require('./src/configurations/db');
const employeesRoutes = require('./src/routes/employees');
const commentsRoutes = require('./src/routes/comments');
const mainRoutes = require('./src/routes/main');

/** Connect to DB */
db.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Error: ' + err));

/**
 * Create express app
 */
const app = express();

// set the view engine to ejs
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views/pages");
app.use('/static', express.static(`${__dirname}/src/public`));

// add routes
app.use(mainRoutes);
app.use(employeesRoutes);
app.use(commentsRoutes);

// in case off missing page show following
app.use(function (req, res) {
    res.status(404);

    // render not found page
    if (req.accepts('html')) {
        res.render('notFound', { url: req.url });
        return;
    }
});

// if port not specified use 3000 by default
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));