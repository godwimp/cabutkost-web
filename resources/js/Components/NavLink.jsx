import { Link } from '@inertiajs/react';

export default function NavLink({ href, active = false, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none ${
                active
                    ? 'border-b-2 border-indigo-400 text-gray-900'
                    : 'border-b-2 border-transparent text-gray-500'
            }`}
        >
            {children}
        </Link>
    );
}