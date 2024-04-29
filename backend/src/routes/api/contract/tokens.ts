import { Router } from 'express';
const router = Router();
import firefly, { CONTRACTINFO, APINAME, KEY } from '../../../firefly/firefly';

router.get('/balance', async (req, res) => {
    try {
        const fireflyRes = await firefly.invokeContractAPI(
            APINAME,
            'tokenBalance',
            {}
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

router.get('/allowance', async (req, res) => {
    const _contractAddress = CONTRACTINFO?.location.address;
    try {
        const fireflyRes = await firefly.invokeContractAPI(
            APINAME,
            'tokenAllowance',
            {
                input: {
                    _contractAddress,
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

router.post('/approval', async (req, res) => {
    const { approval_amount } = req.body;

    try {
        // const transfer = await firefly.transferTokens({
        //     from: KEY,
        //     amount: betAmount,
        // });
        // console.log('transfer: ', transfer);
        const fireflyRes = await firefly.invokeContractAPI(
            APINAME,
            'tokenApproval',
            {
                input: {
                    _contractAddress: CONTRACTINFO?.location.address,
                    _value: approval_amount,
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
