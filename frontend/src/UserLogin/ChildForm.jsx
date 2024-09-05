import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../Context/ProfileContext';
import BgImage from '../assets/bg6.jpg';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify


const ChildForm = () => {
    const navigate = useNavigate(); 
    const { setProfile } = useContext(ProfileContext);

    const [formData, setFormData] = useState({
        babyName: '',
        middleName: '',
        babyLastName: '',
        dob: '',
        gender: '',
        parentName: '',
        relationship: '',
        otherRelationship: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        homeTelephone: '',
        otherTelephone: '',
        email: '',
        assistingPeople: '',
    });

    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/submit', formData);
            const { child_id } = response.data;
            setProfile(response.data);  // Save the profile data in the context
            toast.success('Child information saved successfully!');
            navigate(`/dashboard/${child_id}`);  // Navigate to the dashboard based on child_id
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            toast.error('Error saving child information. Please try again.');
        }
    };
    return (
        <div className="relative min-h-screen bg-cover bg-center">
            <div className="absolute inset-0 opacity-50 bg-cover bg-center"style={{ backgroundImage: `url(${BgImage})` }}></div>
            <div className="flex justify-center items-center min-h-fit bg-slate-100">
                <div className="grid grid-cols-1 gap-0 max-w-lg w-full">
                    <div className="flex flex-col justify-center items-center relative z-10">
                        <div className="bg-white shadow-md rounded-lg p-10 w-[150%] mb-10 mt-5">
                            <div className="bg-cyan-500 rounded-t-lg p-4 pt-10 text-white text-center font-bold mb-4 font-serif text-3xl mtb-10">
                                <h1 className='mb-2'>Child Form</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {/* Form Fields */}
                                {/* First Row */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {/* Baby Name */}
                                    <div>
                                        <label htmlFor="babyName" className="block text-sm font-medium text-gray-700">Baby's First Name</label>
                                        <input
                                            id="babyName"
                                            name="babyName"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Enter Baby's First Name"
                                            value={formData.babyName}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                    {/* Middle Name */}
                                    <div>
                                        <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                                        <input
                                            id="middleName"
                                            name="middleName"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Enter Baby Middle Name"
                                            required
                                            value={formData.middleName}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                    {/* Baby Last Name */}
                                    <div>
                                        <label htmlFor="babyLastName" className="block text-sm font-medium text-gray-700">Baby Last Name</label>
                                        <input
                                            id="babyLastName"
                                            name="babyLastName"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Enter Baby Last Name"
                                            required
                                            value={formData.babyLastName}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                </div>
                                {/* Second Row */}
                                {/* Baby's Date of Birth */}
                                <div className="mb-4">
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">Baby's Date of Birth</label>
                                    <input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        placeholder="Enter Baby's Date of Birth"
                                        required
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                    />
                                </div>
                                {/* Baby's Gender */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Baby's Gender</label>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap space-x-4">
                                            <label htmlFor="female" className="flex items-center">
                                                <input type="radio" id="female" name="gender" value="Female" className="mr-2 " checked={formData.gender === 'Female'} onChange={handleChange} />
                                                Female
                                            </label>
                                            <label htmlFor="male" className="flex items-center">
                                                <input type="radio" id="male" name="gender" value="Male" className="mr-2" checked={formData.gender === 'Male'} onChange={handleChange} />
                                                Male
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* Parent Information */}
                                {/* Third Row */}
                                {/* Name */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">User Name</label>
                                        <input
                                            id="parentName"
                                            name="parentName"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Enter User Name"
                                            required
                                            value={formData.parentName}
                                            onChange={handleChange}
                                            className="mt-1 p-2  w-full border border-gray-300 rounded-md focus:outline-nonefocus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                </div>
                                {/* Relationship to Baby */}
                                {/* Fourth Row */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship to Baby</label>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap space-x-4">
                                            <label htmlFor="parent" className="flex items-center">
                                                <input type="radio" id="parent" name="relationship" value="Parent" className="mr-2" checked={formData.relationship === 'Parent'} onChange={handleChange} />
                                                Parent
                                            </label>
                                            <label htmlFor="guardian" className="flex items-center">
                                                <input type="radio" id="guardian" name="relationship" value="Guardian" className="mr-2" checked={formData.relationship === 'Guardian'} onChange={handleChange} />
                                                Guardian
                                            </label>
                                            <label htmlFor="teacher" className="flex items-center">
                                                <input type="radio" id="teacher" name="relationship" value="Teacher" className="mr-2" checked={formData.relationship === 'Teacher'} onChange={handleChange} />
                                                Teacher
                                            </label>
                                            <label htmlFor="careProvider" className="flex items-center">
                                                <input type="radio" id="careProvider" name="relationship" value="Child Care Provider" className="mr-3" checked={formData.relationship === 'Child Care Provider'} onChange={handleChange} />
                                                Child care provider
                                            </label>
                                        </div>
                                        <div className="flex flex-wrap space-x-4">
                                            <label htmlFor="grandparent" className="flex items-center">
                                                <input type="radio" id="grandparent" name="relationship" value="Grandparent" className="mr-3" checked={formData.relationship === 'Grandparent'} onChange={handleChange} />
                                                <span>Grandparent or other relative</span>
                                            </label>
                                            <label htmlFor="fosterParent" className="flex items-center">
                                                <input type="radio" id="fosterParent" name="relationship" value="Foster Parent" className="mr-3" checked={formData.relationship === 'Foster Parent'} onChange={handleChange} />
                                                Foster parent
                                            </label>
                                        </div>
                                    </div>
                                    {/* Other Relationship */}
                                    <div className="mt-4 ">
                                        <label htmlFor="otherRelationship" className="block text-sm font-medium text-gray-700 mb-1">Other:</label>
                                        <input type="text" id="otherRelationship" name="otherRelationship"   className="mt-1 block w-full  shadow-sm  focus:ring-opacity-50 p-1 border border-gray-300 rounded-md" value={formData.otherRelationship}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                {/* Address and Contact Information */}
                                {/* Fifth Row */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {/* City */}
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            autoComplete="address-level2"
                                            placeholder="Enter City"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                    {/* State/Province */}
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
                                        <input
                                            id="state"
                                            name="state"
                                            type="text"
                                            autoComplete="address-level1"
                                            placeholder="Enter State/Province"
                                            required
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                    {/* Zip/Postal Code */}
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip/Postal Code</label>
                                        <input
                                            id="zip"
                                            name="zip"
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            placeholder="Enter Zip/Postal Code"
                                            required
                                            value={formData.zip}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                </div>
                                {/* Sixth Row */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {/* Country */}
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            autoComplete="country"
                                            placeholder="Enter Country"
                                            required
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                    {/* Home Telephone Number */}
                                    <div>
                                        <label htmlFor="homeTelephone" className="block text-sm font-medium text-gray-700">Home Telephone Number</label>
                                        <input
                                            id="homeTelephone"
                                            name="homeTelephone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="Enter Home Telephone Number"
                                            required
                                            value={formData.homeTelephone}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                    {/* Other Telephone Number */}
                                    <div>
                                        <label htmlFor="otherTelephone" className="block text-sm font-medium text-gray-700">Other Telephone Number</label>
                                        <input
                                            id="otherTelephone"
                                            name="otherTelephone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="Enter Other Telephone Number"
                                            value={formData.otherTelephone}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    </div>
                                </div>
                                {/* Email Address */}
                                {/* Seventh Row */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Enter Email Address"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                    />
                                </div>
                                {/* Assisting People */}
                                {/* Eighth Row */}
                                <div className="mb-10 w-full">
                                    <label htmlFor="assistingPeople" className="block text-sm font-medium text-gray-700">Name of people assisting in questionnaire completion</label>
                                    <textarea
                                        id="assistingPeople"
                                        name="assistingPeople"
                                        rows="3"
                                        placeholder="Enter Names of People Assisting"
                                        value={formData.assistingPeople}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                    ></textarea>
                                </div>
                                {/* Submit Button */}
                                <div className="w-full h-16 text-center justify-center bg-gradient-to-bl from-cyan-400 to-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                                    <button type="submit">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChildForm;