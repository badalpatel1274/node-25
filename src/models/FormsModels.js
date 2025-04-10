const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensuring user association
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
    profilePic: {
      type: String,
    },

    personal: {
      fullName: { type: String, required: true },
      aboutMe: { type: String },
      jobTitle: { type: String },
      email: { type: String, required: true },
      birthDate: { type: String },
      phone: { type: String, required: true },
      address: { type: String },
      linkedin: { type: String },
    },

    education: [
      {
        degree: { type: String, required: true },
        university: { type: String, required: true },
        year: { type: Number, required: true },
        cgpa: { type: Number },
      },
    ],

    experience: {
      
        items: [
          {
            companyName: { type: String },
            companyExp: { type: String },
            jobDescription: { type: String },
          },
        ],
        projects: [
          {
            title: { type: String },
            description: { type: String },
          },
        ],
      
      },

    skills: {
      technical: { type: [String], required: true },
      soft: { type: [String], required: true },
      language: { type: [String] },
      interests: { type: [String] },
    },

    additional_info: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forms", formSchema);
