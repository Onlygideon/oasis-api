const express = require('express');
const colors = require('colors');

const product = require('./routes/product')


const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use('/', product)


const server = app.listen(PORT, () => console.log(`server running on Port ${PORT}`.blue.bold))


// Handle unhandled promise rejectiions
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);

    // Close server & exit process (i.e app to fail)
    server.close(() => process.exit(1))
})