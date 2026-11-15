export interface Sticker {
  id: string;
  name: string;
  url: string;
  category: "love" | "cat" | "food" | "pout" | "animals";
  keywords: string[];
}

export interface StickerPack {
  id: string;
  name: string;
  icon: string;
  category: Sticker["category"];
  stickers: Sticker[];
}

const CDN_BASE =
  "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis";

export const STICKER_PACKS: StickerPack[] = [
  {
    id: "love",
    name: "Tình Yêu & Thả Tim",
    icon: "💖",
    category: "love",
    stickers: [
      {
        id: "love-heart-eyes",
        name: "Mắt Trái Tim Mê Mẩn",
        url: `${CDN_BASE}/Smilies/Smiling%20Face%20with%20Heart-Eyes.png`,
        category: "love",
        keywords: ["yeu", "tim", "me", "thich", "love"],
      },
      {
        id: "love-kiss-blow",
        name: "Thổi Nụ Hôn Gió",
        url: `${CDN_BASE}/Smilies/Face%20Blowing%20a%20Kiss.png`,
        category: "love",
        keywords: ["hon", "kiss", "yeu", "thuong"],
      },
      {
        id: "love-heart-hands",
        name: "Hai Tay Tạo Trái Tim",
        url: `${CDN_BASE}/Hand%20gestures/Heart%20Hands.png`,
        category: "love",
        keywords: ["tim", "tay", "heart", "yeu"],
      },
      {
        id: "love-mini-heart",
        name: "Bắn Tim Hàn Quốc",
        url: `${CDN_BASE}/Hand%20gestures/Hand%20with%20Index%20Finger%20and%20Thumb%20Crossed.png`,
        category: "love",
        keywords: ["ban tim", "mini heart", "cute", "yeu"],
      },
      {
        id: "love-red-heart",
        name: "Trái Tim Đỏ Rực",
        url: `${CDN_BASE}/Smilies/Red%20Heart.png`,
        category: "love",
        keywords: ["tim do", "heart", "yeu", "thuong"],
      },
      {
        id: "love-heart-fire",
        name: "Trái Tim Bốc Cháy",
        url: `${CDN_BASE}/Smilies/Heart%20on%20Fire.png`,
        category: "love",
        keywords: ["chay", "cuong nhiet", "yeu", "fire"],
      },
      {
        id: "love-cupid",
        name: "Trái Tim Mũi Tên Cupid",
        url: `${CDN_BASE}/Smilies/Heart%20with%20Arrow.png`,
        category: "love",
        keywords: ["cupid", "trung tieng set", "yeu"],
      },
      {
        id: "love-sparkling",
        name: "Trái Tim Lấp Lánh",
        url: `${CDN_BASE}/Smilies/Sparkling%20Heart.png`,
        category: "love",
        keywords: ["lap lanh", "tim", "sparkle"],
      },
      {
        id: "love-beating",
        name: "Trái Tim Thổn Thức",
        url: `${CDN_BASE}/Smilies/Beating%20Heart.png`,
        category: "love",
        keywords: ["dap", "rung dong", "hoi hop"],
      },
      {
        id: "love-two-hearts",
        name: "Hai Trái Tim Đôi",
        url: `${CDN_BASE}/Smilies/Two%20Hearts.png`,
        category: "love",
        keywords: ["hai tim", "doi", "cap doi"],
      },
      {
        id: "love-hug",
        name: "Dang Tay Ôm Ấm Áp",
        url: `${CDN_BASE}/Smilies/Hugging%20Face.png`,
        category: "love",
        keywords: ["om", "hug", "am ap", "thuong"],
      },
      {
        id: "love-you-gesture",
        name: "Ký Hiệu I Love You",
        url: `${CDN_BASE}/Hand%20gestures/Love-You%20Gesture.png`,
        category: "love",
        keywords: ["i love you", "yeu ban", "tay"],
      },
    ],
  },
  {
    id: "cat",
    name: "Mèo Cặp Đôi",
    icon: "🐱",
    category: "cat",
    stickers: [
      {
        id: "cat-heart-eyes",
        name: "Mèo Mắt Trái Tim",
        url: `${CDN_BASE}/Smilies/Smiling%20Cat%20with%20Heart-Eyes.png`,
        category: "cat",
        keywords: ["meo", "yeu", "cat", "tim"],
      },
      {
        id: "cat-kiss",
        name: "Mèo Chu Môi Hôn",
        url: `${CDN_BASE}/Smilies/Kissing%20Cat.png`,
        category: "cat",
        keywords: ["meo", "hon", "kiss", "moa"],
      },
      {
        id: "cat-pout",
        name: "Mèo Phồng Má Dỗi",
        url: `${CDN_BASE}/Smilies/Pouting%20Cat.png`,
        category: "cat",
        keywords: ["meo", "doi", "gian", "pout"],
      },
      {
        id: "cat-cry",
        name: "Mèo Mít Ướt Nũng Nịu",
        url: `${CDN_BASE}/Smilies/Crying%20Cat.png`,
        category: "cat",
        keywords: ["meo", "khoc", "mit uot", "bat den"],
      },
      {
        id: "cat-laugh-tears",
        name: "Mèo Cười Ra Nước Mắt",
        url: `${CDN_BASE}/Smilies/Cat%20with%20Tears%20of%20Joy.png`,
        category: "cat",
        keywords: ["meo", "cuoi", "hai huoc", "vui"],
      },
      {
        id: "cat-smirk",
        name: "Mèo Cười Ranh Mãnh",
        url: `${CDN_BASE}/Smilies/Cat%20with%20Wry%20Smile.png`,
        category: "cat",
        keywords: ["meo", "cuoi deieu", "lem linh"],
      },
      {
        id: "cat-grin",
        name: "Mèo Cười Tít Mắt",
        url: `${CDN_BASE}/Smilies/Grinning%20Cat%20with%20Smiling%20Eyes.png`,
        category: "cat",
        keywords: ["meo", "cuoi tuoi", "hanh phuc"],
      },
      {
        id: "cat-weary",
        name: "Mèo Mệt Xỉu Hết Hơi",
        url: `${CDN_BASE}/Smilies/Weary%20Cat.png`,
        category: "cat",
        keywords: ["meo", "xiu", "met", "doi bung"],
      },
    ],
  },
  {
    id: "food",
    name: "Ẩm Thực & Thèm Ăn",
    icon: "🍔",
    category: "food",
    stickers: [
      {
        id: "food-drool",
        name: "Chảy Nước Miếng Thèm",
        url: `${CDN_BASE}/Smilies/Drooling%20Face.png`,
        category: "food",
        keywords: ["them", "doi", "ngon", "an"],
      },
      {
        id: "food-savor",
        name: "Liếm Mép Khen Ngon",
        url: `${CDN_BASE}/Smilies/Face%20Savoring%20Food.png`,
        category: "food",
        keywords: ["ngon", "an", "khen"],
      },
      {
        id: "food-hot-pot",
        name: "Nồi Lẩu Nghi Ngút",
        url: `${CDN_BASE}/Food/Pot%20of%20Food.png`,
        category: "food",
        keywords: ["lau", "noi lau", "an toi", "hotpot"],
      },
      {
        id: "food-steaming-bowl",
        name: "Tô Phở Mì Nóng Hổi",
        url: `${CDN_BASE}/Food/Steaming%20Bowl.png`,
        category: "food",
        keywords: ["pho", "mi", "bun", "an"],
      },
      {
        id: "food-pizza",
        name: "Pizza Phô Mai",
        url: `${CDN_BASE}/Food/Pizza.png`,
        category: "food",
        keywords: ["pizza", "pho mai", "do tay"],
      },
      {
        id: "food-burger",
        name: "Burger Ngập Nhân",
        url: `${CDN_BASE}/Food/Hamburger.png`,
        category: "food",
        keywords: ["burger", "hamburger", "banh mi"],
      },
      {
        id: "food-fries",
        name: "Khoai Tây Chiên Giòn",
        url: `${CDN_BASE}/Food/French%20Fries.png`,
        category: "food",
        keywords: ["khoai tay", "chien", "an vat"],
      },
      {
        id: "food-spaghetti",
        name: "Mì Ý Sốt Bò Bằm",
        url: `${CDN_BASE}/Food/Spaghetti.png`,
        category: "food",
        keywords: ["mi y", "spaghetti", "do tay"],
      },
      {
        id: "food-bento",
        name: "Hộp Cơm Bento Tình Yêu",
        url: `${CDN_BASE}/Food/Bento%20Box.png`,
        category: "food",
        keywords: ["bento", "com", "an trua"],
      },
      {
        id: "food-shortcake",
        name: "Bánh Kem Dâu Ngọt Ngào",
        url: `${CDN_BASE}/Food/Shortcake.png`,
        category: "food",
        keywords: ["banh kem", "dau", "ngot", "cake"],
      },
      {
        id: "food-cupcake",
        name: "Cupcake Xinh Xắn",
        url: `${CDN_BASE}/Food/Cupcake.png`,
        category: "food",
        keywords: ["cupcake", "banh", "trang mieng"],
      },
      {
        id: "food-ice-cream",
        name: "Kem Ốc Quế Mát Lạnh",
        url: `${CDN_BASE}/Food/Ice%20Cream.png`,
        category: "food",
        keywords: ["kem", "ice cream", "mat"],
      },
      {
        id: "food-donut",
        name: "Bánh Donut Cốm Xinh",
        url: `${CDN_BASE}/Food/Doughnut.png`,
        category: "food",
        keywords: ["donut", "banh ngot"],
      },
      {
        id: "food-choco",
        name: "Thanh Socola Valentine",
        url: `${CDN_BASE}/Food/Chocolate%20Bar.png`,
        category: "food",
        keywords: ["socola", "chocolate", "ngot ngao"],
      },
    ],
  },
  {
    id: "pout",
    name: "Nũng Nịu & Hờn Dỗi",
    icon: "🥺",
    category: "pout",
    stickers: [
      {
        id: "pout-pleading",
        name: "Mắt Nũng Nịu Long Lanh",
        url: `${CDN_BASE}/Smilies/Pleading%20Face.png`,
        category: "pout",
        keywords: ["nung niu", "xin", "nha", "pleading"],
      },
      {
        id: "pout-holding-tears",
        name: "Rơm Rớm Nước Mắt",
        url: `${CDN_BASE}/Smilies/Face%20Holding%20Back%20Tears.png`,
        category: "pout",
        keywords: ["nuoc mat", "tui than", "doi"],
      },
      {
        id: "pout-loud-cry",
        name: "Khóc Bắt Đền Anh",
        url: `${CDN_BASE}/Smilies/Loudly%20Crying%20Face.png`,
        category: "pout",
        keywords: ["khoc", "bat den", "an va", "cry"],
      },
      {
        id: "pout-mending",
        name: "Băng Bó Dỗ Dành",
        url: `${CDN_BASE}/Smilies/Mending%20Heart.png`,
        category: "pout",
        keywords: ["bang bo", "do danh", "xin loi"],
      },
      {
        id: "pout-broken",
        name: "Trái Tim Tan Vỡ Dỗi",
        url: `${CDN_BASE}/Smilies/Broken%20Heart.png`,
        category: "pout",
        keywords: ["tan vo", "dau long", "doi"],
      },
    ],
  },
  {
    id: "animals",
    name: "Thú Cưng Dễ Thương",
    icon: "🐻",
    category: "animals",
    stickers: [
      {
        id: "anim-bear",
        name: "Gấu Béo Ôm Yêu",
        url: `${CDN_BASE}/Animals/Bear.png`,
        category: "animals",
        keywords: ["gau", "bear", "beo", "de thuong"],
      },
      {
        id: "anim-panda",
        name: "Gấu Trúc Ngơ Ngác",
        url: `${CDN_BASE}/Animals/Panda.png`,
        category: "animals",
        keywords: ["panda", "gau truc", "ngo"],
      },
      {
        id: "anim-rabbit",
        name: "Thỏ Trắng Tai Dài",
        url: `${CDN_BASE}/Animals/Rabbit%20Face.png`,
        category: "animals",
        keywords: ["tho", "rabbit", "xinh"],
      },
      {
        id: "anim-hamster",
        name: "Chuột Hamster Phúng Phính",
        url: `${CDN_BASE}/Animals/Hamster.png`,
        category: "animals",
        keywords: ["hamster", "chuot", "ma phung"],
      },
      {
        id: "anim-chick",
        name: "Gà Con Lon Ton",
        url: `${CDN_BASE}/Animals/Baby%20Chick.png`,
        category: "animals",
        keywords: ["ga", "chick", "lon ton"],
      },
      {
        id: "anim-koala",
        name: "Gấu Túi Koala",
        url: `${CDN_BASE}/Animals/Koala.png`,
        category: "animals",
        keywords: ["koala", "om", "ngu"],
      },
      {
        id: "anim-otter",
        name: "Rái Cá Nắm Tay",
        url: `${CDN_BASE}/Animals/Otter.png`,
        category: "animals",
        keywords: ["rai ca", "otter", "nam tay"],
      },
    ],
  },
];

export const ALL_STICKERS: Sticker[] = STICKER_PACKS.flatMap(
  (pack) => pack.stickers
);
