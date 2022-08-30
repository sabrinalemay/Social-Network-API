const express = require("express");
const mongoose = require("mongoose");
const { ppid } = require("process");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(
    process.env.MODGODB_URI || "mongodb://localhost:27017/social-network-api",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.set("debug", true);

app.listen(PORT, () => console.log("connected on localhost:${PORT}"));