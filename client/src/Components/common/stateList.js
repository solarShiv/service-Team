import React, { useEffect, useState } from "react";
import { stateList } from "../../Utils/APIs/stateAPI";
const StateSelect = ({ value, onChange, label = "Select State" }) => {
  const [stateListData, setStateListData] = useState([]);
  useEffect(() =>{
    stateList(setStateListData)
  },[])
  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="state-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select State --</option>
        {stateListData.length !== 0 && stateListData.map(({_id, state}) =>(
          <option key={_id} value={_id}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateSelect;
