import path from "path";

import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, callback) => callback(null, path.join(__dirname, "../../uploads/")),
	filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`),
});

export const upload = multer({ storage, limits: { fileSize: 1 * 1000 * 1000 } });
