import { Router } from "express";
import ScheduleController from "../controllers/schedule";

const router = Router();

router.get('/', ScheduleController.index);
router.post('/create', ScheduleController.create);
router.put('/update/:id', ScheduleController.update);
router.delete('/delete/:id', ScheduleController.destroy);

export default router;