const mongoose = require('mongoose')

const dbUri = "mongodb://localhost:27017/library_management_system_db"

mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(dbUri,
        { useNewUrlParser: true, useUnifiedTopology: true })
}