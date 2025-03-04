const mongoose = require("mongoose")
const Schema = mongoose.Schema

const formSchema = new Schema({

        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        personal_info:{
            fullName:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                required:true
            },
            address:{
                type:String,
                
            },
            linkedin:{
                type:String,
            }
        },

        education:[{
            degree:{
                type:String,
                required:true
            },
            university:{
                type:String,
                required:true
            },
            year_of_passing:{
                type:Number,
                required:true
            },
            cgpa:{
                type:Number,
                
            }
        }],

        experience:[
            {
                job_title:{
                    type:String,
                    required:true
                },
                
                company_name:{
                    type:String,
                    
                },
                duration:{
                    type:String,
                }
            }
        ],

        skills:
            {
                technical_skills:{
                    type:[String],
                    required:true
                },
                
                soft_skills:{
                    type:[String],
                    required:true
                }
            },

        certificates:{
                title:{
                    type:String,
                    
                },
                platform:{
                    type:String,
                },
                year:{
                    type:Number,
                }
        },
        
        projects:[{

            title:{
                type:String,
               
            },
            description:{
                type:String,
                
            },
            technologies_used:{
                type:[String],
                
            },
            github_link:{
                type:String,
                
            }
        }],

        interests:{
            type:[String]
        },

        language:{
            type:[String]
        },

        additional_info:{
            type:String,
            default:null
        }

        

},{timestamps:true})

module.exports = mongoose.model("Forms", formSchema)