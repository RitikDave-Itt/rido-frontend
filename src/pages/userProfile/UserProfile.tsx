import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile: React.FC = () => {
   const {user} = useSelector((state: RootState) => state.user);
 console.log(user);

  return (
    <div className="bg-background-light h-full p-8 flex flex-col items-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold mb-6 text-primary text-center">User Profile</h2>
        
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b">
              <th className="text-gray-700 py-2 px-4">First Name</th>
              <td className="text-gray-600 py-2 px-4">{user?.firstName}</td>
            </tr>
            <tr className="border-b">
              <th className="text-gray-700 py-2 px-4">Last Name</th>
              <td className="text-gray-600 py-2 px-4">{user?.lastName}</td>
            </tr>
            <tr className="border-b">
              <th className="text-gray-700 py-2 px-4">Email</th>
              <td className="text-gray-600 py-2 px-4">{user?.email}</td>
            </tr>
            <tr className="border-b">
              <th className="text-gray-700 py-2 px-4">Gender</th>
              <td className="text-gray-600 py-2 px-4">{user?.gender}</td>
            </tr>
            <tr>
              <th className="text-gray-700 py-2 px-4">Role</th>
              <td className="text-gray-600 py-2 px-4">{user?.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
