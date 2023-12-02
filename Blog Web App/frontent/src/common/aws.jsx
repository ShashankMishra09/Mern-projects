import axios from "axios";

export const UploadImage = async (img) => {
  try {
    const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url");
    const uploadURL = response.data.uploadURL;

    await axios({
      method: "PUT",
      url: uploadURL,
      headers: { "Content-Type": "multipart/form-data" },
      data: img,
    });

    // Returning the imgUrl here
    return uploadURL.split("?")[0];
  } catch (error) {
    // Handle errors here
    console.error("Error uploading image:", error.message);
    throw error;
  }
};
