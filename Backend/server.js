const connectDB = require('./config/database')
const express = require('express');
const citizenRoutes = require('./routes/citizenroutes')

connectDB()

const app = express();
const port = process.env.PORT || 5000;

app.use('/api/citizen', citizenRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

