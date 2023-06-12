import {Sequelize} from "sequelize";

const db = new Sequelize('heally_3', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;