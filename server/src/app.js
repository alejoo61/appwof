const express = require("express")
const middlewares = require("./config/middlewares")
const listen = require("./config/listen")
const { dbConnect } = require("./config/dbConnect")
const insertCountries = require("./services/database/insertCountries")

const app = express()

// MIDDLEWARES
middlewares(app)

// ROUTES
// http://localhost/api/
app.use("/api", require("./routes"))

// NOT FOUND
app.use((_, res) => {
  res.status(404).json({
    error: "Unconfigured route, please review the documentation."
  });
});

// LISTEN
listen(app, async () => {
  // Database conexion
  await dbConnect()

  // Insert o not Countries into Database.
  await insertCountries()
})