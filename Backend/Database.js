const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();
const connectDatabase = () => {

    mongoose
        .connect(process.env.MONGODB)
        .then((con) => {
            console.log(`Database connected with host: ${con.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
            process.exit(1)
        })

}

module.exports = connectDatabase();