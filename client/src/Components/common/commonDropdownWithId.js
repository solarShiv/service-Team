import React, { useEffect, useState } from "react";
import { showData } from "../../Utils/APIs/commonShowAPI";
const CommonDropdownWithId = ({ Api_path, value, onChange, label }) => {
  const [ListData, setListData] = useState([]);
  useEffect(() =>{
    showData(Api_path, setListData);
  },[])
  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="state-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select {label} --</option>
        {ListData.length !== 0 && ListData.map(({_id,name, index}) =>(
          <option key={index} value={_id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommonDropdownWithId;
