const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
};
app.use(cors(corsOptions));

const db = require('./app/models');
db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Backend running' });
});

require('./app/routes/users.routes')(app);
require('./app/routes/messages.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
