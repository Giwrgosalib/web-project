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
router.route('/profile').post(controller.checkAuthentication, controller.updateUser);

router.route('/profile/delete/:resid').get(controller.deleteReservation);

router.route('/reservations').get(controller.checkAuthentication, controller.showResButton).post(controller.checkAuthentication, controller.addReservation);

router.get('/reservations/data/:date', controller.showReservedHours);
router.get('/reservations/data/coaches/:date/:time', controller.showFreeCoaches);
export default router;
