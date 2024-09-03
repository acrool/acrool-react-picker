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

        <Select2Wrapper2>
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

        </Select2Wrapper2>



    </ExampleRoot>;
};

export default Example;


const Select2Wrapper = styled.div`
    position: fixed;
    top: 200px;
`;

const Select2Wrapper2 = styled.div`
    //position: fixed;
    //top: 200px;
`;

const ExampleRoot = styled.div`
    padding: 500px 0 500px 0;
`;


