import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../../redux/slices/adminSlice';
import { toast } from 'sonner';

const UserManagement = () => {

    const dispatch = useDispatch();
    const naviagte = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (user && user.role !== "admin") {
            naviagte("/");
        }
    }, [user, naviagte]);

    useEffect(() => {
        if (user && user.role === "admin") {
            dispatch(fetchUsers());
        }
    }, [dispatch, user]);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser({ name, email, password, role }));
        console.log(name, email, password);

        setName("");
        setEmail("");
        setPassword("");
    }


    const handleRoleChange = (userId, newRole) => {
        console.log({ id: userId, role: newRole });
        dispatch(updateUser({ id: userId, name, email, role: newRole }));
    }

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId));
        }
    }




    return (
        <div className='max-w-6xl mx-auto py-7 px-10'>
            <h1 className='text-2xl font-bold mb-7'>User Management</h1>
            {loading && <p>Loading....</p>}
            {error && <p>error:{error}</p>}
            <div className='flex flex-col justify-center'>
                <h2 className='mb-5 font-bold'>Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='text-gray-700'>Name</label>
                        <input type="text"
                            className='w-full focus:outline-none border 
                    border-gray-200 py-1 px-2'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-gray-700'>Email</label>
                        <input type="email"
                            className='w-full focus:outline-none border 
                        border-gray-200 py-1 px-2'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-gray-700'>Password</label>
                        <input type="password"
                            className='w-full focus:outline-none border 
                        border-gray-200 py-1 px-2'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='text-gray-700'>Role</label>
                        <select className='w-full focus:outline-none border 
                    border-gray-200 py-1 px-2'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='bg-green-500 text-white px-3 py-1
                        mt-5 rounded cursor-pointer hover:bg-green-600
                        '>
                            Add User</button>
                    </div>
                </form>
            </div>

            {/* User List Management */}
            <div className='overflow-x-auto shadow-md sm:rounded-lg mt-7'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Email</th>
                            <th className='py-3 px-4'>Role</th>
                            <th className='py-3 px-4'>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id} className='border-b hover:bg-gray-50'>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                                    {user.name}
                                </td>
                                <td className='p-4'>{user.email}</td>
                                <td className='p-4'>
                                    <select value={user.role}
                                        onChange={(e) => handleRoleChange(user._id,
                                            e.target.value
                                        )}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className='p-4'>
                                    <button
                                        className='bg-red-500 text-white px-4 py-2 rounded
                                    hover:bg-red-600 cursor-pointer
                                    '
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement
