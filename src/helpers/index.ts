export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }

  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname;

  callback(null, `${Date.now()}-${name}`);
};
