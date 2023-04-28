import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
    TextField, Button, Typography, Paper, Popover, Select, MenuItem
} from '@mui/material';

import { DS_API_URL } from '../config';
import { USERS } from '../users';

const FieldsWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

const StyledTextField = styled(TextField)`
    flex-grow: 1;
`;

const Section = styled.div`
    &:not(:last-child) {
        margin-bottom: 32px;
    }

    .MuiTypography-root {
        margin-bottom: 16px;
    }
`;

const DetailWrapper = styled.div`
    padding: 24px;
`;

const StyledPaper = styled(Paper)`
    padding: 36px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

export function RawDataDetail({
    user, createdBy, onChainId, dataType, setDataType, description, setDescription, setSelectedFile, onSubmit
}) {
    const [accessPopoverAnchorEl, setAccessPopoverAnchorEl] = useState(null);
    const [approveAccessFor, setApproveAccessFor] = useState('');

    const approveAccess = useCallback(() => {
        axios.post(`${DS_API_URL}/data/${onChainId}/approve/${approveAccessFor}`, {
            wallet_address: user.walletAddress
        }).then(() => { setAccessPopoverAnchorEl(); });
    }, [onChainId, approveAccessFor]);

    return (
        <DetailWrapper>
            <StyledPaper>
                <Typography variant="h4" component="div">{onChainId ? `RawData#${onChainId}` : 'New Raw Data'}</Typography>
                <form onSubmit={onSubmit}>
                    <Section>
                        <Typography variant="h6" component="div">Metadata</Typography>
                        <FieldsWrapper>
                            <StyledTextField
                                name="dataType"
                                label="Data Type"
                                type="text"
                                variant="standard"
                                value={dataType}
                                disabled
                            />
                            <StyledTextField
                                name="description"
                                label="Description"
                                type="text"
                                variant="standard"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                disabled={!setDescription}
                            />
                        </FieldsWrapper>
                    </Section>
                    {setSelectedFile && (
                        <Section>
                            <Typography variant="h6" component="div">Upload Data File</Typography>
                            <input
                                name="data"
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setSelectedFile(file);
                                    setDataType(file.type);
                                }}
                            />
                        </Section>
                    )}
                    <ActionsWrapper>
                        {onSubmit && <Button type="submit" variant="outlined">Create</Button>}
                        {typeof onChainId === 'number' && createdBy === user.walletAddress && (
                            <>
                                <Button type="button" variant="text" onClick={(e) => { setAccessPopoverAnchorEl(e.currentTarget); }}>Approve Access</Button>
                                <Popover id="popover-new-figure" open={!!accessPopoverAnchorEl} anchorEl={accessPopoverAnchorEl}>
                                    <Typography variant="body" component="div">Approve access to this data for:</Typography>
                                    <Select label="Approve for" value={approveAccessFor} onChange={(e) => { setApproveAccessFor(e.target.value); }}>
                                        {USERS.filter((u) => (u.walletAddress !== user.walletAddress && !!u.role)).map((u) => (
                                            <MenuItem key={`approve-user-${u.walletAddress}`} value={u.walletAddress}>{u.name} ({u.role}): {u.walletAddress}</MenuItem>
                                        ))}
                                    </Select>
                                    <ActionsWrapper>
                                        <Button type="button" variant="outlined" onClick={approveAccess}>Approve</Button>
                                        <Button type="button" variant="text" onClick={() => { setAccessPopoverAnchorEl(); }}>Cancel</Button>
                                    </ActionsWrapper>
                                </Popover>
                            </>
                        )}
                    </ActionsWrapper>
                </form>
            </StyledPaper>
        </DetailWrapper>
    );
}

export function RawDataNew({
    walletAddress, onCreate, onCreated
}) {
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

    const propsThru = {
        dataType, setDataType, description, setDescription, setSelectedFile, onSubmit: handleSubmit
    };

    return (
        <RawDataDetail {...propsThru} />
    );
}
