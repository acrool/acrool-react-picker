import AcroolTable from '@acrool/react-table';
import {useState} from 'react';

import Select2 from '../../components/Select2';


const Example = () => {
    const [value, setValue] = useState<string>('A');


    return <div style={{display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%', paddingTop: '200px', paddingBottom: '1500px'}}>

        <AcroolTable
            isDark
            isVisiblePaginate={false}
            tableCellMediaSize={768}
            gap="10px"
            title={{
                name: {text: 'Name', col: '200px'},
                use: {text: 'Use', col: true},
            }}
            data={[
                {
                    id: 1,
                    field: {
                        name: 'Default',
                        use: <Select2
                            value={value}
                            options={[
                                {text: 'Apple', value: 'A'},
                                {text: 'Basic', value: 'B'},
                                {text: 'Cat & Car', value: 'C'},
                                {text: 'Dog & Desk', value: 'D'},
                                {text: 'Element', value: 'E'},
                                {text: 'Fake', value: 'F'},
                                {text: 'Google', value: 'G'},
                            ]}
                            onChange={newValue => setValue(newValue)}
                        />,
                    }
                },

            ]}

        />


    </div>;
};

export default Example;




