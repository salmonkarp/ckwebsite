function userAuthentication(req, res, next) {
  console.log("at auth:", req.session, req.session.user);
  if (req.session && req.session.user) {
    console.log("Authenticated");
    next();
  } else {
    console.log("Failed to authenticate");
    res.redirect("/login");
  }
}

module.exports = userAuthentication;
