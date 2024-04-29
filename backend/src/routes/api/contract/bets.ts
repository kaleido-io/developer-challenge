import { Router } from 'express';
const router = Router();
import firefly, { CONTRACTINFO, APINAME, KEY } from '../../../firefly/firefly';

router.post('/', async (req, res) => {
    const { game_id, team_id, bet_amount } = req.body;
    console.log('contracts/bets: ', game_id, team_id, bet_amount);

    try {
        // const transfer = await firefly.transferTokens({
        //     from: KEY,
        //     amount: betAmount,
        // });
        // console.log('transfer: ', transfer);
        const fireflyRes = await firefly.invokeContractAPI(
            APINAME,
            'placeBet',
            {
                input: {
                    _contractAddress: CONTRACTINFO?.location.address,
                    _gameId: game_id,
                    _teamId: team_id,
                    _value: bet_amount,
                },
            }
        );

        res.status(202).send({
            id: fireflyRes.id,
        });
    } catch (e: any) {
        res.status(500).send({
            error: e.message,
        });
    }
});

export default router;
