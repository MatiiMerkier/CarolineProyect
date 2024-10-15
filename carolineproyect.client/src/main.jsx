import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Home from './Home.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Calculator from './Calculator.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
            </Routes>
            <Footer />
        </Router>
  </StrictMode>,
)
