// Import any necessary modules or models
// For example, if you need to work with tasks or users, import them here

// Define controller functions for home-related operations

// Controller function for rendering the home page
exports.homePage = (req, res) => {
    // You can render the home page view here
    // For example:
    res.render('home');
};

exports.todoPage = (req, res) => {
    res.render("todo");
}
