import { MapPinIcon } from '@heroicons/react/24/solid'

export default function CardGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 h-full w-full grid grid-cols-5 grid-rows-3 gap-10 px-8 ">
            { children }
        </div>
    );
}

export function Card() {
    return (
        <div className="border-2 rounded-3xl p-6 overflow-hidden">
            <h1 className='w-full text-center'>James</h1>
            <hr className="my-3"/>
            <div className='flex flex-col items-center justify-around mb-4'>
                <span className='text-4xl'>3:15 PM</span>
                <span className='text-sm'>America/New York</span>
                <span className='text-sm'>UTC -05:00</span>
                <span className='text-sm'>5 hours ahead</span>
                <span className='text-sm'>DST in effect</span>
            </div>
            <div className='flex items-center justify-between'>
                <MapPinIcon className='size-6'></MapPinIcon>
                <span className=''> New York, USA</span>
            </div>
        </div>
    );
}