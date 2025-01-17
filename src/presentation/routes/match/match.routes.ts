import express, { Router } from "express";
import { MatchController } from "../../controllers";

const router = Router();

router.use('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

router.use(express.urlencoded({ extended: false }))
export default router;