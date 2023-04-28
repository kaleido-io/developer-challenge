import fs from 'fs';
import crypto from 'crypto';

import { DATA_HASH_ALGORITHM } from '../config';
import { getSwaggerClients } from '../initialize';
import RawData from './models/raw-data';

export async function getRawData(caller) {
    const rawDataIds = await getRawDataIds(caller);
    const rawData = [];
    for (let i = 0; i < rawDataIds.length; i++) {
        rawData.push(await getRawDataMetadata(caller, rawDataIds[i]));
    }
    return rawData;
}

async function getRawDataIds(caller) {
    const { rawData } = getSwaggerClients();
    const response = await rawData.client.apis.default.getRawDataIds_get({
        address: rawData.contractAddress,
        'kld-from': caller,
        'kld-sync': 'true'
    });
    return response.body.output;
}

async function getRawDataMetadata(caller, rawDataId) {
    const { rawData } = getSwaggerClients();
    const response = await rawData.client.apis.default.getMetadata_get({
        address: rawData.contractAddress,
        id: `${rawDataId}`,
        'kld-from': caller,
        'kld-sync': 'true'
    });
    const metadata = response.body;

    return {
        onChainId: parseInt(rawDataId),
        createdBy: metadata.output,
        dataType: metadata.output2,
        description: metadata.output3,
        dataHash: metadata.output4
    };
}

export async function createRawData(caller, file, metadata) {
    const tempFilepath = file.path;
    const dataHash = getHashFromFile(tempFilepath);
    fs.renameSync(tempFilepath, getFilepath(dataHash));

    const newRawData = await createDbRecord({
        onChainId: -1,
        createdBy: caller,
        dataType: metadata.dataType,
        description: metadata.description,
        dataHash        
    });
    
    const { rawData } = getSwaggerClients();
    const dsId = newRawData._id.toString();
    await rawData.client.apis.default.create_post({
        address: rawData.contractAddress,
        body: {
            dsId,
            dataType: metadata.dataType,
            dataHash,
            description: metadata.description
        },
        'kld-from': caller,
        'kld-sync': 'true'
    });

    const onChainIdResponse = await rawData.client.apis.default.getRawDataId_get({
        address: rawData.contractAddress,
        dsId,
        'kld-from': caller,
        'kld-sync': 'true'
    });

    newRawData.onChainId = onChainIdResponse.body.output;
    await newRawData.save();
    
    return newRawData;
}

export async function approveAccess(caller, rawDataId, to) {
    const { rawData } = getSwaggerClients();

    await rawData.client.apis.default.approveAccess_post({
        address: rawData.contractAddress,
        body: {
            id: rawDataId,
            to
        },
        'kld-from': caller,
        'kld-sync': 'true'
    });
}

export async function getFileStream(caller, rawDataId) {
    const { dataHash } = await getRawDataMetadata(caller, rawDataId);
    if (!fs.existsSync(getFilepath(dataHash))) {
        return null;
    }
    const currentDataHash = getHashFromFile(getFilepath(dataHash));
    if (dataHash !== currentDataHash) {
        return null;
    }
    const readStream = fs.createReadStream(getFilepath(dataHash));
    return readStream;
}

async function createDbRecord(payload) {
    const rawData = new RawData(payload);
    return await rawData.save();
}

function getFilepath(dataHash) {
    return `${__dirname}/../../datafiles/${dataHash}`;
}

function getHashFromFile(filepath) {
    const fileBuffer = fs.readFileSync(filepath);
    const hashSum = crypto.createHash(DATA_HASH_ALGORITHM);
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}