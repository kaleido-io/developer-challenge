import Swagger from 'swagger-client';
import request from 'request-promise-native';
import { URL } from 'url';

import {
    CONTRACT_ADDRESS_RAWDATA, CONTRACT_ADDRESS_PAPERS, CONTRACT_ADDRESS_JOURNALS,
    KALEIDO_AUTH_PASSWORD, KALEIDO_AUTH_USERNAME, KALEIDO_REST_GATEWAY_URL } from './config';

let swaggerClientRawData, swaggerClientPapers, swaggerClientJournals;
let contractAddressRawData, contractAddressPapers, contractAddressJournals;

export async function initializeSwaggerClients() {
    contractAddressRawData = CONTRACT_ADDRESS_RAWDATA;
    contractAddressPapers = CONTRACT_ADDRESS_PAPERS;
    contractAddressJournals = CONTRACT_ADDRESS_JOURNALS;
    await loadSwaggerAPIs();
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