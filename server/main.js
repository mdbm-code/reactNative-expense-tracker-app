const multer = require('multer');
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // Ограничение: 10 MB

router.post('/images', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.originalname,
      path: `/uploads/${req.file.filename}`, // Путь, где сохранено изображение
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

const cors = require('cors');
app.use(
  cors({
    origin: '*', // Настройте это для вашего клиента, если требуется
    optionsSuccessStatus: 200,
  })
);
