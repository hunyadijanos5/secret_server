const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const secretSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true },
  secret: { type: String, required: true },
  redeemLeft: { type: Number, required: false, default: 10 },
  createdAt: { type: Date, required: false, default: new Date() },
  password: { type: String, required: false },
});

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY || 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text) {
  const [iv, encryptedText] = text.split(':');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
  return decrypted.toString();
}

secretSchema.pre('save', async function (next) {
  if (this.isModified('secret')) {
    this.secret = encrypt(this.secret);
  }
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

secretSchema.methods.decryptSecret = function () {
  return decrypt(this.secret);
};

secretSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Secret', secretSchema);
