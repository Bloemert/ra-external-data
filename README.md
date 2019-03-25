# ra-external-data
External data component for React Admin.

## Description
This component enables you to load external data into your React Admin app easily and use the external data seamlessly with
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