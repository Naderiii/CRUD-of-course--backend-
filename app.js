require("dotenv").config();

const express = require("express");
const app = express()
app.use(express.json())


const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`listen on port ${port}`);
})