

## File: D:\Study\moji\Backend\src\server.js

```js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cookiePaser from "cookie-parser";
import { protectedRoute } from "./middlewares/authmiddleware.js";
import friendRoute from "./routes/friendRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import conversationRoute from "./routes/conversationRoute.js";

dotenv.config(); // dotenv se khoi tao cac bien moi truong o day
// khoi tao
const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use(cookiePaser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

//pulic router
app.use("/api/auth", authRoute);

//private router
app.use(protectedRoute);
app.use("/api/users", userRoute);
app.use("/api/friends", friendRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server báº¯t Ä‘áº§u trÃªn cá»•ng ${PORT}`);
  });
});

```


## File: D:\Study\moji\Backend\src\controllers\authController.js

```js
// @ts-nocheck
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "30m"; // thuá»ng lÃ  dÆ°á»›i 15m
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngÃ y

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        message:
          "KhÃ´ng thá»ƒ thiáº¿u username, password, email, firstName, vÃ  lastName",
      });
    }

    // kiá»ƒm tra username tá»“n táº¡i chÆ°a
    const duplicate = await User.findOne({ username });

    if (duplicate) {
      return res.status(409).json({ message: "username Ä‘Ã£ tá»“n táº¡i" });
    }

    // mÃ£ hoÃ¡ password
    const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

    // táº¡o user má»›i
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: ` ${lastName} ${firstName}`,
    });

    // return
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lá»—i khi gá»i signUp", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const signIn = async (req, res) => {
  try {
    // láº¥y inputs
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Thiáº¿u username hoáº·c password." });
    }

    // láº¥y hashedPassword trong db Ä‘á»ƒ so vá»›i password input
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "username hoáº·c password khÃ´ng chÃ­nh xÃ¡c" });
    }

    // kiá»ƒm tra password
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: "username hoáº·c password khÃ´ng chÃ­nh xÃ¡c" });
    }

    // náº¿u khá»›p, táº¡o accessToken vá»›i JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      // @ts-ignore
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // táº¡o refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // táº¡o session má»›i Ä‘á»ƒ lÆ°u refresh token
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // tráº£ refresh token vá» trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none", //backend, frontend deploy riÃªng
      maxAge: REFRESH_TOKEN_TTL,
    });

    // tráº£ access token vá» trong res
    return res
      .status(200)
      .json({ message: `User ${user.displayName} Ä‘Ã£ logged in!`, accessToken });
  } catch (error) {
    console.error("Lá»—i khi gá»i signIn", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const signOut = async (req, res) => {
  try {
    // láº¥y refresh token tá»« cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      // xoÃ¡ refresh token trong Session
      await Session.deleteOne({ refreshToken: token });

      // xoÃ¡ cookie
      res.clearCookie("refreshToken");
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lá»—i khi gá»i signOut", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

// táº¡o access token má»›i tá»« refresh token
export const refreshToken = async (req, res) => {
  try {
    // láº¥y refresh token tá»« cookie
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Token khÃ´ng tá»“n táº¡i." });
    }

    // so vá»›i refresh token trong db
    const session = await Session.findOne({ refreshToken: token });

    if (!session) {
      return res
        .status(403)
        .json({ message: "Token khÃ´ng há»£p lá»‡ hoáº·c Ä‘Ã£ háº¿t háº¡n" });
    }

    // kiá»ƒm tra háº¿t háº¡n chÆ°a
    if (session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Token Ä‘Ã£ háº¿t háº¡n." });
    }

    // táº¡o access token má»›i
    const accessToken = jwt.sign(
      {
        userId: session.userId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );
    // return
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lá»—i khi gá»i refreshToken", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

```


## File: D:\Study\moji\Backend\src\controllers\conversationController.js

```js
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const createConversation = async (req, res) => {
  try {
    const { type, name, memberIds } = req.body;
    const userId = req.user._id;

    if (
      !type ||
      (type === "group" && !name) ||
      !memberIds ||
      !Array.isArray(memberIds) ||
      memberIds.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "TÃªn nhÃ³m vÃ  danh sÃ¡ch thÃ nh viÃªn lÃ  báº¯t buá»™c" });
    }

    let conversation;

    if (type === "direct") {
      const participantId = memberIds[0];
      console.log("CREATE CONVERSATION CALLED");

      // Ã‰P KIá»‚U á»ž ÄÃ‚Y
      const userObjId = new mongoose.Types.ObjectId(userId);
      const participantObjId = new mongoose.Types.ObjectId(participantId);

      // Sá»­ dá»¥ng findOneAndUpdate vá»›i upsert Ä‘á»ƒ trÃ¡nh duplicate
      conversation = await Conversation.findOneAndUpdate(
        {
          type: "direct",
          "participants.userId": { $all: [userObjId, participantObjId] },
        },
        {
          $setOnInsert: {
            type: "direct",
            participants: [{ userId }, { userId: participantId }],
            lastMessageAt: new Date(),
          },
        },
        {
          upsert: true,
          new: true,
        },
      );
    }

    if (type === "group") {
      conversation = new Conversation({
        type: "group",
        participants: [{ userId }, ...memberIds.map((id) => ({ userId: id }))],
        group: {
          name,
          createdBy: userId,
        },
        lastMessageAt: new Date(),
      });

      await conversation.save();
    }

    if (!conversation) {
      return res
        .status(400)
        .json({ message: "Conversation type khÃ´ng há»£p lá»‡" });
    }

    await conversation.populate([
      { path: "participants.userId", select: "displayName avatarUrl" },
      {
        path: "seenBy",
        select: "displayName avatarUrl",
      },
      { path: "lastMessage.senderId", select: "displayName avatarUrl" },
    ]);

    const participants = (conversation.participants || []).map((p) => ({
      _id: p.userId?._id,
      displayName: p.userId?.displayName,
      avatarUrl: p.userId?.avatarUrl ?? null,
      joinedAt: p.joinedAt,
    }));

    const formatted = { ...conversation.toObject(), participants };

    // ÄÃ£ gá»¡ bá» logic io.to().emit("new-group") á»Ÿ Ä‘Ã¢y

    return res.status(201).json({ conversation: formatted });
  } catch (error) {
    console.error("Lá»—i khi táº¡o conversation", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({
      "participants.userId": userId,
    })
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .populate({
        path: "participants.userId",
        select: "displayName avatarUrl",
      })
      .populate({
        path: "lastMessage.senderId",
        select: "displayName avatarUrl",
      })
      .populate({
        path: "seenBy",
        select: "displayName avatarUrl",
      });

    const formatted = conversations.map((convo) => {
      const participants = (convo.participants || []).map((p) => ({
        _id: p.userId?._id,
        displayName: p.userId?.displayName,
        avatarUrl: p.userId?.avatarUrl ?? null,
        joinedAt: p.joinedAt,
      }));

      return {
        ...convo.toObject(),
        unreadCounts: convo.unreadCounts || {},
        participants,
      };
    });

    return res.status(200).json({ conversations: formatted });
  } catch (error) {
    console.error("Lá»—i xáº£y ra khi láº¥y conversations", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, cursor } = req.query;

    const query = { conversationId };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    let messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) + 1);

    let nextCursor = null;

    if (messages.length > Number(limit)) {
      const nextMessage = messages[messages.length - 1];
      nextCursor = nextMessage.createdAt.toISOString();
      messages.pop();
    }

    messages = messages.reverse();

    return res.status(200).json({
      messages,
      nextCursor,
    });
  } catch (error) {
    console.error("Lá»—i xáº£y ra khi láº¥y messages", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const markAsSeen = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id.toString();

    const conversation = await Conversation.findById(conversationId).lean();

    if (!conversation) {
      return res.status(404).json({ message: "Conversation khÃ´ng tá»“n táº¡i" });
    }

    const last = conversation.lastMessage;

    if (!last) {
      return res
        .status(200)
        .json({ message: "KhÃ´ng cÃ³ tin nháº¯n Ä‘á»ƒ mark as seen" });
    }

    if (last.senderId.toString() === userId) {
      return res.status(200).json({ message: "Sender khÃ´ng cáº§n mark as seen" });
    }

    const updated = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: { seenBy: userId },
        $set: { [`unreadCounts.${userId}`]: 0 },
      },
      {
        new: true,
      },
    );

    // ÄÃ£ gá»¡ bá» logic io.to().emit("read-message") á»Ÿ Ä‘Ã¢y

    return res.status(200).json({
      message: "Marked as seen",
      seenBy: updated?.seenBy || [],
      myUnreadCount: updated?.unreadCounts[userId] || 0,
    });
  } catch (error) {
    console.error("Lá»—i khi mark as seen", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

```


## File: D:\Study\moji\Backend\src\controllers\friendController.js

```js
import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const sendFriendrequest = async (req, res) => {
  try {
    const { to, message } = req.body;
    const from = req.user._id;

    if (from == to) {
      return res
        .status(400)
        .json({ message: "KhÃ´ng thá»ƒ gá»­i yÃªu cáº§u káº¿t báº¡n vá»›i chÃ­nh mÃ¬nh" });
    }

    const userExists = await User.exists({ _id: to });
    if (!userExists) {
      return res.status(404).json({ message: "NgÆ°á»i dÃ¹ng khÃ´ng tá»“n táº¡i" });
    }

    let userA = from.toString();
    let userB = to.toString();
    if (userA > userB) {
      [userA, userB] = [userB, userA];
    }
    const [alreadyFriends, existingRequest] = await Promise.all([
      Friend.findOne({ userA, userB }),
      FriendRequest.findOne({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }),
    ]);
    if (alreadyFriends) {
      return res.status(400).json({ message: "ÄÃ£ lÃ  báº¡n bÃ¨ rá»“i" });
    }
    if (existingRequest) {
      return res.status(400).json({ message: "YÃªu cáº§u káº¿t báº¡n Ä‘Ã£ tá»“n táº¡i" });
    }
    const request = await FriendRequest.create({
      from,
      to,
      message,
    });
    return res.status(200).json({ message: "ÄÃ£ gá»­i yÃªu cáº§u káº¿t báº¡n", request });
  } catch (error) {
    console.error("Lá»—i khi thÃªm báº¡n bÃ¨", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "YÃªu cáº§u káº¿t báº¡n khÃ´ng tá»“n táº¡i" });
    }

    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "KhÃ´ng cÃ³ quyá»n cháº¥p nháº­n yÃªu cáº§u nÃ y" });
    }

    const friend = await Friend.create({
      userA: request.from,
      userB: request.to,
    });
    await FriendRequest.findByIdAndDelete(requestId);

    const from = await User.findById(request.from)
      .select("_id displayName avatarUrl")
      .lean();

    return res.status(200).json({
      message: "ÄÃ£ cháº¥p nháº­n yÃªu cáº§u káº¿t báº¡n",
      newFriend: {
        _id: from?._id,
        displayName: from?.displayName,
        avatarUrl: from?.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Lá»—i khi cháº¥p nháº­n yÃªu cáº§u káº¿t báº¡n", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "YÃªu cáº§u káº¿t báº¡n khÃ´ng tá»“n táº¡i" });
    }
    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "KhÃ´ng cÃ³ quyá»n tá»« chá»‘i yÃªu cáº§u nÃ y" });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    return res.status(200).json({ message: "ÄÃ£ tá»« chá»‘i yÃªu cáº§u káº¿t báº¡n" });
  } catch (error) {
    console.error("Lá»—i khi tá»« chá»‘i yÃªu cáº§u káº¿t báº¡n", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};
export const getAllFriend = async (req, res) => {
  try {
    const userId = req.user._id;

    const friendships = await Friend.find({
      $or: [{ userA: userId }, { userB: userId }],
    })
      .populate("userA", "_id displayName avatarUrl")
      .populate("userB", "_id displayName avatarUrl")
      .lean();
    if (!friendships) {
      return res.status(200).json({ friends: [] });
    }
    const friends = friendships.map((f) =>
      f.userA._id.toString() === userId.toString() ? f.userB : f.userA
    );
    return res.status(200).json({ friends });
  } catch (error) {
    console.error("Lá»—i khi láº¥y danh sÃ¡ch báº¡n bÃ¨", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};
export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const populateFields = "_id displayName avatarUrl";
    const [sent, received] = await Promise.all([
      FriendRequest.find({ from: userId }).populate("to", populateFields),

      FriendRequest.find({ to: userId }).populate("from", populateFields),
    ]);
    return res.status(200).json({ sent, received });
  } catch (error) {
    console.error("Lá»—i khi láº¥y danh sÃ¡ch yÃªu cáº§u káº¿t báº¡n", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

```


## File: D:\Study\moji\Backend\src\controllers\messageController.js

```js
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateconversationAfterCreateMessage } from "../utils/messageHelper.js";
import mongoose from "mongoose"; // THÃŠM DÃ’NG NÃ€Y VÃ€O Äáº¦U FILE

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;
    let conversation;

    if (!content) {
      return res.status(400).json({ error: "thiáº¿u ná»™i dung" });
    }

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }

    if (!conversation) {
      // Ã‰P KIá»‚U SANG OBJECTID á»ž ÄÃ‚Y
      const senderObjId = new mongoose.Types.ObjectId(senderId);
      const recipientObjId = new mongoose.Types.ObjectId(recipientId);

      // TÃ¬m conversation existing giá»¯a sender vÃ  recipient
      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [senderObjId, recipientObjId] },
      });

      if (!conversation) {
        // Náº¿u khÃ´ng cÃ³, táº¡o má»›i
        conversation = await Conversation.create({
          type: "direct",
          participants: [
            { userId: senderId, joinedAt: new Date() },
            { userId: recipientId, joinedAt: new Date() },
          ],
          lastMessageAt: new Date(),
          unreadCounts: new Map(),
        });
      }
    }
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });
    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();
    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lá»—i khi gá»­i tin nháº¯n trá»±c tiáº¿p", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

export const sendGroupMessage = async (req, res) => {
  // ... (Pháº§n code nÃ y giá»¯ nguyÃªn nhÆ° cÅ© cá»§a báº¡n)
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!content) {
      return res.status(400).json({ error: "thiáº¿u ná»™i dung" });
    }
    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });
    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();
    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lá»—i khi gá»­i tin nháº¯n nhÃ³m", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};

```


## File: D:\Study\moji\Backend\src\controllers\userController.js

```js
export const authMe = async (req, res) => {
  try {
    const user = req.user; // láº¥y tá»« authMiddleware
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("lá»—i khi gá»i authMe", error);
    return res.status(500).json({ Message: "lá»—i há»‡ thá»‘ng" });
  }
};

```


## File: D:\Study\moji\Backend\src\libs\db.js

```js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("ket noi thanh cong voi csdl");
  } catch (error) {
    console.log("khong ket noi duoc voi csdl", error);
    process.exit(1);
  }
};

```


## File: D:\Study\moji\Backend\src\middlewares\authmiddleware.js

```js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = (req, res, next) => {
  try {
    // láº¥y token tá»« header
    const authHeader = req.headers["authorization"]; // láº¥y pháº§n authrization cá»§a header
    const token = authHeader && authHeader.split(" ")[1]; // láº¥y acesstoken Ä‘áº±ng sau baerer
    if (!token) {
      return res.status(401).json({ message: "khÃ´ng tÃ¬m tháº¥y token" });
    }
    // xÃ¡c nháº­n token há»£p lá»‡
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(403)
            .json({ message: "access token háº¿t háº¡n hoáº·c khÃ´ng Ä‘Ãºng" });
        }
        // tÃ¬m user
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword"
        );
        if (!user) {
          return res.status(404).json({ message: "ngÆ°á»i dÃ¹ng khÃ´ng tá»“n táº¡i" });
        }
        // tráº£ user vá» trong req
        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.error("lá»—i khi xÃ¡c minh JWT trong authmiddleware", error);
    return res.status(500).json({ message: "lá»—i há»‡ thá»‘ng" });
  }
};

```


## File: D:\Study\moji\Backend\src\middlewares\friendmiddleware.js

```js
import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);
export const CheckFriendship = async (req, res, next) => {
  try {
    const me = req.user._id.toString();
    const recipientId = req.body?.recipientId ?? null;
    const memberIds = req.body?.memberIds ?? [];
    if (!recipientId && memberIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Thiáº¿u recipientId hoáº·c memberIds" });
    }
    if (recipientId) {
      const [userA, userB] = pair(me, recipientId);
      const isFriend = await Friend.findOne({ userA, userB });
      if (!isFriend) {
        return res
          .status(403)
          .json({ message: "Báº¡n chÆ°a káº¿t báº¡n vá»›i ngÆ°á»i nÃ y" });
      }
      return next();
    }
    //todo: chat nhÃ³m

    const friendChecks = memberIds.map(async (memberId) => {
      const [userA, userB] = pair(me, memberId);
      const friend = await Friend.findOne({ userA, userB });
      return friend ? null : memberId;
    });
    const results = await Promise.all(friendChecks);
    const notFriends = results.filter(Boolean);
    if (notFriends.length > 0) {
      return res.status(403).json({
        message: "báº¡n chá»‰ cÃ³ thá»ƒ thÃªm báº¡n bÃ¨ vÃ o nhÃ³m",
        notFriends,
      });
    }
    next();
  } catch (error) {
    console.error("Lá»—i khi kiá»ƒm tra tráº¡ng thÃ¡i báº¡n bÃ¨", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng" });
  }
};
export const CheckGroupMembership = async (req, res, next) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Cuá»™c trÃ² chuyá»‡n khÃ´ng tá»“n táº¡i" });
    }
    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === userId.toString(),
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Báº¡n khÃ´ng pháº£i lÃ  thÃ nh viÃªn cá»§a nhÃ³m nÃ y" });
    }
    req.conversation = conversation; // LÆ°u thÃ´ng tin cuá»™c trÃ² chuyá»‡n vÃ o req Ä‘á»ƒ sá»­ dá»¥ng trong controller
    next();
  } catch (error) {
    console.error("Lá»—i khi kiá»ƒm tra thÃ nh viÃªn nhÃ³m", error);
    return res.status(500).json({ message: "Lá»—i há»‡ thá»‘ng1" });
  }
};

```


## File: D:\Study\moji\Backend\src\models\Conversation.js

```js
import mongoose from "mongoose";

const lastMessageSchema = new mongoose.Schema(
  {
    _id: { type: String },
    content: {
      type: String,
      default: { type: String },
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);
const participantShema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false },
);

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },
    participants: {
      type: [participantShema],
      required: true,
    },
    group: {
      type: groupSchema,
    },
    lastMessageAt: {
      type: Date,
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: lastMessageSchema,
      ref: "Message",
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

conversationSchema.index({
  type: 1,
  "participants.userId": 1,
});

conversationSchema.index({
  "participants.userId": 1,
  lastMessageAt: -1,
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;

```


## File: D:\Study\moji\Backend\src\models\Friend.js

```js
import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

friendSchema.pre("save", function () {
  const a = this.userA.toString();
  const b = this.userB.toString();
  if (a > b) {
    this.userA = new mongoose.Types.ObjectId(b);
    this.userB = new mongoose.Types.ObjectId(a);
  }
});

friendSchema.index({ userA: 1, userB: 1 }, { unique: true });
const Friend = mongoose.model("Friend", friendSchema);
export default Friend;

```


## File: D:\Study\moji\Backend\src\models\FriendRequest.js

```js
import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Message: {
      type: String,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });
friendRequestSchema.index({ from: 1 });
friendRequestSchema.index({ to: 1 });
const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
export default FriendRequest;

```


## File: D:\Study\moji\Backend\src\models\Message.js

```js
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
  },
  { timestamps: true }
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;

```


## File: D:\Study\moji\Backend\src\models\Session.js

```js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//tá»± Ä‘á»™ng xÃ³a thá»i gian háº¿t háº¡n
sessionSchema.index({ expiresAt: 1 }, { exouresAfterSeconds: 0 }); // nÃ³ sáº½ tá»± Ä‘á»™ng xÃ³a token trong bao nhiÃªu ngÃ y
export default mongoose.model("Session", sessionSchema);

```


## File: D:\Study\moji\Backend\src\models\User.js

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // pháº£i cÃ³ giÃ¡ trá»‹
      unique: true, // Ä‘á»™c nháº¥t
      trim: true, // loáº¡i bá» khoáº£ng cÃ¡ch 2 Ä‘áº§u
      lowercase: true, // Ä‘Æ°a vá» chá»¯ thÆ°á»ng
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String, // link Ä‘á»ƒ hiá»‡n thá»‹ hÃ¬nh
    },
    avatarId: {
      type: String, // cloudinary public_id dÃ¹ng Ä‘á»ƒ xÃ³a hÃ¬nh
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    phone: {
      type: String,
      sparse: true, // cho phÃ©p null, nhÆ°ng phÃ©p trÃ¹ng
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;

```


## File: D:\Study\moji\Backend\src\routes\authRoute.js

```js
import express from "express";
import {
  refreshToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/signout", signOut);

router.post("/refresh", refreshToken);

export default router;

```


## File: D:\Study\moji\Backend\src\routes\conversationRoute.js

```js
import express from "express";
import {
  createConversation,
  getConversations,
  getMessage,
  markAsSeen,
} from "../controllers/conversationController.js";
import { CheckFriendship } from "../middlewares/friendMiddleware.js";

const router = express.Router();

router.post("/", CheckFriendship, createConversation);
router.get("/", getConversations);
router.get("/:conversationId/messages", getMessage);
router.patch("/:conversationId/seen", markAsSeen);

export default router;

```


## File: D:\Study\moji\Backend\src\routes\friendRoute.js

```js
import express from "express";

import {
  sendFriendrequest,
  declineFriendRequest,
  acceptFriendRequest,
  getAllFriend,
  getFriendRequests,
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/requests", sendFriendrequest);
router.post("/requests/:requestId/accept", acceptFriendRequest);
router.post("/requests/:requestId/decline", declineFriendRequest);

router.get("/", getAllFriend);
router.get("/requests", getFriendRequests);

export default router;

```


## File: D:\Study\moji\Backend\src\routes\messageRoute.js

```js
import express from "express";

import {
  sendDirectMessage,
  sendGroupMessage,
} from "../controllers/messageController.js";
import {
  CheckFriendship,
  CheckGroupMembership,
} from "../middlewares/friendmiddleware.js";

const router = express.Router();

router.post("/direct", CheckFriendship, sendDirectMessage);
router.post("/group", CheckGroupMembership, sendGroupMessage);
export default router;

```


## File: D:\Study\moji\Backend\src\routes\userRoute.js

```js
import express from "express";
import { authMe } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMe);
export default router;

```


## File: D:\Study\moji\Backend\src\utils\messageHelper.js

```js
export const updateconversationAfterCreateMessage = (
  conversation,
  message,
  senderId,
) => {
  conversation.set({
    seenBy: [],
    lastMessageAt: message.createdAt,
    lastMessage: {
      _id: message._id,
      content: message.content,
      senderId,
      createdAt: message.createdAt,
    },
  });
  conversation.participants.forEach((p) => {
    const memberId = p.userId.toString();
    const isSender = memberId === senderId.toString();
    const prevCount = conversation.unreadCounts.get(memberId) || 0;
    conversation.unreadCounts.set(memberId, isSender ? 0 : prevCount + 1);
  });
};

```


## File: D:\Study\moji\frontend\eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```


## File: D:\Study\moji\frontend\index.html

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Moji</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```


## File: D:\Study\moji\frontend\tailwind.config.ts

```ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chat: {
          "bubble-sent": "hsl(var(--chat-bubble-sent))",
          "bubble-sent-fg": "hsl(var(--chat-bubble-sent-foreground))",
          "bubble-received": "hsl(var(--chat-bubble-received))",
          "bubble-received-fg": "hsl(var(--chat-bubble-received-foreground))",
        },
        status: {
          online: "hsl(var(--online))",
          offline: "hsl(var(--offline))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

```


## File: D:\Study\moji\frontend\vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```


## File: D:\Study\moji\frontend\src\App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```


## File: D:\Study\moji\frontend\src\App.tsx

```tsx
import { BrowserRouter, Route, Routes } from "react-router";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ChatAppPage } from "./pages/ChatAppPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useThemeStore } from "./stores/useThemeStore";
import { use, useEffect } from "react";

function App() {
  const { isDark, setTheme } = useThemeStore();
  useEffect(() => {
    setTheme(isDark);
  }, [isDark]);
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

```


## File: D:\Study\moji\frontend\src\index.css

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
@config "../tailwind.config.ts";

@layer base {
  :root {
    /* Base colors - soft pastels */
    --background: 0 0% 100%; /*violet-50*/
    --foreground: 217.2 32.6% 17.5%; /* slate-800 */

    /* Card system */
    --card: 250 100% 99%;
    --card-foreground: 217.2 32.6% 17.5%;

    /* Popover system */
    --popover: 250 100% 99%;
    --popover-foreground: 240 15% 15%;

    /* Primary */
    /* TÃ­m */
    --primary: 271 79% 47%;
    --primary-foreground: 210 40% 96.1%; /*slate-100*/
    /* Há»“ng */
    --primary-glow: 320 100% 70%;

    /* Secondary - lavender */
    --secondary: 270 50% 92%;
    --secondary-foreground: 280 100% 40%;

    /* Muted */
    --muted: 260 30% 95%;
    --muted-foreground: 240 15% 50%;

    /* Accent - cyan */
    --accent: 180 100% 75%;
    --accent-foreground: 240 100% 15%;

    /* Chat colors */
    --chat-bubble-sent: 271 79% 47%;
    --chat-bubble-sent-foreground: 0 0% 100%;
    --chat-bubble-received: 0 0% 96%;
    --chat-bubble-received-foreground: 240 15% 15%;

    /* Status colors */
    --online: 140 100% 50%;
    --offline: 0 0% 70%;

    /* Warning */
    --warning: 37.7 92.1% 50.2%;
    --warning-foreground: 0 0% 100%;

    /* Info */
    --info: 198.6 88.7% 48.4%;
    --info-foreground: 0 0% 100%;

    /* Destructive */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 100%;

    /* Border and input */
    --border: 282 16% 87%;
    --input: 260 30% 92%;
    --ring: 271 79% 47%;

    /* Design system values */
    --radius: 1rem;

    /* Gradients */
    --gradient-primary: linear-gradient(
      135deg,
      hsl(var(--primary)),
      hsl(var(--primary-glow))
    );
    --gradient-chat: linear-gradient(
      135deg,
      hsl(280, 100%, 65%),
      hsl(320, 100%, 70%)
    );
    --gradient-accent: linear-gradient(
      90deg,
      hsl(var(--accent)),
      hsl(200, 100%, 70%)
    );

    --gradient-glass: linear-gradient(
      135deg,
      hsl(250, 100%, 98%) 0%,
      hsl(260, 50%, 96%) 100%
    );

    /* pattern craft */
    --gradient-purple: radial-gradient(
      125% 125% at 50% 10%,
      hsla(0, 0%, 100%, 1) 40%,
      hsla(262, 83%, 58%, 0.5) 100%
    );

    /* Shadows */
    --shadow-soft: 0 8px 32px -8px hsl(271 79% 47% / 0.15);
    --shadow-glow: 0 0 40px hsl(var(--primary) / 0.3);
    --shadow-bubble: 0 4px 20px -4px hsl(280 50% 70% / 0.2);

    /* Sidebar */
    --sidebar-background: 0 0% 100%;

    --sidebar-foreground: 215.3 25% 26.7%; /*slate-700*/

    --sidebar-primary: 240 5.9% 10%;

    --sidebar-primary-foreground: 0 0% 98%;

    --sidebar-accent: 240 4.8% 95.9%;

    --sidebar-accent-foreground: 240 5.9% 10%;

    --sidebar-border: 220 13% 91%;

    --sidebar-ring: 217.2 91.2% 59.8%;

    /* Animations */
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .dark {
    /* Dark mode - neon on dark aesthetic */
    --background: 240 15% 18%;
    --foreground: 214.3 31.8% 91.4%; /* slate-200 */

    --card: 240 15% 12%;
    --card-foreground: 214.3 31.8% 91.4%;

    --popover: 240 15% 12%;
    --popover-foreground: 250 100% 95%;

    --primary: 280 100% 70%;
    --primary-foreground: 240 15% 8%;
    --primary-glow: 320 100% 80%;

    --secondary: 270 20% 20%;
    --secondary-foreground: 280 100% 80%;

    --muted: 240 15% 15%;
    --muted-foreground: 240 15% 70%;

    --accent: 180 100% 60%;
    --accent-foreground: 240 15% 8%;

    /* Chat bubbles in dark mode */
    --chat-bubble-sent: 280 100% 65%;
    --chat-bubble-sent-foreground: 0 0% 100%;
    --chat-bubble-received: 240 15% 18%;
    --chat-bubble-received-foreground: 250 100% 90%;

    /* Status colors */
    --online: 140 100% 60%;
    --away: 45 100% 65%;
    --offline: 0 0% 50%;

    --destructive: 0 80% 47%;
    --destructive-foreground: 0 0% 100%;

    --border: 281 15% 25%;
    --input: 240 15% 18%;
    --ring: 280 100% 70%;

    /* Dark mode gradients */
    --gradient-primary: linear-gradient(
      135deg,
      hsl(280, 100%, 70%),
      hsl(320, 100%, 80%)
    );
    --gradient-chat: linear-gradient(
      135deg,
      hsl(280, 100%, 70%),
      hsl(320, 100%, 75%)
    );
    --gradient-accent: linear-gradient(
      90deg,
      hsl(180, 100%, 60%),
      hsl(200, 100%, 70%)
    );
    --gradient-glass: linear-gradient(
      45deg,
      hsl(240, 15%, 12%) 0%,
      hsl(240, 15%, 18%) 100%
    );

    --gradient-purple: radial-gradient(
      125% 125% at 50% 10%,
      hsla(0, 0%, 0%, 1) 40%,
      hsla(310, 96%, 11%, 0.5) 100%
    );

    /* Dark shadows with glow */
    --shadow-soft: 0 8px 32px -8px hsl(280 100% 70% / 0.25);
    --shadow-glow: 0 0 40px hsl(var(--primary) / 0.4);
    --shadow-bubble: 0 4px 20px -4px hsl(280 80% 50% / 0.3);

    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  body {
    @apply text-slate-800 dark:text-slate-200;
  }
}

/* Chat App Utility Classes */
@layer components {
  .glass {
    @apply bg-gradient-to-br from-violet-200/10 to-pink-100/5 border-violet-300/30;
  }

  .dark .glass {
    @apply backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20;
  }

  .glass-strong {
    @apply backdrop-blur-2xl bg-gradient-to-br from-card/90 to-card/60 border border-border/70;
  }

  /* Chat bubble variants */
  .chat-bubble-sent {
    @apply bg-primary/80! text-[hsl(var(--chat-bubble-sent-foreground))]! shadow-[var(--shadow-bubble)];
  }

  .chat-bubble-received {
    @apply bg-[hsl(var(--chat-bubble-received))] text-[hsl(var(--chat-bubble-received-foreground))] border border-border/50;
  }

  /* Status indicators */
  .status-online {
    @apply bg-[hsl(var(--online))] shadow-[0_0_8px_hsl(var(--online)/0.5)];
  }

  .status-offline {
    @apply bg-[hsl(var(--offline))];
  }

  /* Gradient backgrounds */
  .bg-gradient-primary {
    background: var(--gradient-primary);
  }

  .bg-gradient-chat {
    background: var(--gradient-chat);
  }

  .bg-gradient-accent {
    background: var(--gradient-accent);
  }

  .bg-gradient-glass {
    background: var(--gradient-glass);
  }

  .bg-gradient-purple {
    background: var(--gradient-purple);
  }

  /* Shadows */
  .shadow-soft {
    box-shadow: var(--shadow-soft);
  }

  .shadow-glow {
    box-shadow: var(--shadow-glow);
  }

  .shadow-bubble {
    box-shadow: var(--shadow-bubble);
  }

  /* Animations */
  .transition-bounce {
    transition: var(--transition-bounce);
  }

  .transition-smooth {
    transition: var(--transition-smooth);
  }

  /* Pulse ring for unread messages */
  .pulse-ring {
    @apply relative;
  }

  .pulse-ring::before {
    content: "";
    @apply absolute inset-0 rounded-full bg-primary/30 animate-ping duration-[2000ms];
  }

  /* Message bounce in animation */
  .message-bounce {
    animation: messageSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
      forwards;
  }

  @keyframes messageSlideIn {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
}

:root {
  --sidebar: hsl(0 0% 98%);
  --sidebar-foreground: hsl(240 5.3% 26.1%);
  --sidebar-primary: hsl(240 5.9% 10%);
  --sidebar-primary-foreground: hsl(0 0% 98%);
  --sidebar-accent: hsl(240 4.8% 95.9%);
  --sidebar-accent-foreground: hsl(240 5.9% 10%);
  --sidebar-border: hsl(220 13% 91%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}

.dark {
  --sidebar: hsl(240 5.9% 10%);
  --sidebar-foreground: hsl(240 4.8% 95.9%);
  --sidebar-primary: hsl(224.3 76.3% 48%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(240 3.7% 15.9%);
  --sidebar-accent-foreground: hsl(240 4.8% 95.9%);
  --sidebar-border: hsl(240 3.7% 15.9%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}

@theme inline {
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

```


## File: D:\Study\moji\frontend\src\main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```


## File: D:\Study\moji\frontend\src\components\auth\Logout.tsx

```tsx
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;

```


## File: D:\Study\moji\frontend\src\components\auth\ProtectedRoute.tsx

```tsx
import { useAuthStore } from "@/stores/useAuthStore";

import { use, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);
  const init = async () => {
    // cÃ³ thá»ƒ xáº£y ra khi refresh trang
    if (!accessToken) {
      await refresh();
    }
    if (accessToken && !user) {
      await fetchMe();
    }
    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);
  if (starting || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Äang táº£i trang...
      </div>
    );
  }
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;

```


## File: D:\Study\moji\frontend\src\components\auth\signin-form.tsx

```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const signInSchema = z.object({
  username: z.string().min(3, "TÃªn Ä‘Äƒng nháº­p pháº£i cÃ³ Ã­t nháº¥t 3 kÃ½ tá»±"),
  password: z.string().min(6, "máº­t kháº©u Ã­t nháº¥t pháº£i cÃ³ 6 kÃ­ tá»±"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = async (data: SignInFormValues) => {
    const { username, password } = data;
    await signIn(username, password);
    navigate("/");
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header - logo*/}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img src="/logo.svg" alt="logo" />
                </a>
                <h1 className="text-2xl font-bold"> ChÃ o má»«ng quay láº¡i</h1>
                <p className="text-muted-foreground text balance">
                  ÄÄƒng nháº­p vÃ o tÃ i khoáº£n Moji cá»§a báº¡n
                </p>
              </div>
              {/*user name */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  TÃªn Ä‘Äƒng nháº­p
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="moji"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {" "}
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/*password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                  Máº­t kháº©u
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="moji"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {" "}
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* nÃºt Ä‘Äƒng nháº­p*/}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                ÄÄƒng nháº­p
              </Button>
              <div className="text-center text-sm">
                ChÆ°a cÃ³ tÃ i khoáº£n?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  ÄÄƒng kÃ­ ngay
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *[a]:underline-offset-4">
        Báº±ng cÃ¡ch tiáº¿p tá»¥c, báº¡n Ä‘á»“ng Ã½ vá»›i <a href="#">Äiá»u khoáº£n dá»‹ch vá»¥</a> vÃ {" "}
        <a href="#">ChÃ­nh sÃ¡ch báº£o máº­t</a> cá»§a chÃºng tÃ´i.
      </div>
    </div>
  );
}

```


## File: D:\Study\moji\frontend\src\components\auth\signup-form.tsx

```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router";

const signUpSchema = z.object({
  firstname: z.string().min(1, "TÃªn báº¯t buá»™c pháº£i cÃ³"),
  lastname: z.string().min(1, "Há» báº¯t buá»™c pháº£i cÃ³"),
  username: z.string().min(3, "TÃªn Ä‘Äƒng nháº­p pháº£i cÃ³ Ã­t nháº¥t 3 kÃ½ tá»±"),
  email: z.email("Email khÃ´ng há»£p lá»‡"),
  password: z.string().min(6, "máº­t kháº©u Ã­t nháº¥t pháº£i cÃ³ 6 kÃ­ tá»±"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
{
  /*typeof nghÄ©a lÃ  láº¥y kiá»ƒu dá»¯ liá»‡u => typeof signUpSchema lÃ  láº¥y kiá»ƒu dá»¯ liá»ƒu cá»§a signUpSchema
   infer nghÄ©a lÃ  suy ra => infer<typeof signUpSchema nghÄ© lÃ  tá»± suy ra kiá»ƒu dá»¯ liá»‡u cá»§a SignupFormValues dá»±a trÃªn kiá»ƒu dá»¯ liá»‡u cá»§a signUpSchema> */
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: SignUpFormValues) => {
    const { firstname, lastname, username, email, password } = data;
    // gá»i backend Ä‘á»ƒ signup
    await signUp(username, password, email, firstname, lastname);
    navigate("/signin");
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header - logo*/}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img src="/logo.svg" alt="logo" />
                </a>
                <h1 className="text-2xl font-bold"> Táº¡o tÃ i khoáº£n Moji</h1>
                <p className="text-muted-foreground text balance">
                  ChÃ o má»«ng báº¡n! HÃ£y Ä‘Äƒng kÃ­ Ä‘á»ƒ báº¯t Ä‘áº§u
                </p>
              </div>
              {/* há» vÃ  tÃªn*/}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Há»
                  </Label>
                  <Input type="text" id="lastname" {...register("lastname")} />
                  {errors.lastname && (
                    <p className="text-destructive text-sm">
                      {" "}
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    TÃªn
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <p className="text-destructive text-sm">
                      {" "}
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>
              {/*user name */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  TÃªn Ä‘Äƒng nháº­p
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="moji"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {" "}
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* email*/}
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="moji"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {" "}
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/*password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                  Máº­t kháº©u
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="moji"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {" "}
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* nÃºt Ä‘Äƒng kÃ­*/}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Táº¡o tÃ i khoáº£n
              </Button>
              <div className="text-center text-sm">
                ÄÃ£ cÃ³ tÃ i khoáº£n?{" "}
                <a href="/signin" className="underline underline-offset-4">
                  ÄÄƒng nháº­p ngay
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *[a]:underline-offset-4">
        Báº±ng cÃ¡ch tiáº¿p tá»¥c, báº¡n Ä‘á»“ng Ã½ vá»›i <a href="#">Äiá»u khoáº£n dá»‹ch vá»¥</a> vÃ {" "}
        <a href="#">ChÃ­nh sÃ¡ch báº£o máº­t</a> cá»§a chÃºng tÃ´i.
      </div>
    </div>
  );
}

```


## File: D:\Study\moji\frontend\src\components\chat\AddFriendModal.tsx

```tsx
const AddFriendModal = () => {
  return <div>AddFriendModal</div>;
};

export default AddFriendModal;

```


## File: D:\Study\moji\frontend\src\components\chat\ChatCard.tsx

```tsx
import { Card } from "@/components/ui/card";
import { formatOnlineTime, cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface ChatCardProps {
  convoId: string;
  name: string;
  timestamp?: Date;
  isActive: boolean;
  onSelect: (id: string) => void;
  unreadCount?: number;
  leftSection: React.ReactNode;
  subtitle: React.ReactNode;
}

const ChatCard = ({
  convoId,
  name,
  timestamp,
  isActive,
  onSelect,
  unreadCount,
  leftSection,
  subtitle,
}: ChatCardProps) => {
  return (
    <Card
      key={convoId}
      className={cn(
        "border-none p-3 cursor-pointer transition-smooth glass hover:bg-muted/30",
        isActive &&
          "ring-2 ring-primary/50 bg-gradient-to-tr from-primary-glow/10 to-primary-foreground",
      )}
      onClick={() => onSelect(convoId)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">{leftSection}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3
              className={cn(
                "font-semibold text-sm truncate",
                unreadCount && unreadCount > 0 && "text-foreground",
              )}
            >
              {name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {timestamp ? formatOnlineTime(timestamp) : ""}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {subtitle}
            </div>
            <MoreHorizontal className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 hover:size-5 transition-smooth" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatCard;

```


## File: D:\Study\moji\frontend\src\components\chat\ChatWindowLayout.tsx

```tsx
const ChatWindowLayout = () => {
  return <div>ChatWindowLayout</div>;
};

export default ChatWindowLayout;

```


## File: D:\Study\moji\frontend\src\components\chat\CreateNewChat.tsx

```tsx
const CreateNewChat = () => {
  return <div>CreateNewChat</div>;
};

export default CreateNewChat;

```


## File: D:\Study\moji\frontend\src\components\chat\DirectMessageCard.tsx

```tsx
import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import UserAvatar from "./UserAvatar";

import UnreadCountBadge from "./UnreadCountBadge";
import StatusBadge from "./StatusBadge";

const DirectMessageCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversation, messages } =
    useChatStore();
  if (!user) return null;
  const otherUser = convo.participants.find((p) => p._id !== user._id);
  if (!otherUser) return null;
  const unreadCount = convo.unreadCounts[user._id];
  const lastMessage = convo.lastMessage?.content ?? "";

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
    }
    //todo fetch messages for this conversation
  };
  return (
    <ChatCard
      convoId={convo._id}
      name={otherUser.displayName ?? ""}
      timestamp={
        convo.lastMessage?.createdAt
          ? new Date(convo.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === convo._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      leftSection={
        <>
          <UserAvatar
            type="sidebar"
            name={otherUser.displayName ?? "Unknown"}
            avatarUrl={otherUser.avatarUrl ?? undefined}
          />
          <StatusBadge status="offline" />
          {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
        </>
      }
      subtitle={
        <p
          className={cn(
            "text-sm truncate",
            unreadCount > 0
              ? "font-medium text-foreground"
              : "text-muted-foreground",
          )}
        >
          {lastMessage}
        </p>
      }
    />
  );
};

export default DirectMessageCard;

```


## File: D:\Study\moji\frontend\src\components\chat\DirectMessageList.tsx

```tsx
import { useChatStore } from "@/stores/useChatStore";
import DirectMessageCard from "./DirectMessageCard";

const DirectMessageList = () => {
  const { conversations } = useChatStore();

  if (!conversations) return;

  const directConversations = conversations.filter(
    (convo) => convo.type === "direct",
  );

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {directConversations.map((convo) => (
        <DirectMessageCard convo={convo} key={convo._id} />
      ))}
    </div>
  );
};

export default DirectMessageList;

```


## File: D:\Study\moji\frontend\src\components\chat\GroupChatCard.tsx

```tsx
import type { Conversation } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import ChatCard from "./ChatCard";

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversation, messages } =
    useChatStore();
  if (!user) return null;
  const unreadCount = convo.unreadCounts[user._id];
  const name = convo.group?.name ?? "";
  const handleSeclectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      //todo fetch messages for this conversation
    }
  };
  return (
    <ChatCard
      convoId={convo._id}
      name={name}
      timestamp={
        convo.lastMessage?.createdAt
          ? new Date(convo.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === convo._id}
      onSelect={handleSeclectConversation}
      unreadCount={unreadCount}
      leftSection={<></>}
      subtitle={
        <p className="text-sm truncate text-muted-foreground">
          {convo.participants.length} thÃ nh viÃªn
        </p>
      }
    />
  );
};

export default GroupChatCard;

```


## File: D:\Study\moji\frontend\src\components\chat\GroupChatList.tsx

```tsx
import { useChatStore } from "@/stores/useChatStore";
import GroupChatCard from "./GroupChatCard";

const GroupChatList = () => {
  const { conversations } = useChatStore();
  if (!conversations) return;
  const groupchats = conversations.filter((convo) => convo.type === "group");
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {groupchats.map((convo) => (
        <GroupChatCard convo={convo} />
      ))}
    </div>
  );
};

export default GroupChatList;

```


## File: D:\Study\moji\frontend\src\components\chat\NewGroupChatModal.tsx

```tsx
const NewGroupChatModal = () => {
  return <div>NewGroupChatModal</div>;
};

export default NewGroupChatModal;

```


## File: D:\Study\moji\frontend\src\components\chat\StatusBadge.tsx

```tsx
import { cn } from "@/lib/utils";

const statusBadge = ({ status }: { status: "online" | "offline" }) => {
  return (
    <div
      className={cn(
        "absolute - bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-card",
        status === "online" && "status-online",
        status === "offline" && "status-offline",
      )}
    ></div>
  );
};

export default statusBadge;

```


## File: D:\Study\moji\frontend\src\components\chat\UnreadCountBadge.tsx

```tsx
import { Badge } from "../ui/badge";

const UnreadCountBadge = ({ unreadCount }: { unreadCount: number }) => {
  return (
    <div className="pulse-ring absolute z-20 -top-1 -right-1">
      <Badge className="size-5 text-xs bg-gradient-chat border border-background">
        {unreadCount > 9 ? "9+" : unreadCount}
      </Badge>
    </div>
  );
};

export default UnreadCountBadge;

```


## File: D:\Study\moji\frontend\src\components\chat\UserAvatar.tsx

```tsx
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface IUserAvatarProps {
  type: "sidebar" | "chat" | "profile";
  name: string;
  avatarUrl?: string;
  classname?: string;
}

const UserAvatar = ({ type, name, avatarUrl, classname }: IUserAvatarProps) => {
  const bgColor = !avatarUrl ? "bg-blue-500" : "";
  if (!name) name = "Unknown";

  return (
    <Avatar
      className={cn(
        classname ?? "",
        type === "sidebar" && "size-12 text-base",
        type === "chat" && "size-8 text-sm ",
        type === "profile" && "size-24 text-3xl shadow-md",
      )}
    >
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className={`${bgColor} text-white font-semibold`}>
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

```


## File: D:\Study\moji\frontend\src\components\sidebar\app-sidebar.tsx

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Group, Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import CreateNewChat from "../chat/CreateNewChat";
import NewGroupChatModal from "../chat/NewGroupChatModal";
import GroupChatList from "../chat/GroupChatList";
import AddFriendModal from "../chat/AddFriendModal";
import DirectMessageList from "../chat/DirectMessageList";
import { useThemeStore } from "@/stores/useThemeStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <Sidebar variant="inset" {...props}>
      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="bg-gradient-primary"
            >
              <a href="#">
                <div className="flex w-full items-center px-2 justify-between">
                  <h1 className="text-xl font-bold text-white">Moji</h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80" />
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="data-[state=checked]:bg-background/80"
                    />
                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* content */}
      <SidebarContent>
        {/* newchat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>
        {/* group chats */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">NhÃ³m Chat</SidebarGroupLabel>
          <SidebarGroupAction title="Táº¡o NhÃ³m" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>
        {/* direct messages */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">Báº¡n bÃ¨</SidebarGroupLabel>
          <SidebarGroupAction title="Káº¿t báº¡n" className="cursor-pointer">
            <AddFriendModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectMessageList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}

```


## File: D:\Study\moji\frontend\src\components\sidebar\nav-main.tsx

```tsx
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

```


## File: D:\Study\moji\frontend\src\components\sidebar\nav-projects.tsx

```tsx
"use client"

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

```


## File: D:\Study\moji\frontend\src\components\sidebar\nav-secondary.tsx

```tsx
import * as React from "react"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

```


## File: D:\Study\moji\frontend\src\components\sidebar\nav-user.tsx

```tsx
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

```


## File: D:\Study\moji\frontend\src\components\ui\avatar.tsx

```tsx
"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}

```


## File: D:\Study\moji\frontend\src\components\ui\badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```


## File: D:\Study\moji\frontend\src\components\ui\breadcrumb.tsx

```tsx
import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```


## File: D:\Study\moji\frontend\src\components\ui\button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```


## File: D:\Study\moji\frontend\src\components\ui\card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```


## File: D:\Study\moji\frontend\src\components\ui\collapsible.tsx

```tsx
"use client"

import { Collapsible as CollapsiblePrimitive } from "radix-ui"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```


## File: D:\Study\moji\frontend\src\components\ui\dialog.tsx

```tsx
"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```


## File: D:\Study\moji\frontend\src\components\ui\dropdown-menu.tsx

```tsx
import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```


## File: D:\Study\moji\frontend\src\components\ui\field.tsx

```tsx
import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}

```


## File: D:\Study\moji\frontend\src\components\ui\input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```


## File: D:\Study\moji\frontend\src\components\ui\label.tsx

```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```


## File: D:\Study\moji\frontend\src\components\ui\popover.tsx

```tsx
import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}

```


## File: D:\Study\moji\frontend\src\components\ui\separator.tsx

```tsx
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };

```


## File: D:\Study\moji\frontend\src\components\ui\sheet.tsx

```tsx
"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          side === "top" &&
            "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```


## File: D:\Study\moji\frontend\src\components\ui\sidebar.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import { Slot } from "radix-ui";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "24rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```


## File: D:\Study\moji\frontend\src\components\ui\skeleton.tsx

```tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-accent", className)}
      {...props}
    />
  )
}

export { Skeleton }

```


## File: D:\Study\moji\frontend\src\components\ui\switch.tsx

```tsx
import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

```


## File: D:\Study\moji\frontend\src\components\ui\textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```


## File: D:\Study\moji\frontend\src\components\ui\tooltip.tsx

```tsx
import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```


## File: D:\Study\moji\frontend\src\hooks\use-mobile.ts

```ts
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```


## File: D:\Study\moji\frontend\src\lib\axios.ts

```ts
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api",
  withCredentials: true,
});
// gáº¯n token vÃ o header cá»§a request
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
// tá»± Ä‘ong refresh token khi token háº¿t háº¡n
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest.url.includes("/auth/signin") ||
      originalRequest.url.includes("/auth/signup") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }
    originalRequest._retryCount = originalRequest._retryCount || 0;
    if (error.response?.status === 403 && originalRequest._retryCount < 4) {
      originalRequest._retryCount += 1;
      console.log("Trying to refresh token...");
      try {
        const res = await api.post("/auth/refresh", { withCredentials: true });
        const newAccessToken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearState();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

```


## File: D:\Study\moji\frontend\src\lib\utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatOnlineTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMins < 60) {
    return `${diffMins}m`; // 5m, 45m
  } else if (diffHours < 24) {
    return `${diffHours}h`; // 3h, 20h
  } else if (diffDays < 30) {
    return `${diffDays}d`; // 1d, 12d
  } else if (diffMonths < 12) {
    return `${diffMonths}m`; // 1m, 2m, 11m
  } else {
    return `${diffYears}y`; // 1y, 2y
  }
};

export const formatMessageTime = (date: Date) => {
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const timeStr = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (isToday) {
    return timeStr; // vÃ­ dá»¥: "14:35"
  } else if (isYesterday) {
    return `HÃ´m qua ${timeStr}`; // vÃ­ dá»¥: "HÃ´m qua 23:10"
  } else if (date.getFullYear() === now.getFullYear()) {
    return `${date.getDate()}/${date.getMonth() + 1} ${timeStr}`; // vÃ­ dá»¥: "22/9 09:15"
  } else {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${timeStr}`; // vÃ­ dá»¥: "15/12/2023 18:40"
  }
};

```


## File: D:\Study\moji\frontend\src\pages\ChatAppPage.tsx

```tsx
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

export const ChatAppPage = () => {
  const { fectConversations } = useChatStore();
  useEffect(() => {
    fectConversations();
  }, [fectConversations]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 p-6">
        <ChatWindowLayout />
      </div>
    </SidebarProvider>
  );
};
export default ChatAppPage;

```


## File: D:\Study\moji\frontend\src\pages\SignInPage.tsx

```tsx
import { SigninForm } from "../components/auth/signin-form";

export const SignInPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 absolute inset-0 z-0 bg-gradient-purple">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SigninForm />
      </div>
    </div>
  );
};

```


## File: D:\Study\moji\frontend\src\pages\SignUpPage.tsx

```tsx
import { SignupForm } from "../components/auth/signup-form";

export const SignUpPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 absolute inset-0 z-0 bg-gradient-purple">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
};

```


## File: D:\Study\moji\frontend\src\services\authService.ts

```ts
import api from "@/lib/axios";

export const authService = {
  signUp: async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) => {
    const res = await api.post(
      "/auth/signup",
      {
        username,
        password,
        email,
        firstName,
        lastName,
      },
      {
        withCredentials: true,
      },
    );
    return res.data;
  },

  signIn: async (username: string, password: string) => {
    const res = await api.post(
      "auth/signin",
      { username, password },
      { withCredentials: true },
    );
    return res.data; // access token
  },

  signOut: async () => {
    return api.post("/auth/signout", {}, { withCredentials: true });
  },

  fetchMe: async () => {
    const res = await api.get("/users/me", { withCredentials: true });
    return res.data.user; // user data
  },
  refresh: async () => {
    const res = await api.post("/auth/refresh", { withCredentials: true });
    return res.data.accessToken; // access token
  },
};

```


## File: D:\Study\moji\frontend\src\services\chatService.ts

```ts
import api from "@/lib/axios";
import type { ConversationResponse, Message } from "@/types/chat";

export const chatService = {
  async fetchConversations(): Promise<ConversationResponse> {
    const res = await api.get("/conversations");
    return res.data;
  },
};

```


## File: D:\Study\moji\frontend\src\stores\useAuthStore.ts

```ts
import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "../services/authService";
import type { AuthState } from "../types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.clear();
        useChatStore.getState().reset();
      },
      signUp: async (username, password, email, firstName, lastName) => {
        try {
          set({ loading: true });
          // gá»i api
          await authService.signUp(
            username,
            password,
            email,
            firstName,
            lastName,
          );

          toast.success(
            "ÄÄƒng kÃ­ thÃ nh cÃ´ng! Báº¡n sáº½ Ä‘Æ°á»£c chuyá»ƒn sang trang Ä‘Äƒng nháº­p.",
          );
        } catch (error) {
          console.error(error);
          toast.error("ÄÄƒng kÃ­ khÃ´ng thÃ nh cÃ´ng");
        }
      },
      signIn: async (username, password) => {
        try {
          set({ loading: true });
          localStorage.clear();
          useChatStore.getState().reset();
          const { accessToken } = await authService.signIn(username, password);
          get().setAccessToken(accessToken);
          await get().fetchMe();
          useChatStore.getState().fectConversations();
          toast.success("ChÃ o má»«ng báº¡n Ä‘Ã£ quay láº¡i vá»›i Moji!");
        } catch (error) {
          console.error(error);
          toast.error("ÄÄƒng nháº­p khÃ´ng thÃ nh cÃ´ng");
        } finally {
          set({ loading: false });
        }
      },
      signOut: async () => {
        try {
          get().clearState();
          await authService.signOut();

          toast.success("ÄÄƒng xuáº¥t thÃ nh cÃ´ng");
        } catch (error) {
          console.error(error);
          toast.error("lá»—i Ä‘Äƒng xuáº¥t hÃ£y thá»­ láº¡i");
        }
      },
      fetchMe: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchMe();
          set({ user });
        } catch (error) {
          console.error(error);
          set({ user: null, accessToken: null });
          toast.error("lá»—i xáº£y ra khi láº¥y dá»¯ liá»‡u ngÆ°á»i dÃ¹ng, hÃ£y thá»­ láº¡i");
        } finally {
          set({ loading: false });
        }
      },
      refresh: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe, setAccessToken } = get();
          const accessToken = await authService.refresh();

          setAccessToken(accessToken);
          if (!user) {
            await fetchMe();
          }
        } catch (error) {
          console.error(error);
          toast.error("PhiÃªn Ä‘Ã£ háº¿t háº¡n, vui lÃ²ng Ä‘Äƒng nháº­p láº¡i");
          get().clearState();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

```


## File: D:\Study\moji\frontend\src\stores\useChatStore.ts

```ts
import { chatService } from "@/services/chatService";
import type { ChatState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: {},
      activeConversationId: null,
      loading: false,
      setActiveConversation: (id) => set({ activeConversationId: id }),
      reset: () => {
        set({
          conversations: [],
          messages: {},
          activeConversationId: null,
          loading: false,
        });
      },
      fectConversations: async () => {
        try {
          set({ loading: true });
          const { conversations } = await chatService.fetchConversations();
          set({ conversations, loading: false });
        } catch (error) {
          console.error("lá»—i xáº£y ra khi fetch conversations", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({ conversations: state.conversations }),
    },
  ),
);

```


## File: D:\Study\moji\frontend\src\stores\useThemeStore.ts

```ts
import type { ThemeState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () => {
        const newValue = !get().isDark;
        set({ isDark: newValue });
        if (newValue) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
      setTheme: (dark: boolean) => {
        set({ isDark: dark });
        if (dark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);

```


## File: D:\Study\moji\frontend\src\types\chat.ts

```ts
export interface Participant {
  _id: string;
  displayName: string;
  avatarUrl?: string | null;
  joinedAt: string;
}

export interface SeenUser {
  _id: string;
  displayName?: string;
  avatarUrl?: string | null;
}

export interface Group {
  name: string;
  createdBy: string;
}

export interface LastMessage {
  _id: string;
  content: string;
  createdAt: string;
  sender: {
    _id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  group: Group;
  participants: Participant[];
  lastMessageAt: string;
  seenBy: SeenUser[];
  lastMessage: LastMessage | null;
  unreadCounts: Record<string, number>; // key = userId, value = unread count
  createdAt: string;
  updatedAt: string;
}

export interface ConversationResponse {
  conversations: Conversation[];
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  imgUrl?: string | null;
  updatedAt?: string | null;
  createdAt: string;
  isOwn?: boolean;
}

```


## File: D:\Study\moji\frontend\src\types\store.ts

```ts
import type { is } from "zod/v4/locales";
import type { User } from "./user";
import type { Conversation, Message } from "./chat";
export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string) => void;
  clearState: () => void;
  signUp: (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchMe: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}
export interface ChatState {
  conversations: Conversation[];
  messages: Record<
    string,
    {
      items: Message[];
      hasMore: boolean;
      nextCursor: string | null;
    }
  >;
  activeConversationId: string | null;
  loading: boolean;
  reset: () => void;
  setActiveConversation: (id: string | null) => void;
  fectConversations: () => Promise<void>;
}

```


## File: D:\Study\moji\frontend\src\types\user.ts

```ts
export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Friend {
  _id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

export interface FriendRequest {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

```
