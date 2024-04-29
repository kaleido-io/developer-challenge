import FireFly, { FireFlyContractAPIResponse } from '@hyperledger/firefly-sdk';
import { v4 as uuidv4 } from 'uuid';

export const KEY = process.env.KEY;
const PORT = process.env.FFPORT ?? '5000';
const HOST = 'http://localhost:';
export const NAME = uuidv4();
export const NAMESPACE = 'default';
export const APINAME = '0f69758c-574g-9b87-598b-e0d5596996fc'; // this is the contract name, edit to redeploy
export let CONTRACTINFO: FireFlyContractAPIResponse | undefined;

const firefly = new FireFly({
    host: HOST + PORT,
    namespace: NAMESPACE,
});

export const getInfo = async () => {
    CONTRACTINFO = await firefly.getContractAPI(APINAME);
    // const status = await firefly.getStatus();
    // console.log('status: ', status);
    // const identities = await firefly.getIdentities();
    // console.log('identities: ', identities);
    // const nodes = await firefly.getNodes();
    // console.log('nodes: ', nodes);
    // const orgs = await firefly.getOrganizations();
    // console.log('orgs: ', orgs);
    // const namespaces = await firefly.getNamespaces();
    // console.log('namespaces: ', namespaces);
    // const verifiers = await firefly.getVerifiers();
    // console.log('verifiers: ', verifiers);
    // const datatypes = await firefly.getDatatypes();
    // console.log('datatypes: ', datatypes);
    // const subscriptions = await firefly.getSubscriptions();
    // console.log('subscriptions: ', subscriptions);
    // const messages = await firefly.getMessages();
    // console.log('messages: ', messages);
    // const tokenPools = await firefly.getTokenPools();
    // console.log('tokenPools: ', tokenPools);
    // const tokenTransfers = await firefly.getTokenTransfers();
    // console.log('tokenTranfers:', tokenTransfers);
    // const tokenBalances = await firefly.getTokenBalances();
    // console.log('tokenBalances: ', tokenBalances);
};
getInfo();

export default firefly;
