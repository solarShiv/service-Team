import React from "react";

const ProductSelect = ({ value, productListData=[], onChange, label = "Select District" }) => {
  console.log(productListData);
  console.log(value);
  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="state-select"
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
            {label}
        </option> 
        {productListData.length !== 0 ? productListData.map(({_id, product}) =>(
          <option key={_id} value={product + "%" + _id}>
            {product}
          </option>
        )) : ''} 
      </select>
    </div>
  );
};

export default ProductSelect;