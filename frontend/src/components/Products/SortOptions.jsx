import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {

    const [searchParams, setSearchParams] = useSearchParams();


    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        searchParams.set('sortBy', sortBy);
        setSearchParams(searchParams);
    }


    return (
        <div className='mb-4 text-sm flex justify-end items-center'>
            <select id="sort" className='border border-gray-200 px-3 py-2 
            focus:outline-none'
                onChange={handleSortChange}
                value={searchParams.get("sortBy")}
            >
                <option value="">Default</option>
                <option value="priceAsc">Price:Low To High</option>
                <option value="priceDesc">Price:High To Low</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    )
}

export default SortOptions
