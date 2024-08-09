const express = require("express");
const app = express();
const routes = require("./routes/routes");
const { errorHandler } = require("./middleware/errorHandler");
const { logRequests } = require("./middleware/logRequests");

app.use(express.json());
app.use(logRequests);
app.use("/api", routes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
