import express from "express";
import fileUploaderRouter from "./file-uploader/file-uploader.routes";

const startServer = () => {
	const app = express();

	app.use(express.json());
	app.use(fileUploaderRouter);

	const PORT = process.env.PORT || 3001;
	app.listen(PORT, () => {
		console.log(`Server STARTED on http://localhost:${PORT}`);
	});
};

export default startServer;
