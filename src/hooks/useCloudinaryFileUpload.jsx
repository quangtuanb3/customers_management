import { useState } from "react";
import axios from "axios";

const useCloudinaryFileUpload = () => {
    const cloudName = 'dvv61dvht';
    const unsignedUploadPrefix = 'qnwjqsbm';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const [imageUrl, setImageUrl] = useState([]);

    const handleUpload = async (file) => {
        if (!file || file.length === 0) {
            return;
        }
        let newImageUrl = '';
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", unsignedUploadPrefix);
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            newImageUrl = response.data.url;
            console.log('Upload success', response.data.url);
        } catch (error) {
            console.error('Upload failed', error);
        }
        setImageUrl(newImageUrl);

    };
    return { handleUpload, imageUrl, setImageUrl };

};

export default useCloudinaryFileUpload;
