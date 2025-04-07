const resumeModel = require('../models/ResumeModels')
const logger = require('../util/Logger')

const addResume = async(req,res)=>{

try {
    const savedResume = await resumeModel.create(req.body)

     logger.emit("activity", { message: "Resume Created", user: user.email });


    res.json({
        message:"resume Model is created",
        data:savedResume
    })
} catch (error) {
    res.json({
        "error":error.message
})

}
}

const getIdByResume = async(req,res)=>{
    try {
        const resume = await resumeModel.findById(req.params.id)
        .populate("templateId")
        .populate("userId")
        .populate("userFormId")

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
          }
          console.log("Fetched Resume Data:", resume); 
        res.json({
            message:"resume with tempate id",
            data:resume
        })
    } catch (error) {
        res.json({error})
    }
}

const deleteResume = async (req,res)=>{
    try {
        const deletedResume = await templateModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"Resume Was Deleted !!",
            data:deletedResume
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const totalResume = async(req,res)=>{
    try {
        const allResumes = await resumeModel.find()
        res.json({
            message:"All Resume Are Fetched !",
            data:allResumes
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const getTemplateUsageStats = async (req, res) => {
    try {
      const data = await resumeModel.aggregate([
        {
          $group: {
            _id: '$templateId',
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'templates',
            localField: '_id',
            foreignField: '_id',
            as: 'templateInfo'
          }
        },
        { $unwind: '$templateInfo' },
        {
          $project: {
            _id: 0,
            templateName: '$templateInfo.name',
            count: 1
          }
        }
      ]);
  
      const result = {};
      data.forEach(item => {
        result[item.templateName] = item.count;
      });
  
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

module.exports ={addResume,getIdByResume,deleteResume,totalResume , getTemplateUsageStats}