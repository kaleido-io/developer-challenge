import { CONFERENCE_ADDRESS } from '../config';
import { getSwaggerClients } from '../initialize';
import { JOURNALS } from '../journals';

export async function createJournal(payload) {
    const { journals } = getSwaggerClients();
    await journals.client.apis.default.create_post({
        address: journals.contractAddress,
        body: payload,
        'kld-from': CONFERENCE_ADDRESS,
        'kld-sync': 'true'
    });
    return payload;
}

export async function getJournals() {
    const latestJournalId = await getLatestJournalId();
    const journals = [];
    for (let i = 0; i < latestJournalId; i++) {
        const journal = await getJournalMetadata(i);
        journal.papers = await getPapers(i);
        journals.push(journal);
    }
    return journals;
}

async function getLatestJournalId() {
    const { journals } = getSwaggerClients();
    const response = await journals.client.apis.default.getLatestJournalId_get({
        address: journals.contractAddress,
        'kld-from': CONFERENCE_ADDRESS,
        'kld-sync': 'true'
    });
    return response.body.output;
}

async function getJournalMetadata(journalId) {
    const { journals } = getSwaggerClients();
    const response = await journals.client.apis.default.getMetadata_get({
        address: journals.contractAddress,
        id: `${journalId}`,
        'kld-from': CONFERENCE_ADDRESS,
        'kld-sync': 'true'
    });
    const metadata = response.body;

    return {
        onChainId: journalId,
        title: metadata.output,
        subjectArea: metadata.output1,
        issn: metadata.output2
    };
}

async function getPapers(journalId) {
    const { journals, papers } = getSwaggerClients();
    const response = await journals.client.apis.default.getPapers_get({
        address: journals.contractAddress,
        id: `${journalId}`,
        'kld-from': CONFERENCE_ADDRESS,
        'kld-sync': 'true'
    });
    const paperIds = response.body.output;
    const paperMetadata = [];
    for (let i = 0; i < paperIds.length; i++) {
        const paperResponse = await papers.client.apis.default.getMetadata_get({
            address: papers.contractAddress,
            id: `${paperIds[i]}`,
            'kld-from': CONFERENCE_ADDRESS,
            'kld-sync': 'true'
        });
        paperMetadata.push({
            onChainId: paperIds[i],
            ...parsePaperOutput(paperResponse.body)
        });
    }

    return paperMetadata;
}

function parsePaperOutput(responseBody) {
    return {
        author: responseBody.output1,
        title: responseBody.output3,
        org: responseBody.output4
    };
}

export async function review(caller, paperId) {
    const { journals } = getSwaggerClients();
    await journals.client.apis.default.review_post({
        address: journals.contractAddress,
        body: {
            paperId
        },
        'kld-from': caller,
        'kld-sync': 'true'
    });
}

export async function getReviewerProfile(caller, reviewerAddress) {
    const { journals, papers } = getSwaggerClients();
    const response = await journals.client.apis.default.getReviewerInfo_get({
        address: journals.contractAddress,
        reviewer: reviewerAddress,
        'kld-from': caller,
        'kld-sync': 'true'
    });
    const score = response.body.score;
    const paperIds = response.body.papers;
    if (!paperIds || paperIds.length === 0) {
        return null;
    }
    const paperMetadata = [];
    for (let i = 0; i < paperIds.length; i++) {
        const paperResponse = await papers.client.apis.default.getMetadata_get({
            address: papers.contractAddress,
            id: `${paperIds[i]}`,
            'kld-from': CONFERENCE_ADDRESS,
            'kld-sync': 'true'
        });
        paperMetadata.push({
            onChainId: paperIds[i],
            ...parsePaperOutput(paperResponse.body)
        });
    }
    return {
        score,
        papers: paperMetadata
    };
}

export async function retract(caller, journalId, paperId) {
    const { journals } = getSwaggerClients();
    await journals.client.apis.default.retract_post({
        address: journals.contractAddress,
        body: {
            journalId,
            paperId
        },
        'kld-from': caller,
        'kld-sync': 'true'
    });
}

export async function setupInitialData() {
    try {
        // Throw an error if no journal exists
        await getLatestJournalId();
    } catch (ex) {
        JOURNALS.map(async (journal) => {
            console.info(`Setting up initial journals... ${journal.title}:${journal.issn}`);
            await createJournal(journal);
        });
    }
}

// export async function approveAccess(caller, rawDataId, to) {
//     const { rawData } = getSwaggerClients();

//     await rawData.client.apis.default.approveAccess_post({
//         address: rawData.contractAddress,
//         body: {
//             id: rawDataId,
//             to
//         },
//         'kld-from': caller,
//         'kld-sync': 'true'
//     });
// }
