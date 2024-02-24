import { Document, Schema, model, models } from "mongoose";

export interface ISection extends Document {
  _id: string;
  title: string;
  description?: string;
  room?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  isEnrolled: boolean;
//   url?: string;
  category: { _id: string, name: string }
  // STUDENTS ARRAY
  admin: { _id: string, firstName: string, lastName: string }
}

const SectionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  room: { type: String },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  isEnrolled: { type: Boolean, default: false },
//   url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Section = models.Section || model('Section', SectionSchema);

export default Section;