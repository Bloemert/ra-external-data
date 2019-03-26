# ra-external-data
External data component for React Admin.

## Description
This component enables you to load external json formatted data into your React Admin app easily and use the external data seamlessly with
standard React Admin field components.

## Installation
`npm install ra-external-data
`

## Usage
After adding the package to your React Admin app, you must register the `externalDataReducer` in your App as 
a custom reducer:

```javascript
import { externalDataReducer } from 'ra-external-data';

const App = () => (
  <Admin customReducers={{externalDataReducer}}>
	/* your resources here */
  </Admin>  
);
```

### Basic example - single record
The following example illustrates how to use the component in its simplest form:

```javascript
import React from 'react';
import { SimpleShowLayout, BooleanField, TextField } from 'react-admin';
import ExternalData from 'ra-external-data';

const ExternalDataExample = () =>
    <ExternalData url="https://jsonplaceholder.typicode.com/todos/1">
        <SimpleShowLayout>            
            <TextField source="title" />
            <BooleanField source="completed" />
        </SimpleShowLayout>
    </ExternalData>;

export default ExternalDataExample
```

As you can see, inside the `ExternalData` component you can use React Admin's field components as if you are working with your
own API and default provider. This is because the component replaces React Admin's record with the data that was retrieved
from the external resource. 

### Basic example - multiple records
You can also use resources that return a list, using React Admin's `ArrayField` component:

```javascript
import React from 'react';
import { SimpleShowLayout, ArrayField, Datagrid, BooleanField, TextField } from 'react-admin';
import ExternalData from 'ra-external-data';

const ExternalDataExample = () =>
    <ExternalData url="https://jsonplaceholder.typicode.com/todos">
        <SimpleShowLayout>  
            <ArrayField source="records">
                <Datagrid>
                    <TextField source="title" />
                    <BooleanField source="completed" />
                </Datagrid>
            </ArrayField>          
        </SimpleShowLayout>
    </ExternalData>;

export default ExternalDataExample
```

As you can see, if the `ExternalData` component detects the data returned is an array instead of a single object, the record 
will contain a `records` property holding all the returned records.

### Handling request states
The `ExternalData` component will start fetching data at `componentDidMount()` time, and emit various states while fetching the data:
- EXTERNAL_DATA_REQUEST_PENDING
- EXTERNAL_DATA_REQUEST_SUCCEEDED
- EXTERNAL_DATA_REQUEST_FAILED

You can set the `requestState` property on children of the `ExternalData` component to control what is displayed during the various request states:

```javascript
import React from 'react';
import { SimpleShowLayout, ArrayField, Datagrid, BooleanField, TextField } from 'react-admin';
import ExternalData from 'ra-external-data';

const ExternalDataExample = () =>
    <ExternalData url="https://jsonplaceholder.typicode.com/todos">
        <SimpleShowLayout requestState={EXTERNAL_DATA_REQUEST_PENDING}>
            <span>Processing request...</span>
        </SimpleShowLayout>
        <SimpleShowLayout requestState={EXTERNAL_DATA_REQUEST_SUCCEEDED}>  
            <ArrayField source="records">
                <Datagrid>
                    <TextField source="title" />
                    <BooleanField source="completed" />
                </Datagrid>
            </ArrayField>          
        </SimpleShowLayout>
        <SimpleShowLayout requestState={EXTERNAL_DATA_REQUEST_FAILED}>
            <span>Something went wrong!</span>
        </SimpleShowLayout>
    </ExternalData>;

export default ExternalDataExample
```

If you do not set the requestState property, the child element will always be displayed.

**Note:** you can only set the requestState property on direct descendants (children) of the `ExternalData` component. The `ExternalData` component does not parse the entire tree for this property.

### Using a custom client
By default, the `ExternalData` uses React-Admin's `fetchUtils` to fetch the data for you. You might need more control over the request however, for instance, you might need to pass a security token or api key as a header in the request. For these scenarios, the `ExternalData` component allows you to pass a custom http client using the `client` property. The following example shows how to pass a custom client to the `ExternalData` component that adds a `Authorization` header to the request containing a token that was stored in `localStorage` earlier:

```javascript
import React from 'react';
import { fetchUtils, SimpleShowLayout, BooleanField, TextField } from 'react-admin';
import ExternalData from 'ra-external-data';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  }

const ExternalDataExample = () =>
    <ExternalData url="https://jsonplaceholder.typicode.com/todos/1" client={httpClient}>        
        <SimpleShowLayout>  
            <TextField source="title" />
            <BooleanField source="completed" />
        </SimpleShowLayout>
    </ExternalData>;

export default ExternalDataExample
```

## Known issues
- You cannot use multiple `ExternalData` components on a single page, unless you intend them all to display the same data.