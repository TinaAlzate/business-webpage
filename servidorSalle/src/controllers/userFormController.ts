import { Request, Response } from "express";
import { userFormI } from "../interfaces/userFormI";
import { transporEmailFunction } from "../transports/transportEmail";


export const postUserForm = async (req: Request, res: Response) =>{
    console.log(req.body);
    try {
        const { name, email, phone, company, subject, message }: userFormI = await req.body;
        // Function send email and admin
        transporEmailFunction(req);

        return res.status(200).json({
            msg: "Personal dates for user",
            data: {
                name,
                email,
                phone,
                company,
                subject,
                message,
            }
        });
    // throw new Error('Error form, data incomplete');
    } catch (error: any) {
        res.status(500).json({
            msg: error
        });
    }
}

export const getTestForm = (req: Request, res: Response) =>{
    res.status(200).json({
        msg: "get Form",
    });
}

