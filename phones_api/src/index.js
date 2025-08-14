const app = require("./app.js");

const phonesRoutes = require("./routes/phone.routes.js");

app.use("/api/phones", phonesRoutes);

app.get("/", (req, res) => {
  res.send("hello world this is lookgin good!!!");
});

// todo: helpers
// todo: make cloudinary middleware req before not in the main fn
// reminder: don't make useledd app.js file

// check;
