import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: false, //Esta propiedad hace que cada setencia SQL que ejecutemos se muestre en consola en produccion no es necesario. 
});

export default db;