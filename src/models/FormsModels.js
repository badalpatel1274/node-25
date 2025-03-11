const mongoose = require("mongoose")
const Schema = mongoose.Schema

const formSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    templateId: {
        type: Schema.Types.ObjectId,
        ref:"Template"
    },
    resumeId:{
        type:Schema.Types.ObjectId,
        ref:"Resume",
        // required:true
    },
    profilePic:{
        type:String,
        
    },
    personal: {
        fullName: {
            type: String,
            // required:true
        },
        
        email: {
            type: String,
            // required:true
        },
        birthDate: {
            type: String,
        },
        phone: {
            type: Number,
            // required:true
        },
        address: {
            type: String,

        },
        linkedin: {
            type: String,
        }
    },

    education: {
        degree: {
            type: String,
            // required:true
        },
        university: {
            type: String,
            // required:true
        },
        year: {
            type: Number,
            // required:true
        },
        cgpa: {
            type: Number,

        }
    },

    experience: 
        {
            jobtTitle: {
                type: String,
                // required:true
            },

            companyName: {
                type: String,

            },
            year: {
                type: String,
            },
            projectTitle: {
                type: String
            },
            projectDescription: {
                type: String
            }
        }
    ,

    skills:
    {
        technical: {
            type: [String],
            // required: true
        },

        soft: {
            type: [String],
            // required: true
        },
        language: {
            type: [String],
        },
        interests: {
            type: [String],
        }
    },

    // certificates:{
    //         title:{
    //             type:String,

    //         },
    //         platform:{
    //             type:String,
    //         },
    //         year:{
    //             type:Number,
    //         }
    // },

    // projects:[{

    //     title:{
    //         type:String,

    //     },
    //     description:{
    //         type:String,

    //     },
    //     technologies_used:{
    //         type:[String],

    //     },
    //     github_link:{
    //         type:String,

    //     }
    // }],

    // interests:{
    //     type:[String]
    // },

    // language:{
    //     type:[String]
    // },

    additional_info: {
        type: String,
        default: null
    }



}, { timestamps: true })

module.exports = mongoose.model("Forms", formSchema)