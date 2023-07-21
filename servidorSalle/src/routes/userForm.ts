import { Router } from 'express';
import { postUserForm, getTestForm } from '../controllers/userFormController';
import  { validateFormuser }  from '../validations/userFormValidation';
import path from 'path';

const router =  Router();
router.get('/',
    (req, res) => {
        // const filePaht = path.join(__dirname,'/index.html');
        const filePaht = 'C:/entregable_modulo1/front-lasalle/';
        res.sendFile(filePaht);
    }
);

router.post('/form',validateFormuser, postUserForm );


export default router;