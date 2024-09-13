'use client';

import Modal from './modal';
import Login from './login';
import { useState } from 'react';

export default function NavBar() {
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

    return (
        <nav className="flex justify-around items-center">
            <span className="text-xl font-semibold p-7">TIMEZONEAPP</span>
            <ul className="nav-links">
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">Home</a></li>
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">About</a></li>
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">Pricing</a></li>
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">Contact</a></li>
            </ul>
            <button onClick={() => setIsLoginOpen(true)} className="py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition-all"><a href="#">Launch App</a></button>
            <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
                <Login/>
            </Modal>
        </nav>
    );
}
