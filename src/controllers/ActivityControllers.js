const activityModels = require('../models/ActivityModels')

const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000); // in minutes
  
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff} minute${diff > 1 ? "s" : ""} ago`;
  
    const hrs = Math.floor(diff / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

 exports.getRecentActivity = async(req,res)=>{
try {
    const activities = await activityModels.find().sort({createdAt: -1}).limit(3)

    const formatted = activities.map((act) => ({
        message: act.message,
        user: act.user,
        time: timeAgo(act.createdAt),
      }));
    res.json({activities : formatted})
} catch (error) {
    res.status(500).json({error})
}

}

