import { EXTERNAL_DATA_RECEIVED } from './externalDataAction';
import { EXTERNAL_DATA_REQUEST_PENDING } from './externalDataRequestState';

export default (previousState = { requestState: EXTERNAL_DATA_REQUEST_PENDING }, { type, payload }) => {    
    if (type === EXTERNAL_DATA_RECEIVED) {
        if (payload) {
            return payload;
        }
    }
    return previousState;
}
