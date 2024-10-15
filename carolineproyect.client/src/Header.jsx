import './Header.css';
import './Common.css';

const App = () => {
    return (
        <div className="header-container">
            <div className="div-header-container">
                <h3 style={{ textAlign: 'end', margin: '4vw' }}>PLAN SMART. LIVE WELL.</h3>
            </div>
            <div className="div-header-center">
                <img src="../public/icon_white_bg.png" alt="icon" className="logo-img" />
            </div>
            <div className="div-header-container">
                <h3 style={{ textAlign: 'start', margin: '4vw' }}>FROM COLLEGE TO RETIREMENT</h3>
            </div>
        </div>
    );
};

export default App;