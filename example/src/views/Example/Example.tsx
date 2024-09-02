import {useState} from 'react';

import Select2 from '../../components/Select2';
import styled from 'styled-components';


const Example = () => {
    const [value, setValue] = useState<string>('A');


    return <ExampleRoot>

        <Select2Wrapper>
            <Select2
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
            />

        </Select2Wrapper>


    </ExampleRoot>;
};

export default Example;


const Select2Wrapper = styled.div`
    position: fixed;
    top: 500px;
`;

const ExampleRoot = styled.div`
    padding: 900px 0 1200px 0;
`;


