const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const auth = require('./utils/verifyToken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`)); // port, callback