import { Server as WsServer } from 'socket.io';
import mongoose from 'mongoose';
import archiver from 'archiver';
import Swagger from 'swagger-client';
import request from 'request-promise-native';
import { URL } from 'url';

import {
    MONGO_HOST, MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE,
    IO_NAMESPACE,
    DEPLOY_CONTRACTS, CONTRACT_CLASS_NAME_PAPERS, CONTRACT_CLASS_NAME_RAWDATA, CONTRACT_CLASS_NAME_JOURNALS,
    CONTRACT_ADDRESS_RAWDATA, CONTRACT_ADDRESS_PAPERS, CONTRACT_ADDRESS_JOURNALS,
    CONFERENCE_ADDRESS,
    KALEIDO_AUTH_PASSWORD, KALEIDO_AUTH_USERNAME, KALEIDO_REST_GATEWAY_URL, OWNER_WALLET } from './config';

let mongoClient;
let io;
let swaggerClientRawData, swaggerClientPapers, swaggerClientJournals;
let contractAddressRawData, contractAddressPapers, contractAddressJournals;

export async function initializeMongoClient() {
    await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`);
    mongoClient = mongoose.connection.client;
}

export function getMongoClient() {
    if (!mongoClient) {
        throw 'MongoDB client not initialized';
    }
    return mongoClient;
}

export async function initializeSocketIO(server) {
    io = new WsServer(server, {
        cors: {
            methods: ['GET', 'POST'],
            transports: ['websocket'],
            credentials: true
        },
        path: IO_NAMESPACE
    });
}

export function getSocketIO() {
    if (!io) {
        throw 'SocketIO not initialized';
    }
    return io;
}

export async function initializeSwaggerClients() {
    if (DEPLOY_CONTRACTS) {
        swaggerClientRawData = await createSwaggerClient(`${CONTRACT_CLASS_NAME_RAWDATA}.sol`, `${CONTRACT_CLASS_NAME_RAWDATA}.sol:${CONTRACT_CLASS_NAME_RAWDATA}`);
        contractAddressRawData = await deployContract(swaggerClientRawData, {});
        swaggerClientPapers = await createSwaggerClient(`${CONTRACT_CLASS_NAME_PAPERS}.sol`, `${CONTRACT_CLASS_NAME_PAPERS}.sol:${CONTRACT_CLASS_NAME_PAPERS}`);
        contractAddressPapers = await deployContract(swaggerClientPapers, { rawDataContractAddress: contractAddressRawData });
        swaggerClientJournals = await createSwaggerClient(`${CONTRACT_CLASS_NAME_JOURNALS}.sol`, `${CONTRACT_CLASS_NAME_JOURNALS}.sol:${CONTRACT_CLASS_NAME_JOURNALS}`);
        contractAddressJournals = await deployContract(swaggerClientJournals, { papersContractAddress: contractAddressPapers, conference: CONFERENCE_ADDRESS });
    } else {
        contractAddressRawData = CONTRACT_ADDRESS_RAWDATA;
        contractAddressPapers = CONTRACT_ADDRESS_PAPERS;
        contractAddressJournals = CONTRACT_ADDRESS_JOURNALS;
        await loadSwaggerAPIs();
    }
}

export function getSwaggerClients() {
    if (!swaggerClientRawData || !swaggerClientPapers || !swaggerClientJournals) {
        throw 'Swagger clients not initialized';
    }

    return {
        rawData: {
            client: swaggerClientRawData,
            contractAddress: contractAddressRawData
        },
        papers: {
            client: swaggerClientPapers,
            contractAddress: contractAddressPapers
        },
        journals: {
            client: swaggerClientJournals,
            contractAddress: contractAddressJournals
        }
    };
}

async function createSwaggerClient(sourceFile, contractName) {
    var archive = archiver('zip');
    archive.directory('contracts', '');
    await archive.finalize();

    const url = new URL(KALEIDO_REST_GATEWAY_URL);
    url.username = KALEIDO_AUTH_USERNAME;
    url.password = KALEIDO_AUTH_PASSWORD;
    url.pathname = '/abis';

    const abiResponse = await request.post({
        url: url.href,
        qs: {
            compiler: '0.5', // Compiler version
            source: sourceFile, // Name of the file in the directory
            contract: contractName // Name of the contract in the 
        },
        json: true,
        headers: {
            'content-type': 'multipart/form-data',
        },
        formData: {
            file: {
                value: archive,
                options: {
                    filename: 'smartcontract.zip',
                    contentType: 'application/zip',
                    knownLength: archive.pointer()
                }
            }
        }
    });
    
    url.pathname = abiResponse.path;
    url.search = '?ui';
    console.info(`Generated ${contractName} REST API: ${url}`);

    return await Swagger(abiResponse.openapi, {
        requestInterceptor: req => {
            req.headers.authorization = `Basic ${Buffer.from(`${KALEIDO_AUTH_USERNAME}:${KALEIDO_AUTH_PASSWORD}`).toString('base64')}`;
        }
    });
}

async function deployContract(swaggerClient, constructorParams) {
    try {
        const deployResponse = await swaggerClient.apis.default.constructor_post({
            body: constructorParams,
            'kld-from': OWNER_WALLET,
            'kld-sync': 'true'
        });
        console.info('Deployed instance: ' + deployResponse.body.contractAddress);
        return deployResponse.body.contractAddress;
    } catch (err) {
        console.error('Could not deploy the contract', err);
    }
}

async function loadSwaggerAPIs() {
    console.info('Loading Swagger REST APIs from the deployed contracts');
    const url = new URL(KALEIDO_REST_GATEWAY_URL);
    url.username = KALEIDO_AUTH_USERNAME;
    url.password = KALEIDO_AUTH_PASSWORD;
    url.pathname = '/contracts';

    const abiResponse = await request.get({
        url: url.href
    });
    const contracts = JSON.parse(abiResponse);

    const contractInfoRawData = contracts.find((contractInfo) => contractAddressRawData.toLowerCase().indexOf(contractInfo.address.toLowerCase()) >= 0);
    const contractInfoPapers = contracts.find((contractInfo) => contractAddressPapers.toLowerCase().indexOf(contractInfo.address.toLowerCase()) >= 0);
    const contractInfoJournals = contracts.find((contractInfo) => contractAddressJournals.toLowerCase().indexOf(contractInfo.address.toLowerCase()) >= 0);

    if (!contractInfoRawData || !contractInfoPapers || !contractInfoJournals) {
        throw 'Could not retrieve contract info';
    }

    swaggerClientRawData = await Swagger(contractInfoRawData.openapi, {
        requestInterceptor: req => {
            req.headers.authorization = `Basic ${Buffer.from(`${KALEIDO_AUTH_USERNAME}:${KALEIDO_AUTH_PASSWORD}`).toString('base64')}`;
        }
    });

    swaggerClientPapers = await Swagger(contractInfoPapers.openapi, {
        requestInterceptor: req => {
            req.headers.authorization = `Basic ${Buffer.from(`${KALEIDO_AUTH_USERNAME}:${KALEIDO_AUTH_PASSWORD}`).toString('base64')}`;
        }
    });

    swaggerClientJournals = await Swagger(contractInfoJournals.openapi, {
        requestInterceptor: req => {
            req.headers.authorization = `Basic ${Buffer.from(`${KALEIDO_AUTH_USERNAME}:${KALEIDO_AUTH_PASSWORD}`).toString('base64')}`;
        }
    });
}