
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware d'authentification
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ message: 'Pas de token, autorisation refusée' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token non valide' });
  }
};

// Route de connexion pour admin et étudiants
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }
    
    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }
    
    // Créer et envoyer le token JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            borrowedBooks: user.borrowedBooks
          }
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer l'utilisateur connecté
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour ajouter un étudiant (admin uniquement)
router.post('/register', authMiddleware, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    const admin = await User.findByPk(req.user.id);
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé. Droit administrateur requis.' });
    }
    
    const { name, email, password, department } = req.body;
    
    // Vérifier si l'étudiant existe déjà
    let student = await User.findOne({ where: { email } });
    if (student) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    
    // Créer le nouvel étudiant
    student = await User.create({
      name,
      email,
      password, // le hook beforeCreate s'occupera du hachage
      role: 'student',
      department: department || '',
      borrowedBooks: 0
    });
    
    res.status(201).json({
      message: 'Étudiant ajouté avec succès',
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        department: student.department,
        role: student.role
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route publique pour vérifier l'état du serveur
router.get('/status', (req, res) => {
  res.json({ message: 'Le serveur d\'authentification fonctionne correctement' });
});

module.exports = router;
