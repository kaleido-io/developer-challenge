import React, {
    useContext, useEffect, useState, useCallback
} from 'react';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    Grid, Tabs, Tab, List, ListItemButton, ListItemText, Button, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';

import { DS_API_URL } from '../config';
import { DarkTheme } from '../Themes';
import { UserContext, WhoAreYou } from '../contexts/UserContext';
import { Centered } from '../layouts/Centered';
import { dataReducer, ACTION_TYPES } from '../reducers/reducer';
import { RawDataDetail, RawDataNew } from '../components/RawDataDetail';
import { PaperDetail, PaperNew } from '../components/PaperDetail';

const dataStore = configureStore({ reducer: dataReducer });

const APP_MODE = {
    RAW_DATA: 'rawData',
    PAPERS: 'papers'
};

const StyledGridContainer = styled(Grid)`
    min-height: 500px;
    padding-top: 48px;
`;

const StyledDataItemWrapper = styled(ListItemButton)`
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;

    &:not(:last-child) {
        margin-bottom: 12px;
    }
`;

const StyledListWrapper = styled(List)`
    padding: 24px;
`;

const FullWidthButton = styled(Button)`
    width: 100%;
`;

function RawDataItem({
    onChainId, dataType, onSelect, selected
}) {
    return (
        <StyledDataItemWrapper onClick={() => { onSelect(onChainId); }} selected={selected}>
            <ListItemText>RawData#{onChainId}</ListItemText>
            <Chip label={dataType} color="primary" size="small" />
        </StyledDataItemWrapper>
    );
}

function PaperItem({ onChainId, onSelect, selected }) {
    return (
        <StyledDataItemWrapper onClick={() => { onSelect(onChainId); }} selected={selected}>
            <ListItemText>Paper#{onChainId}</ListItemText>
        </StyledDataItemWrapper>
    );
}

function RawDataList({ rawData, onSelectObject }) {
    const [selected, setSelected] = useState();
    const handleSelect = useCallback((id) => {
        setSelected(id);
        onSelectObject(rawData.find((datum) => datum.onChainId === id));
    }, [setSelected, rawData]);

    return (
        <StyledListWrapper component="nav">
            {rawData.map((datum) => <RawDataItem key={`rd-${datum.onChainId}`} selected={selected === datum.onChainId} onSelect={handleSelect} {...datum} />)}
        </StyledListWrapper>
    );
}

function PapersList({ papers, onSelectObject }) {
    const [selected, setSelected] = useState();
    const handleSelect = useCallback((id) => {
        setSelected(id);
        onSelectObject(papers.find((paper) => paper.onChainId === id));
    }, [setSelected, papers]);

    return (
        <StyledListWrapper>
            {papers.map((paper) => <PaperItem key={`p-${paper.onChainId}`} selected={selected === paper.onChainId} onSelect={handleSelect} {...paper} />)}
        </StyledListWrapper>
    );
}

const StyledNavContainer = styled.div`
    text-align: center;
`;

function DataStudioInner() {
    const { user } = useContext(UserContext);
    const [mode, setMode] = useState(APP_MODE.RAW_DATA);
    const [currentObject, setCurrentObject] = useState();
    const [isCreating, setIsCreating] = useState(false);

    const rawData = useSelector((state) => state.rawData);
    const papers = useSelector((state) => state.papers);
    const journals = useSelector((state) => state.journals);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${DS_API_URL}/data?wallet_address=${user.walletAddress}`).then((response) => {
            if (response.data) {
                response.data.forEach((data) => {
                    dispatch({
                        type: ACTION_TYPES.RAWDATA_CREATED,
                        newRawData: data
                    });
                });
            }
        });
        axios.get(`${DS_API_URL}/papers?wallet_address=${user.walletAddress}`).then((response) => {
            if (response.data) {
                response.data.forEach((paper) => {
                    dispatch({
                        type: ACTION_TYPES.PAPER_CREATED,
                        newPaper: paper
                    });
                });
            }
        });
        axios.get(`${DS_API_URL}/journals?wallet_address=${user.walletAddress}`).then((response) => {
            if (response.data) {
                response.data.forEach((journal) => {
                    dispatch({
                        type: ACTION_TYPES.JOURNAL_CREATED,
                        newJournal: journal
                    });
                });
            }
        });
    }, [user]);

    const handleTabValueChange = useCallback((e, newValue) => {
        if (newValue === 0) {
            setMode(APP_MODE.RAW_DATA);
        } else {
            setMode(APP_MODE.PAPERS);
        }
        setCurrentObject();
        setIsCreating(false);
    }, [setMode, setCurrentObject]);

    return (
        <StyledGridContainer className="data-studio" container>
            <Grid sm={3} item>
                <StyledNavContainer bgColor="blue">
                    <Tabs value={mode === APP_MODE.RAW_DATA ? 0 : 1} onChange={handleTabValueChange} variant="fullWidth">
                        <Tab label="Raw Data" />
                        <Tab label="Papers" />
                    </Tabs>
                    {mode === APP_MODE.RAW_DATA && (
                        <>
                            <RawDataList rawData={rawData} onSelectObject={(obj) => { setCurrentObject(obj); setIsCreating(false); }} />
                            <FullWidthButton variant="outlined" startIcon={<AddIcon />} onClick={() => { setIsCreating(true); }}>Create Raw Data</FullWidthButton>
                        </>
                    )}
                    {mode === APP_MODE.PAPERS && (
                        <>
                            <PapersList papers={papers} onSelectObject={(obj) => { setCurrentObject(obj); setIsCreating(false); }} />
                            <FullWidthButton variant="outlined" startIcon={<AddIcon />} onClick={() => { setIsCreating(true); }}>Create Paper</FullWidthButton>
                        </>
                    )}
                </StyledNavContainer>
            </Grid>
            <Grid sm={9} item>
                {isCreating && mode === APP_MODE.RAW_DATA && (
                    <RawDataNew
                        walletAddress={user.walletAddress}
                        onCreated={(newRawData) => {
                            dispatch({
                                type: ACTION_TYPES.RAWDATA_CREATED,
                                newRawData
                            });
                            setIsCreating(false);
                        }}
                    />
                )}
                {isCreating && mode === APP_MODE.PAPERS && (
                    <PaperNew
                        availableRawData={rawData}
                        walletAddress={user.walletAddress}
                        onCreated={(newPaper) => {
                            dispatch({
                                type: ACTION_TYPES.PAPER_CREATED,
                                newPaper
                            });
                            setIsCreating(false);
                        }}
                    />
                )}
                {!isCreating && !!currentObject && mode === APP_MODE.RAW_DATA && <RawDataDetail user={user} {...currentObject} />}
                {!isCreating && !!currentObject && mode === APP_MODE.PAPERS && <PaperDetail user={user} journals={journals} {...currentObject} />}
            </Grid>
        </StyledGridContainer>
    );
}

export function DataStudio() {
    return (
        <DarkTheme>
            <Centered>
                <WhoAreYou>
                    <ReduxProvider store={dataStore}>
                        <DataStudioInner />
                    </ReduxProvider>
                </WhoAreYou>
            </Centered>
        </DarkTheme>
    );
}
