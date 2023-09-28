import queryApiBase from './queryApi';
import nsync from './nsync';

export const queryApi = nsync(queryApiBase);
