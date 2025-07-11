
export const MainNavBar = () => {
    return (
        <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
                <li>
                    <a className="navbar-text" href="/about">
                        About
                    </a>
                </li>

                <li>
                    <a className="navbar-text" href="/">
                        Home
                    </a>
                </li>

                <li>
                    <a className="btn-primary" href="/sublease/step-1">
                        Sublease your space
                    </a>
                </li>
            </ul>
        </nav>
    )
}