import path from "path";
import fs from "fs";

const uploadFile = async (file?: Express.Multer.File) => {
	try {
		if (!file) {
			return { message: "Try Again", status: 400 };
		}
		// Assuming there is some asynchronous task is going
		return { message: "File Uploaded", fileId: file.filename, status: 200 };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getFile = async (fileId: string) => {
	try {
		// Assuming there is some asynchronous task is going
		const filePath = path.join(__dirname, "../uploads", fileId);
		return filePath;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const deleteFile = async (fileId: string) => {
	try {
		const filePath = await getFile(fileId);

		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
			// Assuming there is some asynchronous task is going
			return { message: "File Deleted", status: 200 };
		}
		return { message: "Not Found", status: 404 };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const fileUploaderService = { uploadFile, getFile, deleteFile };
export default fileUploaderService;
