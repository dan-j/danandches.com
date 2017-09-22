import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Header from './components/Header';
import HomeContainer from './components/HomeContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from './styles/colors';

export default class App extends React.Component<{}, {}> {

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/">
                            <HomeContainer />
                        </Route>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}
