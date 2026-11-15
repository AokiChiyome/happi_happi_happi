import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    imgURL: {
      type: String,
    },
    // Tin nhắn thoại (Voice audio note)
    audioURL: {
      type: String,
    },
    audioDuration: {
      type: Number,
      default: 0,
    },
    // Trạng thái thu hồi tin nhắn (Unsend / Recall)
    isRecalled: {
      type: Boolean,
      default: false,
    },
    recalledAt: {
      type: Date,
    },
    // Thả cảm xúc / react icon trên tin nhắn
    reactions: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        emoji: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Trả lời / Reply trích dẫn tin nhắn
    replyTo: {
      messageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
      senderName: {
        type: String,
      },
      content: {
        type: String,
      },
      imgURL: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
