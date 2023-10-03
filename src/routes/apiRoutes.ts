import express from 'express';

const router = express.Router();

router.get('/data', (req, res) => {
    res.json({message: 'API data'});
});

export default router;
