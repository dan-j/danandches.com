import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Header from './components/Header';
import HomeContainer from './components/HomeContainer';

export default class App extends React.Component<{}, {}> {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/">
                        <HomeContainer />
                    </Route>
                </div>
            </BrowserRouter>
        );
    }
}
