import axios from "axios";

export const downloadReport = async( formParams ) => {
    try{
        // console.log("JSON-DATA", jsonData);
        const sendRequest = await axios.get(`${process.env.REACT_APP_API_URL}/admin/reportDownload?stageId=${formParams.stageId}&assignEmployee=${formParams.assignEmployee}&startDate=${formParams.startDate}&endDate=${formParams.endDate}`, {
            headers: {
                "Content-Type" : "application/json"
            },
            responseType: 'blob'
        });

        const response = await sendRequest.data;
        console.log("Download Excel Response: -", response);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${(new Date()).toDateString()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }catch(error){
        console.log(error);
    }
}