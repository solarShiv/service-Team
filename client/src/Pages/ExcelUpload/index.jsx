import React,{useState} from 'react';
import axios from 'axios';
const Index = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState()
  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      setMessage('');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/farmer/addByExcel`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
        setMessage(response.data.message);
    } catch (error) {
      console.log(error)
      setMessage('Error uploading file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="container  flex flex-col">
        <div className="mainHeading">
            <h1 className='text-3xl font-semibold tracking-widest text-center p-2 bg-gray-50  rounded-lg'>U<span className='text-lg'>PLOAD</span> F<span className='text-lg'>ILE</span></h1>
        </div>
        <div className="formField">
        <form onSubmit={handleSubmit} >
          <div class="grid gap-3 m-6 md:grid-cols-4">
            <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose File<span className='text-red-500 fixed h-3'>*</span></label>
              <input type="file" onChange={handleFileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 dark:bg-gray-700 "/>
            </div>
            <div>
              <button type="submit" disabled={isUploading} class="text-dark mt-8 bg-yellow-500 ml-6 hover:bg-yellow-400 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center" onChange={handleFileChange}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
          {message && ( <p className="mt-4 ml-6 text-2xl text-left text-red-700"> {message} </p>)}
          </form>
        </div>
      </div>
    </>
  );
};

export default Index
