import {Router} from 'express';
import {createTodo, getTodos, updateTodo, delteTodo } from "../controllers/tosdos"

const router = Router();

router.post("/", createTodo);

router.get("/", getTodos);
 
router.patch("/:id", updateTodo);

router.delete("/:id", delteTodo);

export default router;