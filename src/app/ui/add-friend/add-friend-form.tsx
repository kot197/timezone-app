"use client";
import { getAllCountries, getCountry, getTimezonesForCountry, Timezone } from "countries-and-timezones";
import { ChangeEvent, FormEvent, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'
import { addFriendFormSchema } from "@/app/lib/addFriendValidationSchema";


export default function AddFriendForm() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [timezones, setTimezones] = useState<Timezone[]>([]);
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
        <option key={timezone.name} value={timezone.name}>
            {`(UTC${timezone.dstOffsetStr}) ${timezone.name}`}
        </option>
    ));

    // VALIDATE FORM
    function validateForm(formObject: Record<string, any>) {
        const validation = addFriendFormSchema.safeParse(formObject);

        if(!validation.success) {
            const errorMessages = validation.error.errors.reduce((accumulator, error) => {
                const field = error.path[0]; // 'email' or 'password'

                // Only set the error if it doesn't already exist in the accumulator (i.e., surface error)
                if (!accumulator[field]) {
                    accumulator[field] = error.message;
                }

                return accumulator;
            }, {} as {[key: string]: string});

            console.log("Validation Errors:", errorMessages);
            setErrors(errorMessages);
            return false;
        }

        setErrors({});
        return true;
    }

    // ON SELECTING COUNTRY
    function onCountryChange(event: ChangeEvent<HTMLSelectElement>) {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);
        
        const timezones = getTimezonesForCountry(countryCode);

        if (timezones) {
            setTimezones(timezones);
        } else {
            setTimezones([]);
        }
    }

    // ON TYPING TAG
    function handleTagChange(event: ChangeEvent<HTMLInputElement>) {
        setTagInput(event.target.value);
    }

    // ON ADD TAG
    function handleAddTag(event: FormEvent) {
        event.preventDefault();

        const trimmedTag = tagInput.trim();

        if(trimmedTag) {
            setTags([...tags, trimmedTag]);
            setTagInput(""); // Clear tag input
        }
    }

    // ON DELETE TAG
    function handleDeleteTag(index: number) {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    }

    // ON ADD FRIEND
    function handleAddFriend(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // Convert FormData to a plain object for easier inspection
        const formObject = Object.fromEntries(formData.entries());
        // Log the form data right from the start
        console.log("Form Data at Start:", formObject);

        const isValid = validateForm(formObject);

        if(!isValid) return;

        return;
    }

    return (
        <form className="py-4 px-20" onSubmit={handleAddFriend}>
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="name">Name</label>
                <input className="bg-transparent border-white border rounded-lg py-2 px-2" placeholder="Enter Name" type="text" id="name" name="name"></input>
            </div>
            {errors.name && <p className='text-red-400 mx-1'>{errors.name}</p>}
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="country">Country</label>
                <select className="bg-transparent border-white border rounded-lg py-2 *:text-black" id="country" name="country" onChange={onCountryChange}>
                    <option value="">Select a Country</option>
                    { selectCountryItems }
                </select>
            </div>
            {errors.country && <p className='text-red-400 mx-1'>{errors.country}</p>}
            <div className="flex flex-col py-2">
                <label className="pb-2 text-xl" htmlFor="timezone">Timezone</label>
                <select className="bg-transparent border-white border rounded-lg py-2 *:text-black" id="timezone" name="timezone" disabled={!selectedCountry}>
                    <option value="">Select a Timezone</option>
                    { selectTimezoneItems }
                </select>
            </div>
            {errors.timezone && <p className='text-red-400 mx-1'>{errors.timezone}</p>}
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
                <button type="submit" className="basis-1/3 py-2 px-12 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all">
                    Submit
                </button>
            </div>
        </form>
    );
}