import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { DS_API_URL } from '../config';

export function NewRawData({ walletAddress, onCreate, onCreated }) {
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
        formData.append('wallet_address', walletAddress);

        // Mostly for the loading indicator
        if (onCreate) {
            onCreate();
        }

        axios.post(`${DS_API_URL}/data`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            onCreated(response.data);
        });
    }, [selectedFile, description, walletAddress, onCreate, onCreated]);

    return (
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
    );
}
