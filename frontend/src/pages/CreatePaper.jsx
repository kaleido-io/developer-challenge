import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../config';
import { UserContext, WhoAreYou } from '../contexts/UserContext';
import { Centered } from '../layouts/Centered';

function CreatePaperInner() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        // axios.get(`${API_URL}/data?wallet_address=${user.walletAddress}`).then((response) => {
        //     console.log(response.data);
        // });
        axios.get(`${API_URL}/metadata/0?wallet_address=${user.walletAddress}`).then((response) => {
            console.log(response.data);
        });
    }, [user]);

    return (
        <div className="new-paper">
            <div>Hi there {user.name}!</div>
            <div>Your wallet address is {user.walletAddress}</div>
        </div>
    );
}

export function CreatePaper() {
    return (
        <Centered>
            <WhoAreYou>
                <CreatePaperInner />
            </WhoAreYou>
        </Centered>
    );
}
