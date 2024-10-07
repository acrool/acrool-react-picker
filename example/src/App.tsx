
import './App.css';

import {GridThemeProvider} from '@acrool/react-grid';
// import {HotkeyScopeManagerProvider} from '@acrool/react-hotkey';
import {ModalPortal as OriginModalPortal} from '@acrool/react-modal';

import Banner from './components/organize/Banner';
import Example from './views/Example';


function App() {
    return (
        <GridThemeProvider>
            {/*<HotkeyScopeManagerProvider>*/}
            
            <div className="App">
                <Banner/>
                <Example/>

            </div>

            <OriginModalPortal/>
            {/*</HotkeyScopeManagerProvider>*/}
        </GridThemeProvider>
    );

}

export default App;
