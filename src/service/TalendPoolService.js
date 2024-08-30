const { axiosInstance } = require("./axiosConfig");

const SubmitResumeData = (input) => {
    return axiosInstance.post('/submit_job', { data: input })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            throw new Error(error);
        });
} 

export default SubmitResumeData;