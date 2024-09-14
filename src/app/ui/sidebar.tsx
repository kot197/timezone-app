'use client'

import { ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import Image from "next/image";
import { createContext, useContext, useState } from 'react';
import { handleSignOut } from '../api/auth/actions';

const SideBarContext = createContext(true);
export default function SideBar({ children, profileMenu }: { children: React.ReactNode, profileMenu: React.ReactNode }) {
    const [expanded, setExpanded ] = useState(true);
    const [ellipsisMenuOpen, setEllipsisMenuOpen] = useState(false);

    return (
        <aside className="h-screen w-min">
            <nav className="h-full flex flex-col border-r shadow-sm">
                {/* SIDEBAR HEADER & EXPAND BUTTON */}
                <div className="p-4 pb-2 flex justify-between items-center">
                    <span className={`text-xl font-semibold ${
                        expanded ? "p-7 w-32" : "py-7 w-0 overflow-hidden"
                    }`}>TIMEZONEAPP</span>
                    <button onClick={() => setExpanded((curr: boolean) => !curr)} className="p-1.5 rounded-lg group hover:bg-gray-100">
                        {expanded? <ChevronLeftIcon className='size-6 group-hover:text-gray-600'/>: <ChevronRightIcon className='size-6 group-hover:text-gray-600'/>}
                    </button>
                </div>

                {/* SIDEBAR MENU ITEMS */}
                <SideBarContext.Provider value={ expanded }>
                    <ul className="flex-1 px-3">{ children }</ul>
                </SideBarContext.Provider>
                
                {/* PROFILE NAME AND ELLIPSIS MENU */}
                <div className="border-t flex p-3">
                    <Image src='https://ui-avatars.com/api/?name=John+Doe'
                        width={64}
                        height={64}
                        alt=""
                        className='w-10 h-10 rounded-md'/>
                    <div  className={`
                        flex relative justify-between items-center ${
                            expanded ? "w-52 ml-3" : "w-0 p-0 overflow-hidden"
                        }`}>
                        <div className="leading-4">
                            <span className="font-semibold whitespace-nowrap">John Doe</span><br/>
                            <span className="text-xs text-gray-600 whitespace-nowrap">Guest</span>
                        </div>
                        <button onClick={() => setEllipsisMenuOpen((curr: boolean) => !curr)} className='p-1.5 rounded-lg group hover:bg-gray-100'>
                            <EllipsisVerticalIcon className='size-6 group-hover:text-gray-600'></EllipsisVerticalIcon>
                        </button>
                        {
                            ellipsisMenuOpen && (
                            <div className='absolute hover:bg-white hover:text-gray-600 bg-black -translate-y-full z-50 mb-2 right-0 p-2 rounded-md border-2'>
                                { profileMenu }
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SideBarItem({ icon, text, active, alert }: { icon: React.ReactNode, text: string, active?: boolean, alert?: boolean }) {
    const expanded = useContext(SideBarContext);

    return (
        <li className={`
            relative flex items-center py-2 px-3 font-medium rounded-md cursor-pointer
            transition-colors group
            ${
                active
                    ? "bg-gradient-to-tr from-indigo-20 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-white hover:text-gray-600"
            }
        `}>
            { icon }
            <span className={`overflow-hidden transition-all whitespace-nowrap ${
                expanded ? "w-52 ml-3" : "w-0 p-0 h-0 overflow-hidden"
            }`}>{ text }</span>
            {alert && (
                <div 
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                        expanded ? "":"top-2"
                    }`}
                />
            )}

            {!expanded && <div className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 trasition-all
                whitespace-nowrap
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}>{text}</div>}
        </li>
    );
}

// TODO: Make this for any menu item, not exclusive for sign out
export function EllipsisMenuItem({icon}: {icon: React.ReactNode}) {
    return (
        <form action={async () => { 
            const result = await handleSignOut();
            if (result.redirectTo) {
                window.location.href = result.redirectTo; // Manually redirect client-side
              }
            }}>
            <button className="flex items-center" type="submit">
                {icon}
                Sign Out
            </button>
        </form>
    );
}
