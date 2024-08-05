import './App.css';

import {GridThemeProvider} from '@acrool/react-grid';
import {PickerPortal} from '@acrool/react-picker';
import {HashRoute,HashRoutes} from '@acrool/react-router-hash';
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

import Banner from './components/Banner';
import EditAccountPicker from './viewPicker/EditAccountPicker';
import EditPasswordPicker from './viewPicker/EditPasswordPicker';
import Example from './views/Example';
import NotFound from './views/NotFound';


const history = createBrowserHistory({window});


const MainRouter = () => {
    return <Router>

        <Routes>
            <Route path="/" element={<Example/>} />

            {/* NotFound */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>


        {/*<MyTest/>*/}
        <HashRoutes>
            {/*個人各式資訊頁面*/}
            <HashRoute path="control/*">
                <HashRoute path="editAccount/:id" element={<EditAccountPicker/>}/>
                <HashRoute path="editPassword" element={<EditPasswordPicker/>}/>
            </HashRoute>
        </HashRoutes>

        <PickerPortal/>

    </Router>;
};


function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>

                <MainRouter/>
            </div>
        </GridThemeProvider>
    );
}

export default App;
