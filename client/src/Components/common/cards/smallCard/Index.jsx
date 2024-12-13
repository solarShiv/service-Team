import React from 'react';
import { MdDataExploration } from "react-icons/md";

const Index = ({ daily = 'N/A', weekly = 'N/A', monthly = 'N/A' }) => {
    return (
        <>
            <div className="w-60 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {/* <MdDataExploration size={42} color='rgb(250, 200, 0)'/> */}
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Complaints</h5>
                </a>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    <div className='flex flex-col gap-2'>
                        <div className='flex'>
                            <div className='w-20'>Daily:</div>
                            <div>{daily}</div>
                        </div>
                        <div className='flex'>
                            <div className='w-20'>Weekly: </div>
                            <div>{weekly}</div>
                        </div>
                        <div className='flex'>
                            <div className='w-20'>Monthly: </div>
                            <div>{monthly}</div>
                        </div>
                    </div>
                </p>
            </div>

        </>
    )
}

export default Index
