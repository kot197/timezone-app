import { getAllCountries } from "countries-and-timezones";


export default function AddFriendForm() {
    const countries = getAllCountries(); // Get all countries with timezone

    const selectItems = Object.entries(countries).map(([code, country]) => {
        return (
            <option key={code} value={country.name}>
                { country.name }
            </option>
        );
    })

    return (
        <form className="py-4 px-20">
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="name">Name</label>
                <input className="bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Name" type="text" id="name" name="name" required></input>
            </div>
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="timezone">Country</label>
                <select className="bg-transparent border-white border rounded-lg py-2 *:text-black" id="timezone" name="timezone">
                    <option value="">Select a Country</option>
                    { selectItems }
                </select>
            </div>
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="location">Location (Optional)</label>
                <input className="bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Location" type="text" id="location" name="location"></input>
            </div>
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="notes">Notes (Optional)</label>
                <input className="bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Notes" type="text" id="notes" name="notes"></input>
            </div>
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="tags">Tags (Optional)</label>
                <div className="flex">
                    <input className="basis-3/4 bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Tags" type="text" id="tags" name="tags"></input>
                    <button className="ml-4 basis-1/4 py-2 px-12 rounded-lg text-black hover:text-white bg-white hover:bg-gray-500 transition-all">Add Tag</button>
                </div>
            </div>
            <div className="flex justify-center mt-20">
                <button className="basis-1/3 py-2 px-12 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all">
                    Submit
                </button>
            </div>
        </form>
    );
}