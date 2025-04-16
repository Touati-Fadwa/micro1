
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB établie avec succès'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Initialisation de l'administrateur
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const initAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@iset.tn' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        name: 'Administrateur',
        email: 'admin@iset.tn',
        password: hashedPassword,
        role: 'admin'
      });
      
      await admin.save();
      console.log('Administrateur créé avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'administrateur:', error);
  }
};

// Routes
app.use('/api/auth', authRoutes);

// Initialisation de l'administrateur au démarrage du serveur
mongoose.connection.once('open', () => {
  initAdmin();
});

// Route de test
app.get('/', (req, res) => {
  res.send('API pour la gestion de bibliothèque');
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
