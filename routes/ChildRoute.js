import express from "express";
import { 
    getChild,
    getChildById,
    createChild,
    updateChild,
    deleteChild
 } from "../controllers/Child.js";
 import { verifyUser } from "../middleware/AuthUser.js";

 const router = express.Router();

 router.get('/child', verifyUser,getChild);
 router.get('/child/:id', verifyUser,getChildById);
 router.post('/child', verifyUser,createChild);
 router.patch('/child/:id', verifyUser,updateChild);
 router.delete('/child/:id', verifyUser,deleteChild);

 export default router;