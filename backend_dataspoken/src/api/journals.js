import { CONFERENCE_ADDRESS } from '../config';
import { getSwaggerClients } from '../initialize';

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

export async function getJournals(caller) {
    const latestJournalId = await getLatestJournalId(caller);
    const journals = [];
    for (let i = 0; i < latestJournalId; i++) {
        journals.push(await getJournalMetadata(caller, i));
    }
    return journals;
}

async function getLatestJournalId(caller) {
    const { journals } = getSwaggerClients();
    const response = await journals.client.apis.default.getLatestJournalId_get({
        address: journals.contractAddress,
        'kld-from': caller,
        'kld-sync': 'true'
    });
    return response.body.output;
}

async function getJournalMetadata(caller, journalId) {
    const { journals } = getSwaggerClients();
    const response = await journals.client.apis.default.getMetadata_get({
        address: journals.contractAddress,
        id: `${journalId}`,
        'kld-from': caller,
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
