
export default function AddFriendForm() {
    return (
        <form className="p-20">
            <div className="flex flex-col py-4">
                <label className="pb-4 text-xl" htmlFor="name">Name</label>
                <input className="bg-transparent border rounded-lg py-2 px-2" placeholder="Enter Name" type="text" id="name" name="name" required></input>
            </div>
            <div className="flex flex-col py-4">
                <label className="pb-4 text-xl" htmlFor="timezone">Timezone</label>
                <select className="bg-transparent border rounded-lg py-2" id="timezone" name="timezone">
                    <option value="">Select a Timezone</option>
                </select>
            </div>
            <div className="flex flex-col py-4">
                <label className="pb-4 text-xl" htmlFor="location">Location (Optional)</label>
                <input className="bg-transparent border rounded-lg py-2 px-2" placeholder="Enter Location" type="text" id="location" name="location"></input>
            </div>
        </form>
    );
}