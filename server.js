require("dotenv").config();
require("./config/dbConnect");
const app = require("./app/app");

const PORT = process.env.PORT || 2020;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
