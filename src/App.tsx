import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Header from './components/common/Header';
import Home from './components/Home';

export default class App extends React.Component<{}, {}> {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/">
                        <Home />
                    </Route>
                </div>
            </BrowserRouter>
        );
    }
}
