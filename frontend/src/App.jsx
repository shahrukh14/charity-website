import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About';
import Contact from './Contact';
import DonateForm from './DonateForm';
import ThankYou from './ThankYou';
import Sorry from './Sorry';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/donate/:id" element={<DonateForm/>}/>
                    <Route path="/thank-you" element={<ThankYou/>}/>
                    <Route path="/sorry" element={<Sorry />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
