import { Schema, model } from "mongoose"
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  admin: Boolean,
  active: Boolean,
})

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
export default model('User', UserSchema)