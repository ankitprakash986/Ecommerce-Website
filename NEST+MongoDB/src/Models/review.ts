import * as mongoose from 'mongoose';


export const ReviewSchema = new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: String,
    description: String,
    rating: {
      type: Number,
      default: 0
    },
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  //Exporting the Review schema to reuse
  export default mongoose.model("Review", ReviewSchema);
