import mongoose, { Schema } from 'mongoose';
import { IStudentDocument } from '../types/models';

const studentSchema = new Schema<IStudentDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please add a valid email'],
    },
    grade: {
      type: String,
      required: [true, 'Please add a grade'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Please add age'],
      min: [5, 'Age must be at least 5'],
      max: [100, 'Age must be less than 100'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudentDocument>('Student', studentSchema);