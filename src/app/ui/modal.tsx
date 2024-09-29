import { useEffect } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function Modal({ children, isOpen, onClose }: { children: React.ReactNode, isOpen: boolean, onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return (): void => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // Modal Container
        <div className="flex items-center justify-center fixed w-full h-full top-0 left-0">
            {/* Modal */}
            <div className="bg-transparent rounded-3xl border-2 border-white backdrop-blur-sm min-w-96 shadow-md flex justify-center items-center p-10 overflow-hidden transition-[height] duration-500 ease-in-out">
                <button className="absolute right-4 top-4" onClick={onClose}><XMarkIcon className="size-6"/></button>
                {children}
            </div>
        </div>
    );
}