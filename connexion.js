import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Pas besoin de .parsed ici, cela charge les variables d'environnement

 const database = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_FILE // Utilisez 'env' en minuscules
});

export default database