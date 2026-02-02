import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/event-details" element={<div style={{padding: '100px 20px', textAlign: 'center', color: '#fff', backgroundColor: '#000', minHeight: '100vh'}}><h1>Event Details Page Coming Soon!</h1></div>} />
            </Routes>
        </Router>
    );
}

export default App;
