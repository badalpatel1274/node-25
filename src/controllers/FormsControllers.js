const FormsModels = require("../models/FormsModels");
const Resume = require("../models/ResumeModels");
const multer = require('multer')
const path = require('path');
const cloudinaryUtil = require('../util/CloudinaryUtils');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage: storage,

}).single("image")



const addFormDetails = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        console.log("File Received: ", req.file);
        console.log("Request Body: ", req.body);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        try {
            const filePath = path.resolve(req.file.path);
            console.log("Uploading File to Cloudinary: ", filePath);

            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(fs.createReadStream(filePath));
            console.log("Cloudinary Response: ", cloudinaryResponse);

            const profilePicUrl = cloudinaryResponse.secure_url;

            // 🛠️ Parsing JSON fields manually
            const personal = JSON.parse(req.body.personal);
            const education = JSON.parse(req.body.education);
            const experience = JSON.parse(req.body.experience);
            const skills = JSON.parse(req.body.skills);

            const savedInfo = await FormsModels.create({
                userId: req.body.userId,
                templateId: req.body.templateId,
                profilePic: profilePicUrl,
                personal: personal,
                education: education,
                experience:experience,
                skills:skills
            });

            if (!savedInfo._id) {
                return res.status(400).json({ error: "Form not saved correctly" });
            }

            const newResume = new Resume({
                userId: savedInfo.userId,
                templateId: savedInfo.templateId,
                userFormId: savedInfo._id
            });

            const savedResume = await newResume.save();
            savedInfo.resumeId = savedResume._id;
            await savedInfo.save();

            res.status(200).json({
                message: "Form details and file uploaded successfully",
                data: savedInfo
            });

        } catch (error) {
            console.error("Cloudinary Upload Failed:", error);
            res.status(500).json({ error: "Cloudinary file upload failed" });
        }
    });
};







//  const addFormDetails = async (req, res) => {


//     try {
//         const savedInfo = await FormsModels.create({
//             userId: req.body.userId,
//             templateId: req.body.templateId,
//             profilePic:req.body.profilePic,
//             personal: req.body.personal,
//             education: req.body.education,
//             experience: req.body.experience,
//             skills: req.body.skills,
//         });

//         if (!savedInfo._id) {
//             return res.status(400).json({ error: "Form not saved correctly" });
//         }

//         const newResume = new Resume({
//             userId: savedInfo.userId,
//             templateId: savedInfo.templateId,
//             userFormId: savedInfo._id, //Ensure userFormId is assigned
//         });

//         const savedResume = await newResume.save(); // Save Resume

//         savedInfo.resumeId = savedResume._id;
//         await savedInfo.save();

//         res.status(200).json({
//             message: "Form details added successfully",
//             data: savedInfo,
//         });
//     } catch (error) {
//         console.error("Form Submission Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };


const getAllFormDetails = async (req, res) => {
    try {
        const allFormDetails = await FormsModels.find()
            .populate("userId", "name email")
            .populate("templateId", "name previewImg")
            .populate("resumeId");
        res.json({
            message: "All form details fetched successfully",
            data: allFormDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateForms = async(req,res)=>{
    try {
        console.log("Updating Form ID:", req.params.id);
        
        const updatedData = await FormsModels.findByIdAndUpdate(req.params.id, req.body, {new:true ,  runValidators: true})
        console.log("Received Data:", req.body);
      
      if (!updatedData) {
        return res.status(404).json({ message: "Form not found" });
    }
      res.json({
        message:"Updated Sucessfully !!",
        data:updatedData
      })
    } catch (error) {
        res.status(500).json({"error":error.message})

    }
}

const getFormsById = async(req,res)=>{
    try {
        const getId = await FormsModels.findById(req.params.id)
        res.json({
            message:"Form byId is Fetched !!",
            data:getId
        })
    } catch (error) {
        res.status(500).json({error})

    }
}


module.exports = { addFormDetails, getAllFormDetails ,updateForms , getFormsById }