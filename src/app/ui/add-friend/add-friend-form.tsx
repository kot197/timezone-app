"use client";
import { getAllCountries, getCountry } from "countries-and-timezones";
import { ChangeEvent, FormEvent, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'


export default function AddFriendForm() {
    const [timezones, setTimezones] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const countries = getAllCountries(); // Get all countries with timezone

    const selectCountryItems = Object.entries(countries).map(([code, country]) => {
        return (
            // Display country name with CODE as value
            <option key={code} value={code}>
                { country.name }
            </option>
        );
    });

    const selectTimezoneItems = timezones.map((timezone) => (
        <option key={timezone} value={timezone}>
            {timezone}
        </option>
    ));

    function onCountryChange(event: ChangeEvent<HTMLSelectElement>) {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);
        
        const country = getCountry(countryCode);

        if (country && country.timezones) {
            setTimezones(country.timezones);
        } else {
            setTimezones([]);
        }
    }

    function handleTagChange(event: ChangeEvent<HTMLInputElement>) {
        setTagInput(event.target.value);
    }

    function handleAddTag(event: FormEvent) {
        event.preventDefault();

        const trimmedTag = tagInput.trim();

        if(trimmedTag) {
            setTags([...tags, trimmedTag]);
            setTagInput(""); // Clear tag input
        }
    }

    function handleDeleteTag(index: number) {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    }

    return (
        <form className="py-4 px-20">
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="name">Name</label>
                <input className="bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Name" type="text" id="name" name="name" required></input>
            </div>
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="country">Country</label>
                <select className="bg-transparent border-white border rounded-lg py-2 *:text-black" id="country" name="country" onChange={onCountryChange}>
                    <option value="">Select a Country</option>
                    { selectCountryItems }
                </select>
            </div>
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="timezone">Timezone</label>
                <select className="bg-transparent border-white border rounded-lg py-2 *:text-black" id="timezone" name="timezone" disabled={!selectedCountry}>
                    <option value="">Select a Timezone</option>
                    { selectTimezoneItems }
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
                <label className="pb-2 text-xl" htmlFor="tag">Tags (Optional)</label>
                <div className="flex">
                    <input className="basis-3/4 bg-transparent border-white border rounded-lg py-2 px-2"
                        placeholder="Enter a Tag"
                        type="text"
                        id="tag"
                        name="tag"
                        value={tagInput}
                        onChange={handleTagChange}></input>
                    <button className="ml-4 basis-1/4 py-2 px-12 rounded-lg text-black hover:text-white bg-white hover:bg-gray-500 transition-all" onClick={handleAddTag}>Add Tag</button>
                </div>
            </div>
            <div className="flex flex-col py-2">
                {tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <li key={index} className="bg-indigo-500 text-white px-4 py-3 rounded-3xl flex items-center">
                                {tag}
                                <button
                                    className="ml-2 bg-indigo-600 text-white rounded-full p-2 align-middle"
                                    onClick={() => handleDeleteTag(index)}
                                >
                                    <XMarkIcon className="size-4"/>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex justify-center mt-20">
                <button className="basis-1/3 py-2 px-12 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all">
                    Submit
                </button>
            </div>
        </form>
    );
}