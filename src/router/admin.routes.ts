// routes/admin.ts
import express from 'express';
import { getAllUserForAdmin } from './getUsers';


const router = express.Router();

router.get("/all-users", async (req, res) => {
  const result = await getAllUserForAdmin();
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
  
});

export const adminRouter = router;