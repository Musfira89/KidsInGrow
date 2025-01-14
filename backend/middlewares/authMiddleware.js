export const isAuthenticated = (req, res, next) => {
  console.log(req.session); // Log session details for debugging
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};
