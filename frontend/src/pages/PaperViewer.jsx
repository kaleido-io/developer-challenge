import React, {
    useEffect, useState, useContext, useMemo
} from 'react';
import { useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import {
    Fab, Modal, Fade, Box, Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import styled from 'styled-components';
import axios from 'axios';

import { DS_API_URL } from '../config';
import { UserContext, WhoAreYou } from '../contexts/UserContext';
import { Centered } from '../layouts/Centered';

const StyledFab = styled(Fab)`
    position: absolute;
    right: 50px;
    bottom: 50px;
`;

const RAW_DATA_LINK_BASE = 'http://localhost:4001/api/data';

const MIN_TITLE_WORDS = 8;
const MAX_TITLE_WORDS = 12;
const MIN_ABSTRACT_WORDS = 100;
const MAX_ABSTRACT_WORDS = 180;
const MIN_AUTHORS = 1;
const MAX_AUTHORS = 4;
const MIN_BODY_PAGES = 3;
const MAX_BODY_PAGES = 6;
const MIN_BODY_PAGE_WORDS = 700;
const MAX_BODY_PAGE_WORDS = 800;
const FIGURE_SIZE_IN_CHARACTERS = 1000;
const FIGURE_IMG_WIDTH = 300;
const FIGURE_IMG_HEIGHT = 200;

function getRandomNumber(min, max) {
    return min + parseInt(Math.random() * (max - min + 1));
}

function useRandomResearch(paper) {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [abstract, setAbstract] = useState('');
    const [body, setBody] = useState([]);

    useEffect(() => {
        if (!paper) {
            return;
        }
        if (paper.title) {
            setTitle(paper.title);
        } else {
            // Generate title
            const numTitleWords = getRandomNumber(MIN_TITLE_WORDS, MAX_TITLE_WORDS);
            setTitle(faker.lorem.sentence(numTitleWords).replace('.', ''));
        }
        // Generate authors
        const numAuthors = getRandomNumber(MIN_AUTHORS, MAX_AUTHORS);
        const generatedAuthors = [];
        for (let i = 0; i < numAuthors; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            generatedAuthors.push({
                name: `${firstName} ${lastName}`,
                organization: faker.company.name(),
                city: `${faker.address.cityName()}, ${faker.address.country()}`,
                email: faker.internet.email(firstName, lastName)
            });
        }
        if (paper.organization) {
            generatedAuthors[0].organization = paper.organization;
        }
        setAuthors(generatedAuthors);
        // Generate abstract
        const numAbstractWords = getRandomNumber(MIN_ABSTRACT_WORDS, MAX_ABSTRACT_WORDS);
        setAbstract(faker.lorem.sentence(numAbstractWords));
        // Generate body
        const numFigures = paper.figures ? paper.figures.length : 0;
        const numBodyPages = getRandomNumber(Math.max(MIN_BODY_PAGES, numFigures + 1), MAX_BODY_PAGES);
        const generatedBodyPages = [];
        for (let i = 0; i < numBodyPages; i++) {
            const numBodyPageWords = getRandomNumber(MIN_BODY_PAGE_WORDS, MAX_BODY_PAGE_WORDS);
            if (i === 0) {
                generatedBodyPages.push({
                    text: faker.lorem.sentence(parseInt(numBodyPageWords / 2)),
                    figure: null
                });
            } else {
                const page = {
                    text: faker.lorem.sentence(numBodyPageWords)
                };
                if (i <= numFigures) {
                    page.figure = paper.figures[i - 1];
                }
                generatedBodyPages.push(page);
            }
        }
        setBody(generatedBodyPages);
    }, [paper]);

    return {
        title,
        authors,
        abstract,
        body
    };
}

function PageInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <StyledFab color="primary" onClick={() => { setIsModalOpen(true); }}><InfoIcon />
            </StyledFab>
            <Modal
                open={isModalOpen}
                onClose={() => { setIsModalOpen(false); }}
            >
                <Fade in={isModalOpen}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper'
                    }}
                    >
                        <div>About this page:</div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

const Title = styled(Typography)`
    margin: 64px 0;
    padding: 0 24px;
    text-align: center;
`;

const Authors = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 48px;

    .author {
        max-width: 300px;
        font-size: 14px;
        .name {
            font-size: 18px;
        }
        > div:not(:last-child) {
            margin-bottom: 4px;
        }
    }
`;

const Abstract = styled.div`
    text-align: center;
    margin-bottom: 42px;
    div:first-child {
        margin-bottom: 16px;
    }
    .body {
        text-align: justify;
        font-size: 14px;
    }
`;

const Body = styled.div`
    line-height: 1.5;
    > div:not(:last-child) {
        margin-bottom: 96px;
    }

`;

const FigureContainer = styled.div`
    display: block;
    width: 100%;
    text-align: center;
    padding: 32px;

    img {
        margin: 12px;
    }

    .rawdata-verification {
        width: 100%;
        padding: 4px;
        margin-top: 8px;

        .ds-title {
            font-size: 14px;
            background-color: #222;
            color: #fff;
        }
        .ds-links {
            display: flex;
            justify-content: space-around;
            padding-top: 4px;
            
            a {
                font-family: Roboto;
                &:visited {
                    color: blue;
                }
            }
        }
    }
`;

function RawDataList({ rawDataIds, user }) {
    return (
        <div className="rawdata-verification">
            <div className="ds-title">DataSpoken&trade; Data Verification</div>
            <div className="ds-links">
                {rawDataIds.map((dataId) => (
                    <a key={`rd-${dataId}`} href={`${RAW_DATA_LINK_BASE}/${dataId}/file?wallet_address=${user.walletAddress}`} target="_blank" rel="noreferrer">Data {dataId}</a>
                ))}
            </div>
        </div>
    );
}

function Figure({ name, rawDataIds, user }) {
    return (
        <FigureContainer>
            <img alt={name || 'figure'} src={faker.image.abstract(FIGURE_IMG_WIDTH, FIGURE_IMG_HEIGHT, true)} />
            <div>{name || 'Figure ___'}</div>
            {rawDataIds && rawDataIds.length > 0 && <RawDataList rawDataIds={rawDataIds} user={user} />}
        </FigureContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    gap: 24px;
    text-align: justify;
    font-size: 16px;

    div {
        flex-grow: 1;
        flex-basis: 50%;
    }
`;

function Page({ text, figure, user }) {
    const figurePlacement = useMemo(() => (Math.random() > 0.5 ? 'left' : 'right'), []);
    const contentLeft = useMemo(() => {
        if (figure && figurePlacement === 'left') {
            const numCharacters = parseInt(text.length / 2) - FIGURE_SIZE_IN_CHARACTERS;
            const splitPosition = parseInt(numCharacters * Math.random());
            return (
                <>
                    <div>{text.substring(0, splitPosition)}</div>
                    <Figure user={user} {...figure} />
                    <div>{text.substring(splitPosition, numCharacters)}</div>
                </>
            );
        }
        const numCharacters = parseInt(text.length / 2);
        return (
            <div>{text.substring(0, numCharacters)}</div>
        );
    }, [text, figure, figurePlacement]);

    const contentRight = useMemo(() => {
        if (figure && figurePlacement === 'right') {
            const numCharacters = parseInt(text.length / 2);
            const splitPosition = parseInt((numCharacters - FIGURE_SIZE_IN_CHARACTERS) * Math.random());
            return (
                <>
                    <div>{text.substring(numCharacters + FIGURE_SIZE_IN_CHARACTERS, numCharacters + FIGURE_SIZE_IN_CHARACTERS + splitPosition)}</div>
                    <Figure user={user} {...figure} />
                    <div>{text.substring(numCharacters + FIGURE_SIZE_IN_CHARACTERS + splitPosition)}</div>
                </>
            );
        }
        const numCharacters = parseInt(text.length / 2);
        return (
            <div>{text.substring(numCharacters, 0)}</div>
        );
    }, [text, figure, figurePlacement]);

    return (
        <PageContainer>
            <div>{contentLeft}</div>
            <div>{contentRight}</div>
        </PageContainer>
    );
}

function Paper({ paper, user }) {
    const {
        title, authors, abstract, body
    } = useRandomResearch(paper);
    return (
        <div>
            <Title variant="h3" component="div">{title}</Title>
            <Authors>
                {authors.map((author) => (
                    <div key={`author-${author.name.replace(' ', '_')}`} className="author">
                        <div className="name">{author.name}</div>
                        <div>{author.organization}</div>
                        <div>{author.city}</div>
                        <div>{author.email}</div>
                    </div>
                ))}
            </Authors>
            <Abstract>
                <Typography variant="h5" component="div">Abstract</Typography>
                <div className="body">{abstract}</div>
            </Abstract>
            <Body>
                {body.map((page, idx) => (
                    <Page key={`page-${idx}`} user={user} {...page} />
                ))}
            </Body>
        </div>
    );
}

function PaperViewerInner() {
    const { user } = useContext(UserContext);
    const { paperId } = useParams();
    const [paper, setPaper] = useState();
    useEffect(() => {
        axios.get(`${DS_API_URL}/papers/${paperId}?wallet_address=${user.walletAddress}`).then((response) => {
            if (response.data) {
                setPaper(response.data);
            }
        });
    }, [paperId, user]);

    return (
        <div className="paper-viewer">
            <Paper paper={paper} user={user} />
            <PageInfo />
        </div>
    );
}

export function PaperViewer() {
    return (
        <Centered>
            <WhoAreYou>
                <PaperViewerInner />
            </WhoAreYou>
        </Centered>
    );
}
