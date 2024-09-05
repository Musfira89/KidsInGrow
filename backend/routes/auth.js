import express from 'express';
import { signup, login, logout, Adminlogin, getUserInfo } from '../Controllers/auth.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/Adminlogin', Adminlogin);
router.post('/logout', logout);
// router.js (or wherever your routes are defined)
router.get('/userInfo/:userId', getUserInfo);


export default router;
