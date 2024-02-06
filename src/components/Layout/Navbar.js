import Link from 'next/link';
const Navbar = () => {
    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-white font-semibold text-lg">

                    My Awesome Store

                </Link>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/contact" className="text-white font-medium hover:text-black  hover:bg-white py-2 px-4 rounded transition duration-300 ease-in-out">
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </nav >
    );
};

export default Navbar;
