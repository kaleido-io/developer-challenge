import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const KEY = process.env.KEY;
    const CONTRACTNODE = process.env.CONTRACTNODE;
    if (KEY === CONTRACTNODE) {
        res.send({
            role: 'admin',
            permissions: ['create_game', 'update_game'],
        });
    } else {
        res.send({ role: 'better', permissions: ['create_bet'] });
    }
});

export default router;
