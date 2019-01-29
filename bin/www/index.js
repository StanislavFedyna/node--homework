const app = require('../../app.js');

// Вказуючи порт 0 ми даємо задачу взяти собі любий вільний порт в ос
const PORT = process.env.PORT || 8081 || 0;

var listener = app.listen(PORT, (req, res) => {
    console.log(`server on ${listener.address().port}`);
}) 
