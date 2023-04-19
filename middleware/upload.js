const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const isCurrentMimetype = ['png', 'jpeg', 'svg']
    .includes(file.mimetype.replace('image/', ''));
  cb(null, isCurrentMimetype);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
