// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

// Получение изображений для синхронизации
router.get('/images', async (req, res) => {
  try {
    const lastSync = req.query.lastSync ? new Date(req.query.lastSync) : null;

    let images;
    if (lastSync) {
      // Найти только новые и измененные изображения
      images = await Image.find({ uploadedAt: { $gt: lastSync } });
    } else {
      // Если lastSync не задан, вернуть все изображения
      images = await Image.find({});
    }

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving images' });
  }
});

// Удаление изображений
router.delete('/images/:id', async (req, res) => {
  try {
    const result = await Image.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(204).send(); // Успешное удаление, без тела
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting image' });
  }
});

// Добавление изображений
// Если вам нужно загрузить изображения, воспользуйтесь библиотеками, такими как multer для обработки файлов.

module.exports = router;
