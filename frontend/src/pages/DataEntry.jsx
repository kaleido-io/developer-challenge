import React, { useCallback, useState, useContext } from 'react';
import axios from 'axios';

import { API_URL } from '../config';
import { UserContext, WhoAreYou } from '../contexts/UserContext';

function DataEntryInner() {
    const { user } = useContext(UserContext);

    const [dataType, setDataType] = useState();
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('metadata', JSON.stringify({
            dataType,
            description
        }));
        formData.append('wallet_address', user.walletAddress);
        axios.post(`${API_URL}/data`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }

        }).then((response) => {
            console.log(response);
        });
    }, [selectedFile, description]);

    return (
        <div className="data-entry">
            <div>Hi there {user.name}!</div>
            <div>Your wallet address is {user.walletAddress}</div>
            <form onSubmit={handleSubmit}>
                <input name="dataType" type="text" value={dataType} disabled />
                <input
                    name="description"
                    type="text"
                    defaultValue="This is a research data file."
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <input
                    name="data"
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setSelectedFile(file);
                        setDataType(file.type);
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export function DataEntry() {
    return (
        <WhoAreYou>
            <DataEntryInner />
        </WhoAreYou>
    );
}
