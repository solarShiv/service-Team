import React from "react";

const DistrictSelect = ({ value, districtListData=[], onChange, label = "Select District" }) => {
  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="state-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
            {label}
        </option>
        {districtListData.length !== 0 && districtListData.map((district,index) =>(
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelect;
