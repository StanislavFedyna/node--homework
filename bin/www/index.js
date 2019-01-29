const app = require('../../app.js');

// Using port zero for apportunity free ports in os
const PORT = process.env.PORT || 8081 || 0;

var listener = app.listen(PORT, (req, res) => {
    console.log(`server on ${listener.address().port}`);
}) 
