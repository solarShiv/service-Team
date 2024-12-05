import React from "react";

const DepartmentSelect = ({ value, departmentListData=[], onChange, label = "Select Department" }) => {
  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="department-select"
        defaultValue={value}
        onChange={(e) => {onChange(e.target.value); console.log(e.target.value)}}
      >
        <option value="">
            {label}
        </option>
        {departmentListData.length !== 0 && departmentListData.map(({department,_id}) =>(

          <option key={_id} value={department+ "-" + _id}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentSelect;
