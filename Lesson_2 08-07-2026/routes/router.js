const router = (req, res) => {
  // http://localhost:3000 || http://localhost:3000/home
  if (req.url === "/" || req.url === "/home") {
    return res.end("Home Page");
  }
  // http://localhost:3000/books
  if (req.url === "/books" ) {
    return res.end("Books Page");
  }
  // http://localhost:3000/about
  if (req.url === "/about") {
    return res.end("About Page");
  }
  // http://localhost:3000/users
  if (req.url === "/users") {
    return res.end("Users Page");
  }

  return res.end("Default Page - Error 404: Not Found Page");
};

module.exports = router;
