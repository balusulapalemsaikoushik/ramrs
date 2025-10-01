export default function NavBar() {
    return (
        <div className="flex bg-white">
            <a className="navbar-item" href="/">ramrs <Version color="sky-600" /></a>
            <div className="flex ml-auto">
                <a className="navbar-item" href="/literature">Literature</a>
                <a className="navbar-item" href="/history">History</a>
                <a className="navbar-item" href="/science">Science</a>
                <a className="navbar-item" href="/arts">Fine Arts</a>
            </div>
        </div>
    );
}

function Version({ color }: { color: string }) {
    return (
        <span className={`p-1 text-${color} border-1 border-${color} rounded`}>
            experimental
        </span>
    );
}
