import { cloneElement, Children, Component } from 'react';
import { fetchUtils } from 'react-admin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import externalDataAction from './externalDataAction';
import { EXTERNAL_DATA_REQUEST_SUCCEEDED, EXTERNAL_DATA_REQUEST_PENDING, EXTERNAL_DATA_REQUEST_FAILED } from './externalDataRequestState';

class ExternalData extends Component {
    componentDidMount() {
        var httpClient = this.props.client || ((url, options = {}) => fetchUtils.fetchJson(url, options));

        const url = this.props.url;
        if (url) {
            this.props.externalDataAction({ requestState: EXTERNAL_DATA_REQUEST_PENDING });

            httpClient(url)
            .then(response => response.json)
            .then(result => {
                if (result) {
                    const record = Array.isArray(result) ? { records: result } : result;
                    record.id = this.id;
                    record.requestState = EXTERNAL_DATA_REQUEST_SUCCEEDED;
                                     
                    this.props.externalDataAction(record);  
                }
                else {
                    this.props.externalDataAction({ requestState: EXTERNAL_DATA_REQUEST_FAILED });
                }                    
            })
            .catch(() => this.props.externalDataAction({ requestState: EXTERNAL_DATA_REQUEST_FAILED }));
        }
    }

    render() {     
        const {
            children,
            record,
        } = this.props;

        return Children.map(children, input => (
                input.props.requestState === undefined || input.props.requestState === this.props.requestState ? cloneElement(input, { record }) : null
            ))
    };
}

ExternalData.propTypes = {
    externalDataReceived: PropTypes.func,
    requestState: PropTypes.number,
    record: PropTypes.object
};

const mapStateToProps = state => {
    return ({ requestState: state.externalDataReducer.requestState, record: state.externalDataReducer });
};

export default connect(mapStateToProps, { externalDataAction })(ExternalData)
