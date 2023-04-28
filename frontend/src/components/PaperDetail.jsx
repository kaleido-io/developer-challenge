import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
    TextField, Button, Popover, Typography, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { DS_API_URL } from '../config';

const FieldsWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

const StyledTextField = styled(TextField)`
    flex-grow: 1;
`;

function NewFigure({ availableRawData, onCreated, onCancel }) {
    const [name, setName] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const rawDataColumns = useMemo(() => [
        { field: 'id', headerName: 'RawData Id' },
        { field: 'dataType', headerName: 'Data Type' },
        { field: 'description', headerName: 'Description' },
        { field: 'createdBy', headerName: 'Created By' }
    ], []);

    const rawDataRows = useMemo(() => {
        if (!availableRawData) {
            return [];
        }
        return availableRawData.map(({
            onChainId, dataType, description, createdBy
        }) => ({
            id: onChainId, dataType, description, createdBy
        }));
    }, [availableRawData]);

    return (
        <>
            <TextField
                name="name"
                label="Figure name"
                type="text"
                variant="standard"
                defaultValue="Figure Name"
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <DataGrid
                columns={rawDataColumns}
                rows={rawDataRows}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setSelectedIds(newRowSelectionModel.map((stringId) => parseInt(stringId)));
                }}
                checkboxSelection
            />
            <Button type="button" onClick={() => onCreated(name, selectedIds)} variant="contained">Add</Button>
            <Button type="button" onClick={() => onCancel()} variant="text">Cancel</Button>
        </>
    );
}

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

export function PaperDetail({
    onChainId, title, setTitle, organization, setOrganization, figures, setFigures, onSubmit, availableRawData, journals, user
}) {
    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
    const [journalPopoverAnchorEl, setJournalPopoverAnchorEl] = useState(null);
    const [submitPaperTo, setSubmitPaperTo] = useState('');

    const submitPaper = useCallback(() => {
        axios.post(`${DS_API_URL}/papers/${onChainId}/publish/${submitPaperTo}`, {
            wallet_address: user.walletAddress
        }).then(() => { setJournalPopoverAnchorEl(); });
    }, [onChainId, submitPaperTo]);

    return (
        <DetailWrapper>
            <StyledPaper>
                <Typography variant="h4" component="div">{onChainId ? `Paper#${onChainId}` : 'New Paper'}</Typography>
                <form onSubmit={onSubmit}>
                    <Section>
                        <Typography variant="h6" component="div">Metadata</Typography>
                        <FieldsWrapper>
                            <StyledTextField
                                name="title"
                                label="Title"
                                type="text"
                                variant="standard"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                disabled={!setTitle}
                            />
                            <StyledTextField
                                name="organization"
                                label="Organization"
                                type="text"
                                variant="standard"
                                value={organization}
                                onChange={(e) => {
                                    setOrganization(e.target.value);
                                }}
                                disabled={!setOrganization}
                            />
                        </FieldsWrapper>
                    </Section>
                    <Section>
                        {figures && (
                            <>
                                <Typography variant="h6" component="div">Figures</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Figure Name</TableCell>
                                            <TableCell>Raw Data</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {figures.map((figure) => (
                                            <TableRow key={`figure-${figure.name}`}>
                                                <TableCell>{figure.name}</TableCell>
                                                <TableCell>
                                                    {figure.rawDataIds.length > 0 && (
                                                        <>
                                                            {figure.rawDataIds.map((rd) => (
                                                                <Chip key={`data-${figure.name}-${rd}`} label={`Raw Data ${rd}`} />
                                                            ))}
                                                        </>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                        )}
                        {setFigures && <Button aria-describedby="popover-new-figure" type="button" variant="outlined" onClick={(e) => { setPopoverAnchorEl(e.currentTarget); }}>Add Figure</Button>}
                        <Popover id="popover-new-figure" open={!!popoverAnchorEl} anchorEl={popoverAnchorEl}>
                            <NewFigure
                                availableRawData={availableRawData}
                                onCreated={(figureName, selectedRawDataIds) => {
                                    setFigures((oldFigures) => ([...oldFigures, {
                                        name: figureName,
                                        rawDataIds: selectedRawDataIds
                                    }]));
                                    setPopoverAnchorEl();
                                }}
                                onCancel={() => { setPopoverAnchorEl(); }}
                            />
                        </Popover>
                    </Section>
                    <div />
                    <ActionsWrapper>
                        {onSubmit && <Button type="submit" variant="outlined">Create</Button>}
                        {typeof onChainId === 'number' && (
                            <>
                                <Button type="button" variant="text" onClick={(e) => { setJournalPopoverAnchorEl(e.currentTarget); }}>Publish</Button>
                                <Popover id="popover-new-figure" open={!!journalPopoverAnchorEl} anchorEl={journalPopoverAnchorEl}>
                                    <Typography variant="body" component="div">Submit this paper to :</Typography>
                                    <Select label="Submit this paper to" value={submitPaperTo} onChange={(e) => { setSubmitPaperTo(e.target.value); }}>
                                        {journals.map((journal) => (
                                            <MenuItem key={`journal-${journal.issn}`} value={journal.onChainId}>{journal.title}</MenuItem>
                                        ))}
                                    </Select>
                                    <ActionsWrapper>
                                        <Button type="button" variant="outlined" onClick={submitPaper}>Submit</Button>
                                        <Button type="button" variant="text" onClick={() => { setJournalPopoverAnchorEl(); }}>Cancel</Button>
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

export function PaperNew({
    availableRawData, walletAddress, onCreate, onCreated
}) {
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('');
    const [figures, setFigures] = useState([]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (onCreate) {
            onCreate();
        }

        axios.post(`${DS_API_URL}/papers`, {
            wallet_address: walletAddress,
            title,
            organization,
            figures: JSON.stringify(figures)
        }).then((response) => {
            onCreated(response.data);
        });
    }, [walletAddress, title, organization, figures, onCreate, onCreated]);

    const propsThru = {
        title, setTitle, organization, setOrganization, figures, setFigures, onSubmit: handleSubmit, availableRawData
    };

    return (
        <PaperDetail {...propsThru} />
    );
}
