
import multer from 'multer';



const storage = multer.memoryStorage();
//single Upload
export const singleUpload = multer({ storage }).single('file');

//multiple Upload
export const multipleUpload = multer({ storage }).array('files', 5); // maximum 5 files




export default { singleUpload, multipleUpload };