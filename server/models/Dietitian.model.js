import mongoose from "mongoose";

const dietitianSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    certification: { type: String, required: true },
    profile_img: { type: String },  // Image URL or file path to dietitian's profile picture
    clinic_address: { type: String },  // Clinic address
});

const Dietitian = mongoose.model("Dietitian", dietitianSchema);
export default User;

// import mongoose from "mongoose";

// const dietitianSchema = mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   specialization: { type: String, required: true },
//   experience: { type: String, required: true },
//   certification: { type: String, required: true },
//   profile_img: { type: String },  // Image URL or file path
//   clinic_address: { type: String },  // Clinic address

//   languages: [{ type: String }],        // Array of languages
//   services: [                           // Array of service objects
//     {
//       name: { type: String, required: true },
//       description: { type: String },
//       price: { type: Number },           // optional
//       duration: { type: String },        // e.g., "30 minutes", "1 hour"
//     }
//   ],
//   clientsWorkedWith: [{ type: String }], // Array of client types
//   education: { type: String },            // Education info
// });

// const Dietitian = mongoose.model("Dietitian", dietitianSchema);
// export default Dietitian;
