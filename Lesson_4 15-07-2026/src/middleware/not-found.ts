const notFound = (req, res, next) => {
  res.status(404).json({ message: "Page not found - try correct url" });
};

// module.exports = notFound;
export default notFound;
