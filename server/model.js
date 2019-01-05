const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/boss'
mongoose.connect(DB_URL)