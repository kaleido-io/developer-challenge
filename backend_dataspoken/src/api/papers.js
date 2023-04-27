import { getSwaggerClients } from '../initialize';
import Paper from './models/paper';

export async function getPapers(caller) {
    const paperIds = await getPaperIds(caller);
    const papers = [];
    for (let i = 0; i < paperIds.length; i++) {
        const metadata = await getPaperMetadata(caller, paperIds[i]);
        const dbRecord = await getDbRecord(metadata.dsId);
        papers.push({
            ...metadata,
            figures: dbRecord.figures
        });
    }
    return papers;
}

async function getPaperIds(caller) {
    const { papers } = getSwaggerClients();
    const response = await papers.client.apis.default.getPaperIds_get({
        address: papers.contractAddress,
        'kld-from': caller,
        'kld-sync': 'true'
    });
    return response.body.output;
}

async function getPaperMetadata(caller, paperId) {
    const { papers } = getSwaggerClients();
    const response = await papers.client.apis.default.getMetadata_get({
        address: papers.contractAddress,
        id: paperId,
        'kld-from': caller,
        'kld-sync': 'true'
    });
    const metadata = response.body;

    return {
        onChainId: paperId,
        dsId: metadata.output,
        author: metadata.output1,
        title: metadata.output2,
        organization: metadata.output3
    };
}

export async function createPaper(caller, payload) {
    const newPaper = await createDbRecord({
        onChainId: -1,
        ...payload
    });

    const rawDataIds = extractRawDataIdsFromFigures(payload.figures);
    const { papers } = getSwaggerClients();
    const dsId = newPaper._id.toString();
    await papers.client.apis.default.create_post({
        address: papers.contractAddress,
        body: {
            dsId,
            data: rawDataIds,
            title: payload.title,
            organization: payload.organization
        },
        'kld-from': caller,
        'kld-sync': 'true'
    });

    const onChainIdResponse = await papers.client.apis.default.getPaperId_get({
        address: papers.contractAddress,
        dsId,
        'kld-from': caller,
        'kld-sync': 'true'
    });

    newPaper.onChainId = onChainIdResponse.body.output;
    await newPaper.save();
    
    return newPaper;
}

async function createDbRecord(payload) {
    const paper = new Paper(payload);
    return await paper.save();
}

async function getDbRecord(dsId) {
    const dbRecord = await Paper.findById(dsId);
    if (!dbRecord) {
        return {};
    }
    return dbRecord;
}

function extractRawDataIdsFromFigures(figures) {
    const rawDataIds = new Set();
    figures.forEach((figure) => {
        if (figure.rawDataIds.length > 0) {
            figure.rawDataIds.forEach((dataId) => {
                rawDataIds.add(dataId);
            });
        }
    });
    return Array.from(rawDataIds);
}