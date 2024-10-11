
import './App.css';

import {GridThemeProvider} from '@acrool/react-grid';
import {ModalPortal as OriginModalPortal} from '@acrool/react-modal';

import Banner from './components/organize/Banner';
import Example from './views/Example';


function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>
                <Example/>

            </div>

            <OriginModalPortal/>
        </GridThemeProvider>
    );

}

export default App;
