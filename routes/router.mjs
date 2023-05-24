import express from 'express'
const router = express.Router();



const controller=await import('../controller/controller.mjs');

router.route('/').get((req, res) => {
    res.redirect('/home');});
router.route('/home').get(controller.showHome);
router.route('/login').get(controller.showLogin).post(controller.login);
router.route('/profile').get(controller.checkAuthentication, controller.showProfile);
router.route('/facilities').get(controller.showFacilities);
router.route('/logout').get((req, res) => {
    req.session.destroy();
    res.redirect('/home');
});
router.route('/contactus').get(controller.showContactUs);
router.route('/reservation').get(controller.checkAuthentication, controller.showReservation).post(controller.checkAuthentication, controller.addReservation); 

export default router;
