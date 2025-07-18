import mongoose, { Schema, type Document } from "mongoose";
import { number } from "zod";

export interface IStudent extends Document {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  profileImageUrl: string;
  dateOfBirth: Date;

  studentId: string;
  isPermanentId: boolean;
  idConversionDate: Date;
  roomId: Schema.Types.ObjectId;
  bedNo: number;
  departmentId: Schema.Types.ObjectId;

  admissionYear: string;
  schoolRollNo: string;
  standard: number;
  medium: 'Gujarati' | 'English' | 'Hindi';
  lastExamGiven: string;
  lastExamPercentage: number;
  
  hobbies: string[];
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  illnesses: string[];
  allergies: string[];

  fatherName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  fatherMobileNumber: string;
  fatherOccupation: string;
  motherName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  motherMobileNumber: string;
  motherOccupation: string;

  address: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };

  admissionDate: Date;
  leavingDate: Date;
  nocDate: Date;

  status: 'Pending' | 'Tested' | 'Active' | 'NOC' | 'NOC-Cancel';

  isSatsangi: boolean;
  isBAPSSatsangi: boolean;
  yearOfSatsang: number;

  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      middleName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    profileImageUrl: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isPermanentId: {
      type: Boolean,
      default: false,
      required: false,
    },
    idConversionDate: {
      type: Date,
      required: false,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: false,
    },
    bedNo: {
      type: Number,
      required: false,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: false,
    },
    admissionYear: {
      type: String,
      required: true,
    },
    schoolRollNo: {
      type: String,
      required: true,
    },
    standard: {
      type: Number,
      required: true,
      min: [1, 'Standard must be >= 1'],
      max: [12, 'Standard must be <= 12'],
    },
    medium: {
      type: String,
      enum: {
        values: ['Gujarati', 'English', 'Hindi'],
        message: 'Medium must be Gujarati, English or Hindi',
      },
      required: true,
    },
    lastExamGiven: {
      type: String,
      required: true,
    },
    lastExamPercentage: {
      type: Number,
      required: true,
    },
    hobbies: {
      type: [String],
      required: false,
    },
    bloodGroup: {
      type: String,
      required: false,
    },
    illnesses: {
      type: [String],
      required: false,
    },
    allergies: {
      type: [String],
      required: false,
    },
    fatherName: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      middleName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    fatherMobileNumber: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    motherName: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      middleName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    motherMobileNumber: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },

    address: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    admissionDate: {
      type: Date,
      required: true,
    },
    leavingDate: {
      type: Date,
      required: false,
    },
    nocDate: {
      type: Date,
      required: false,
    },

    status: {
      type: String,
      enum: {
        values: ['Pending', 'Tested', 'Active', 'NOC', 'NOC-Cancel'],
        message: 'Invalid status value',
      },
      default: 'Pending',
      required: true,
    },

    isSatsangi: {
      type: Boolean,
      required: true,
    },
    isBAPSSatsangi: {
      type: Boolean,
      required: false,
    },
    yearOfSatsang: {
      type: Number,
      required: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||  mongoose.model<IStudent>('Student', StudentSchema);
