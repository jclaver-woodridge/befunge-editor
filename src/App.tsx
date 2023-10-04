import { PrimaryLayout } from 'layouts/PrimaryLayout';
import { Home } from 'pages/Home';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrimaryLayout/>}>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;