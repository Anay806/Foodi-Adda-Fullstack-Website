import express from 'express'
import { addProduct, deleteProducts, getAllProduct, updateProduct } from '../controller/productController.js';
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js';
import { multipleUpload } from '../middleware/multer.js';



const router = express.Router()

router.post('/add', isAuthenticated, isAdmin, multipleUpload, addProduct)
router.get('/getallproducts', getAllProduct)
router.delete('/delete/:productId', isAuthenticated, isAdmin, deleteProducts)
router.put('/update/:productId', isAuthenticated, isAdmin, multipleUpload, updateProduct)



export default router;

