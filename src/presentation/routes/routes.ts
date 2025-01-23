import express, { Router } from "express";
import { MatchRouter } from "./match";

const router = Router();

router.use(express.urlencoded({ extended: false }))
router.use('/match', MatchRouter);
export default router;