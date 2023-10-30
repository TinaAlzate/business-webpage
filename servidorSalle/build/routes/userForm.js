"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userFormController_1 = require("../controllers/userFormController");
const userFormValidation_1 = require("../validations/userFormValidation");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    // const filePaht = path.join(__dirname,'/index.html');
    const filePaht = 'C:/entregable_modulo1/front-lasalle/';
    res.sendFile(filePaht);
});
router.post('/form', userFormValidation_1.validateFormuser, userFormController_1.postUserForm);
exports.default = router;
