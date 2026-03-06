
    const express = require('express');
    const {handleUserSignupRoute, handleUserLoginRoute} = require('../controller/user');

    const router = express.Router();




    router.
    route('/signup').post(handleUserSignupRoute);
    router.post('/login', handleUserLoginRoute)
    module.exports = router;