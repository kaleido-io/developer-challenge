import React, {
    useState, useEffect, useContext, useCallback
} from 'react';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import styled from 'styled-components';
import axios from 'axios';
import {
    Accordion, AccordionSummary, AccordionDetails, Button, Typography, CircularProgress, Paper, List, ListItem, TableCell, TableHead, TableRow, Select, MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CONFERENCE_API_URL, CONFERENCE_WALLET, DS_PORTAL_URL } from '../config';
import { UserContext, WhoAreYou } from '../contexts/UserContext';
import { Centered } from '../layouts/Centered';
import { dataReducer, ACTION_TYPES } from '../reducers/reducer';

const dataStore = configureStore({ reducer: dataReducer });

const Header = styled.div`
    font-family: "Roboto";
    font-weight: lighter;
    font-size: 32px;
    padding: 8px 0;
    border-bottom: 1px solid #aaa;
    margin-top: 48px;
    margin-bottom: 36px;
`;

const SectionHeader = styled.div`
    font-size: 18px;
    padding: 12px 0;
    border-top: 4px solid #444;
    border-bottom: 1px solid #444;
    margin-top: 36px;
    margin-bottom: 12px;
`;

const JournalTitle = styled.div`
    font-family: "Merriweather";
    font-size: 16px;
    .title {
        font-weight: bold;
    }
    .issn {
        font-size: 14px;
    }
`;

const PaperRow = styled(ListItem)`
    padding: 12px 24px;
    font-size: 14px;
    justify-content: space-between;

    &:not(:last-child) {
        border-bottom: 1px solid #aaa;
    }

    .title {
        font-weight: bold;
    }
`;

const PaperActions = styled.div`
    button:not(:last-child) {
        margin-right: 8px;
    }
`;

function Journal({
    onChainId, title, subjectArea, issn, papers, reviewedPapersSet
}) {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const submitReview = useCallback((paperId) => {
        setIsLoading(true);
        axios.post(`${CONFERENCE_API_URL}/review/${paperId}`, {
            wallet_address: user.walletAddress
        }).then(() => {
            setIsLoading(false);
        });
    }, []);

    const retractPaper = useCallback((journalId, paperId) => {
        setIsLoading(true);
        axios.post(`${CONFERENCE_API_URL}/journals/${journalId}/papers/${paperId}/retract`, {
            wallet_address: user.walletAddress
        }).then((response) => {
            setIsLoading(false);
        });
    }, []);

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <JournalTitle><span className="title">{title}</span> / {subjectArea} / <span className="issn">{issn}</span> / {papers.length} papers</JournalTitle>
            </AccordionSummary>
            <AccordionDetails>
                Papers ({papers.length})
                <List>
                    {papers.map((paper) => (
                        <PaperRow key={`paper-${onChainId}-${paper.onChainId}`}>
                            <div className="title">{paper.title}</div>
                            <div>by {paper.author}</div>
                            <a href={`${DS_PORTAL_URL}/paper/${paper.onChainId}`} target="_blank" rel="noreferrer">Link</a>
                            <PaperActions>
                                {reviewedPapersSet.has(paper.onChainId) && <span>Reviewed</span>}
                                {!isLoading && !reviewedPapersSet.has(paper.onChainId) && <Button type="button" variant="outlined" size="small" onClick={() => { submitReview(paper.onChainId); }}>Review</Button>}
                                {!isLoading && user.walletAddress === CONFERENCE_WALLET && <Button type="button" variant="outlined" size="small" color="warning" onClick={() => { retractPaper(onChainId, paper.onChainId); }}>Retract</Button>}
                                {isLoading && <CircularProgress />}
                            </PaperActions>
                        </PaperRow>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}

export function JournalCentralInner() {
    const { user } = useContext(UserContext);
    const journals = useSelector((state) => state.journals);
    const dispatch = useDispatch();
    const [reviewerProfile, setReviewerProfile] = useState();

    useEffect(() => {
        axios.get(`${CONFERENCE_API_URL}/journals`).then((response) => {
            if (response.data) {
                response.data.forEach((journal) => {
                    dispatch({
                        type: ACTION_TYPES.JOURNAL_CREATED,
                        newJournal: journal
                    });
                });
            }
        });
        axios.get(`${CONFERENCE_API_URL}/reviewer-profile?wallet_address=${user.walletAddress}`).then((response) => {
            if (response.data) {
                setReviewerProfile(response.data);
            }
        });
    }, []);

    return (
        <div className="conference">
            <Header>
                <div>Journal Central</div>
            </Header>
            <div>
                <Typography variant="body2">This is a place where you can see all journals, papers published in them, review and retract the papers.<br />*Reviews can be given by anybody.<br />*Retractions can be given by only the conference.</Typography>
            </div>
            <div>
                <SectionHeader>Journals</SectionHeader>
                {journals.map((journal) => (
                    <Journal key={`journal-${journal.issn}`} reviewedPapersSet={new Set(reviewerProfile?.papers.map((p) => p.onChainId))} {...journal} />
                ))}
            </div>
            {reviewerProfile && (
                <div>
                    <SectionHeader>My Reviewer Profile</SectionHeader>
                    <div style={{ marginBottom: '8px' }}>Score: {reviewerProfile.score} pts.</div>
                    <div>
                        Reviewed Papers ({reviewerProfile.papers.length})
                        <List>
                            {reviewerProfile.papers.map((paper) => (
                                <PaperRow key={`reviewed-paper-${paper.onChainId}`}>
                                    <div className="title">{paper.title}</div>
                                    <div>by {paper.author}</div>
                                </PaperRow>
                            ))}
                        </List>
                    </div>
                </div>
            )}
        </div>
    );
}

export function JournalCentral() {
    return (
        <Centered>
            <WhoAreYou>
                <ReduxProvider store={dataStore}>
                    <JournalCentralInner />
                </ReduxProvider>
            </WhoAreYou>
        </Centered>
    );
}
