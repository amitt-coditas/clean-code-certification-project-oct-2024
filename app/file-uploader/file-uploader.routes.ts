import { Request, Response, Router } from "express";
import { upload } from "../util/file-uploader";
import fs from "fs";

import fileUploaderService from "./file-uploader.service";

const router = Router();

router.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
	try {
		const data = await fileUploaderService.uploadFile(req.file);
		res.send(data);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get("/files/:fileId", async (req: Request, res: Response) => {
	try {
		const fileId = req.params.fileId;
		const filePath = await fileUploaderService.getFile(fileId);

		if (fs.existsSync(filePath)) {
			res.download(filePath, (err) => {
				if (err) {
					res.send({ message: "Try Again", status: 500 });
				}
				res.status(200).send({ message: "File Downloaded", status: 200 });
			});
		} else {
			res.status(404).send({ message: "Not Found", status: 404 });
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete("/files/:fileId", async (req: Request, res: Response) => {
	try {
		const fileId = req.params.fileId;
		const deletedFile = await fileUploaderService.deleteFile(fileId);
		res.send(deletedFile);
	} catch (error) {
		res.status(400).send(error);
	}
});

export default router;
