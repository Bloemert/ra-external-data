import ExternalData from './ExternalData';
import { EXTERNAL_DATA_REQUEST_SUCCEEDED, EXTERNAL_DATA_REQUEST_PENDING, EXTERNAL_DATA_REQUEST_FAILED } from './externalDataRequestState';
import externalDataReducer from './externalDataReducer';

export default ExternalData;
export { externalDataReducer, EXTERNAL_DATA_REQUEST_SUCCEEDED, EXTERNAL_DATA_REQUEST_PENDING, EXTERNAL_DATA_REQUEST_FAILED };
