import { Router } from 'express';
import {
  createResetSession,
  generateOTP,
  getUser,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
} from '../controllers/appController.js';
import { verifyUser, protect } from '../middleware/authMiddleware.js';

const router = Router();

//POST
router.route('/register').post(register); //register user
router.route('/registerMail').post(register); // sendthe email
router.route('/auth').post((req, res) => res.end()); // authenticate user
router.route('/login').post(verifyUser, login); //login

//GET
router.route('/user/:username').get(getUser); //user with username
router.route('/generateOTP').get(generateOTP); // generate random OTP
router.route('/verifyOTP').get(verifyOTP); // verify generated OT
router.route('/createresetSession').get(createResetSession); // reset all the variables
//PUT
router.route('/updateuser').put(protect, updateUser); // update user data
router.route('/resetPassword').put(resetPassword); // resetPassword Data

//DELETE

export default router;
