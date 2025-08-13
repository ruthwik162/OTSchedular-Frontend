import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { assets } from '../../assets/assets'
import { HiOutlineHeart } from 'react-icons/hi2'

const Footer = () => {
    return (
        <div className="w-full p-2 overflow-x-hidden">
            <footer className="p-5 rounded-2xl md:px-10 lg:px-16 w-full text-gray-900 bg-[#e6f7f6] dark:bg-gray-700 dark:text-gray-100">
                <div className="flex flex-col md:flex-row justify-between w-full gap-5 sm:gap-5 md:gap-10 border-b border-gray-300 dark:border-gray-600 pb-5">

                    {/* Left Section */}
                    <div className="max-w-sm md:max-w-md w-full">
                        {/* Logo and Description */}
                        <div className="flex flex-row sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                            <img
                                className="w-24 h-auto rounded-2xl"
                                src={assets.Banner} // Replace with MediCare hospital logo
                                alt="MediCare Logo"
                            />
                            <p className="text-sm text-gray-800 dark:text-gray-200 text-center  sm:text-left px-2 sm:px-0">
                                MediCare Hospital is committed to providing compassionate care with world-class medical facilities and expert healthcare professionals.
                            </p>
                        </div>

                        {/* Hospital App Buttons */}
                        <div className="flex justify-center sm:justify-start items-center gap-3 mt-4">
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                                alt="Google Play"
                                className="h-10 w-auto border border-gray-300 rounded"
                            />
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                                alt="App Store"
                                className="h-10 w-auto border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-center  gap-10 sm:gap-5 md:gap-5 lg:gap-10">

                        {/* Quick Links */}
                        <div className='md:block hidden sm:hidden'>
                            <h2 className="font-semibold text-[#009688] mb-5">Quick Links</h2>
                            <ul className="text-sm space-y-2">
                                <li><Link to="#">Home</Link></li>
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">Departments</Link></li>
                                <li><Link to="#">Contact</Link></li>
                                <li><Link to="#">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="font-semibold text-[#009688] mb-1">Contact Us</h2>
                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                <FiPhone className="text-[#009688] text-lg" />
                                <p>+1-800-555-HEAL</p>
                            </div>
                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                <FiMail className="text-[#009688] text-lg" />
                                <p>support@medicare.com</p>
                            </div>
                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                <FiMapPin className="text-[#009688] text-lg" />
                                <p>kakaji colony,chowrastha, Hanamkonda </p>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className='md:block hidden'>
                            <p className='text-lg text-gray-700 dark:text-gray-300'>Stay Healthy</p>
                            <p className='mt-3 text-sm'>
                                Subscribe to our newsletter for health tips and hospital updates.
                            </p>
                            <div className='flex items-center mt-4 max-w-full sm:max-w-xs'>
                                <input
                                    type="text"
                                    className='flex-grow bg-gray-200 rounded-l border border-gray-300 h-9 px-3 outline-none'
                                    placeholder='Your email'
                                />
                                <button className='bg-[#009688] h-9 w-9 rounded-r flex items-center justify-center'>
                                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 px-4 py-4 text-gray-700 dark:text-gray-300 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} MediCare Hospital. All Rights Reserved.
                    </p>
                    <div className="flex flex-col md:flex-row  items-center gap-2 text-sm">
                        <div className='flex items-center gap-2 justify-center mx-auto'>
                            <p>Made with</p>
                            <HiOutlineHeart className="text-indigo-500" />
                        </div>
                        <p>By Nagaruthwik for  Better Health</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
