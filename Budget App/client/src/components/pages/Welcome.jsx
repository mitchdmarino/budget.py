import "./Welcome.css"; 

export default function Welcome() {
    return (
        <div className="welcome-container">
            <div className="divider"></div>
            <div className="welcome-header">
                <h1 className="fade-in-first">Surplus</h1>
                <h3 className="fade-in-second">Build <span>more</span> than just a budget</h3>
            </div>
            <div className="divider"></div>
        </div>
    )
}