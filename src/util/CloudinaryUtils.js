const cloudinary = require('cloudinary').v2;

const uploadFileToCloudinary = async (file)=>{
    cloudinary.config({
        cloud_name:"dvlxgp3mb",
        api_key:"223227845584128",
        api_secret:"FHX4SinDHoCV5ihhlzVHc7NQ5rs"
    })
    const clouudinaryResponse  = await cloudinary.uploader.upload(file.path)
    return clouudinaryResponse ;
}

module.exports={uploadFileToCloudinary}