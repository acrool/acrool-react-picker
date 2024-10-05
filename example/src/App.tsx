
import './App.css';
import Example from './views/Example';
import Banner from './components/organize/Banner';
import {GridThemeProvider} from '@acrool/react-grid';

import {ModalPortal as OriginModalPortal} from '@acrool/react-modal';


function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>
                <Example/>

            </div>

            <OriginModalPortal
            />
        </GridThemeProvider>
    );

}

export default App;
