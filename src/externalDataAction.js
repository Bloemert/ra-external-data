export const EXTERNAL_DATA_RECEIVED = 'EXTERNAL_DATA_RECEIVED';

export default (data) => ({ 
    type: EXTERNAL_DATA_RECEIVED,
    payload: data
});

