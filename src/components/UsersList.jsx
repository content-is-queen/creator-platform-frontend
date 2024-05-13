import React, { useState } from "react";

const UsersList = ({ list }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleCheckboxChange = (uid) => {
    console.log(uid);
    if (selectedUser === uid) {
      setSelectedUser(null);
    } else {
      setSelectedUser(uid);
    }
  };
  return (
    <div class="overflow-x-auto max-h-[70vh]">
      <table class="w-full text-sm text-left text-gray-500 bg-gray-900">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50  border-b">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              User
            </th>

            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list?.map((item) => {
              return (
                <tr class="bg-queen-white hover:bg-queen-gray" key={item.uid}>
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        checked={selectedUser === item.uid}
                        onChange={() => handleCheckboxChange(item.uid)}
                      />
                      <label for="checkbox-table-search-1" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      src={
                        item?.imageUrl ||
                        "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGV8ZW58MHx8MHx8fDA%3D"
                      }
                      alt="Jese image"
                    />
                    <div class="ps-3">
                      <div class="text-base font-semibold">
                        {item?.first_name + " " + item?.last_name}
                      </div>
                    </div>
                  </th>

                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Activated
                    </div>
                  </td>
                  <td class="px-6 py-4">{item?.role}</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 hover:underline"
                    ></a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
