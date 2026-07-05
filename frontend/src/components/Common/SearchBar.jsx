import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../../redux/slices/productsSlice';

const SearchBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchTogge = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setFilters({ search: searchTerm }));
        dispatch(fetchProductsByFilters({ search: searchTerm }));
        navigate(`/collections/all?search=${searchTerm}`)
        setIsOpen(false);
    }


    return (
        <div className={`flex justify-center items-center w-full transition-all duration-300 
            ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}
        `}>
            {isOpen ?
                (
                    <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
                        <div className='relative w-1/2'>
                            <input type="text"
                                placeholder='Search'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg 
                                focus:outline-none w-full placeholder:text-gray-700'
                            />
                            <button
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 
                                text-gray-600 hover:text-gray-800
                                ' type="submit">
                                <HiMagnifyingGlass className='w-6 h-6 cursor-pointer' />
                            </button>
                        </div>

                        {/* Close Button */}
                        <button
                            className='absolute right-4 top-1/2 transform -translate-y-1/2 
                            text-gray-600 hover:text-gray-800
                            ' type='button' onClick={handleSearchTogge}
                            typeOf="submit"
                        >
                            <HiMiniXMark className='w-6 h-6 cursor-pointer'
                            />
                        </button>
                    </form>
                ) : (
                    <button onClick={handleSearchTogge} type='button'>
                        <HiMagnifyingGlass className='w-6 h-6 cursor-pointer' />
                    </button>
                )
            }
        </div>
    )
}

export default SearchBar


