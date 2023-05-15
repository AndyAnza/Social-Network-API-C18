const { Schema, model } = require("mongoose");
const userSchema = require("./user");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: Schema.Types.ObjectId,
  },
  reactionBody: { type: String, required: true, max_length: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, min_length: 1, max_length: 280 },
  createdAt: { type: Date, default: Date.now },
  userName: { userSchema, type: String, required: true },
  reactions: [reactionSchema],
});

const thought = model("thought", thoughtSchema);

module.exports = thought;
