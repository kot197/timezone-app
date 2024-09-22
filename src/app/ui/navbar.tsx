'use client';

import Modal from './modal';
import Login from './login';
import { useState } from 'react';

export default function NavBar() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    return (
        <nav className="flex justify-around items-center">
            <span className="text-xl font-semibold p-7">TIMEZONEAPP</span>
            <ul className="nav-links">
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">Home</a></li>
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">About</a></li>
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">Pricing</a></li>
                <li className="inline p-5 hover:text-primary-500 transition-all"><a href="#">Contact</a></li>
            </ul>
            <button onClick={() => setIsModalOpen(true)} className="py-2 px-4 rounded-3xl bg-primary-500 hover:bg-primary-600 transition-all">Launch App</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Login isRegistering={isRegistering} openRegister={() => setIsRegistering(true)} closeRegister={() => setIsRegistering(false)}/>
            </Modal>
        </nav>
    );
}
