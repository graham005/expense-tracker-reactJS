
import { Link, useRouterState } from "@tanstack/react-router";

const navItems = [
  { path: "/user", label: "Dashboard" },
  { path: "/user/expenses", label: "Expenses" },
  { path: "/user/reports", label: "Reports" },
  { path: "/user/settings", label: "Settings" },
];

function UserSideBar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { location } = useRouterState();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        id="user-sidebar"
        className={`
          bg-white shadow-lg text-black w-60 min-h-screen flex flex-col font-sans font-bold text-lg
          fixed top-0 left-0 z-40
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-60
          sm:w-48 sm:text-base lg:w-72
        `}
      >
        <button
          type="button"
          className="md:hidden absolute top-4 right-4 bg-white p-2 rounded shadow z-50"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          aria-label="Close sidebar"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth="2" d="M6 6L18 18M6 18L18 6" />
          </svg>
        </button>
        <div className="p-4 gap-4 pb-10 transition-transform duration-200 hover:scale-105">
          Expense Tracker
          <p className="font-extralight font-sans text-base">User Dashboard</p>
        </div>
        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`p-4 block hover:bg-lime-500 hover:text-white transition-transform duration-200 hover:scale-105 ${
                    isActive ? "bg-lime-700 text-white" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default UserSideBar;