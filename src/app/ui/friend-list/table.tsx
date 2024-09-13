'use client'

import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export default function FriendsTable({ children }: { children: React.ReactNode }) {
    return (
        <table className="w-full mx-6 mb-12 border-y-2 table-auto">
            <thead>
                <tr className="border-b-2 text-left">
                    <th>
                        Name
                    </th>
                    <th>
                        Timezone
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Operation
                    </th>
                </tr>
            </thead>
            <tbody>
                { children }
            </tbody>
        </table>
    );
}

export function FriendsTableRow() {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    
    return (
        <tr className="h-12 border-b">
            <td>Kot</td>
            <td>Asia/Jakarta</td>
            <td>Active</td>
            <td>
                <div className='flex items-center'>
                    <label className='flex cursor-pointer select-none items-center'>
                        <div className='relative'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className='sr-only'
                            />
                            <div
                                className={`box block h-8 w-14 rounded-full ${
                                isChecked ? 'bg-rose-500' : 'bg-green-400'
                                }`}
                            ></div>
                            <div
                                className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                                isChecked ? 'translate-x-full' : ''
                                }`}
                            ></div>
                        </div>
                    </label>
                    <PencilSquareIcon className='size-6 mx-2'/>
                    <TrashIcon className='size-6'/>
                </div>
            </td>
        </tr>
    );
}