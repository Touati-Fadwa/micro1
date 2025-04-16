
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/User');
const authRoutes = require('./routes/auth');

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialisation de l'administrateur
const initAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { email: 'admin@iset.tn' } });
    
    if (!adminExists) {
      await User.create({
        name: 'Administrateur',
        email: 'admin@iset.tn',
        password: 'admin123', // le hook beforeCreate s'occupera du hachage
        role: 'admin'
      });
      
      console.log('Administrateur créé avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'administrateur:', error);
  }
};

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API pour la gestion de bibliothèque');
});

// Synchroniser les modèles avec la base de données et démarrer le serveur
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Connexion à la base de données PostgreSQL établie avec succès');
    initAdmin();
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données:', err);
  });
