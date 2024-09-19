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
        <form className="p-20">
            <div className="flex flex-col py-4">
                <label className="pb-4 text-xl" htmlFor="name">Name</label>
                <input className="bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Name" type="text" id="name" name="name" required></input>
            </div>
            <div className="flex flex-col py-4">
                <label className="pb-4 text-xl" htmlFor="timezone">Timezone</label>
                <select className="bg-transparent border-white border rounded-lg py-2 *:text-black" id="timezone" name="timezone">
                    <option value="">Select a Timezone</option>
                    { selectItems }
                </select>
            </div>
            <div className="flex flex-col py-4">
                <label className="pb-4 text-xl" htmlFor="location">Location (Optional)</label>
                <input className="bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Location" type="text" id="location" name="location"></input>
            </div>
        </form>
    );
}