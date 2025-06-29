function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="bg-lime-700 shadow-lg p-4 rounded flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            className="md:hidden bg-white p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <h1 className="text-3xl font-extrabold text-white">
          Welcome, <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded">{'Admin'}</span>
        </h1>
      </div>
      <p className="text-white text-base">
        Here's what's happening with your expense tracker today
      </p>
    </header>
  );
}

export default Header;