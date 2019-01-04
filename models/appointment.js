const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zipcode: {type: String},
    whenToContact: { type: Array },
    jobDescription: { type: Array },
    jobScheduledDate: { type: Date },
    numberOfHandymen: { type: String },
    isEmergency: { type: Boolean, default: false },
    projectPercentage: {type: Number, default: 5},
    userId : [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    paymentsDue: { type: Array},
    paymentsCompleted: { type: Array}
});

AppointmentSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Project", AppointmentSchema);
  