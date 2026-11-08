export interface FoodDish {
  category: string;
  name: string;
  emoji: string;
  description: string;
  tag: string;
}

export const FOOD_CATEGORIES: string[] = [
  "Món Nướng & BBQ",
  "Món Lẩu Nghi Ngút",
  "Món Phở & Bún Nước",
  "Món Mì, Miến & Hủ Tiếu",
  "Món Cơm & Cơm Niêu",
  "Món Xào & Áp Chảo",
  "Món Chiên & Rán Giòn",
  "Món Hấp & Luộc Thanh Ngọt",
  "Món Gỏi & Cuốn Thanh Mát",
  "Món Ăn Vặt & Xiên Bẩn",
  "Món Ốc & Hải Sản Quán Gió",
  "Món Hàn Quốc K-Food",
  "Món Nhật Bản Japanese",
  "Món Trung Hoa & Dimsum",
  "Món Âu & Đồ Tây",
  "Món Fast Food & Đồ Tiện Lợi",
  "Món Đặc Sản Vùng Miền",
  "Trà Sữa & Đồ Uống Trái Cây",
  "Món Chay & Eat Clean Healthy",
  "Chè & Tráng Miệng Ngọt Ngào",
  "Bánh Ngọt & Tiệm Bánh Bakery"
];

export const ALL_FOOD_DISHES: FoodDish[] = [
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Nầm Nướng Bơ Tỏi",
    "emoji": "🥩",
    "description": "Nầm giòn sần sật đẫm sốt me bơ tỏi thơm nức mũi",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Thịt Nướng Hàn Quốc BBQ",
    "emoji": "🥓",
    "description": "Ba chỉ cuộn nấm kim châm cuốn xà lách chấm ssamjang",
    "tag": "No căng bụng"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Sườn Cây Nướng Mật Ong",
    "emoji": "🍖",
    "description": "Dẻ sườn ướp đẫm mật ong rừng nướng xém cạnh thơm lừng",
    "tag": "Ngọt mềm"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Gà Nướng Cơm Lam Tây Bắc",
    "emoji": "🍗",
    "description": "Gà ta da giòn rụm chấm muối ớt xanh ăn cùng cơm lam dẻo",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Nầm Bò Sốt Trứng Muối",
    "emoji": "🧀",
    "description": "Nầm bò sốt phô mai trứng muối béo ngậy kèm bánh mì nướng",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Hải Sản Nướng Mỡ Hành",
    "emoji": "🦪",
    "description": "Hàu nướng phô mai mỡ hành sò điệp nướng trứng cút bùi ngậy",
    "tag": "Hải sản tươi"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Tơ Tây Ninh Nướng Tảng",
    "emoji": "🥩",
    "description": "Bò tơ mềm ngọt cuốn rau rừng chấm mắm nêm đậm vị",
    "tag": "Ngon khó cưỡng"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Chân Gà Nướng Mật Ong",
    "emoji": "🍗",
    "description": "Chân gà nướng mật ong sả ớt nhâm nhi cùng trà chanh giòn rụm",
    "tag": "Lai rai"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Nem Nướng Nha Trang Cuốn Ram",
    "emoji": "🥢",
    "description": "Nem nướng thơm phức cuốn bánh tráng ram giòn sốt đậu phộng",
    "tag": "Thơm lừng"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bạch Tuộc Nướng Sa Tế Cay",
    "emoji": "🐙",
    "description": "Bạch tuộc cay cay giòn sần sật thơm nồng gia vị nướng than",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Sườn Bò Mỹ Nướng Sốt Tiêu Đen",
    "emoji": "🥩",
    "description": "Dẻ sườn bò Mỹ mềm mọng ngấm đẫm sốt tiêu thơm lừng",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Ba Chỉ Bò Cuộn Nấm Kim Châm Nướng",
    "emoji": "🥓",
    "description": "Thịt ba chỉ mềm ngậy cuộn nấm kim châm giòn ngọt",
    "tag": "Món tủ"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Cuộn Phô Mai Nướng Bơ",
    "emoji": "🧀",
    "description": "Thịt bò mềm bọc phô mai mozzarella kéo sợi béo ngậy",
    "tag": "Tan chảy"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Tôm Sú Nướng Muối Ớt Đỏ",
    "emoji": "🦐",
    "description": "Tôm sú tươi sống nướng muối ớt cay xè đỏ au giòn vỏ",
    "tag": "Cay tê"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Mực Trứng Nướng Muối Ớt Xanh",
    "emoji": "🦑",
    "description": "Mực trứng tươi ôm đầy trứng béo bùi chấm muối ớt xanh",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Hàu Nướng Phô Mai Béo Ngậy",
    "emoji": "🦪",
    "description": "Hàu sữa béo múp ngập phô mai nướng chảy vàng xèo xèo",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Cá Lóc Nướng Trui Cuốn Bánh Tráng",
    "emoji": "🐟",
    "description": "Cá lóc nướng trui than hoa cuốn bánh tráng rau rừng mắm nêm",
    "tag": "Dân dã"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Dồi Sụn Nướng Than Hoa",
    "emoji": "🥢",
    "description": "Dồi sụn giòn sần sật nướng vàng thơm mùi húng quế",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Cánh Gà Nướng Sốt BBQ Cay Ngọt",
    "emoji": "🍗",
    "description": "Cánh gà vàng ươm tắm sốt BBQ chua cay chuẩn vị Âu",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Đùi Cừu Nướng Thảo Mộc",
    "emoji": "🍖",
    "description": "Đùi cừu ướp lá hương thảo nướng chín mềm mọng nước",
    "tag": "Cao cấp"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Cá Kèo Nướng Muối Ớt Rau Răm",
    "emoji": "🐟",
    "description": "Cá kèo nướng muối ớt cay nồng chấm mắm me chua ngọt",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Sò Lông Nướng Mỡ Hành Đậu Phộng",
    "emoji": "🐚",
    "description": "Sò lông thịt dày ngọt béo thơm lừng mỡ hành tóp mỡ",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Nạc Nọng Heo Nướng Riềng Mẻ",
    "emoji": "🥓",
    "description": "Nọng heo giòn sần sật ướp riềng mẻ mắm tôm nướng thơm nức",
    "tag": "Thơm ngát"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Chim Cút Nướng Ngũ Vị Hương",
    "emoji": "🍗",
    "description": "Chim cút nướng vàng rộm thơm lừng tiêu ớt lá chanh",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Lòng Bò Nướng Sốt Cay Hàn Quốc",
    "emoji": "🥘",
    "description": "Lòng bò nướng xèo xèo giòn béo sốt tương cay chuẩn vị Seoul",
    "tag": "Hàn Quốc"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Cuốn Lá Lốt Nướng Than Hoa",
    "emoji": "🥩",
    "description": "Thịt bò băm cuốn lá lốt thơm ngát chấm mắm nêm đậu phộng",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Cá Đuối Nướng Muối Ớt Cay Xè",
    "emoji": "🐟",
    "description": "Cá đuối thịt dai thơm sụn giòn nướng muối ớt chấm mắm me",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Sườn Sụn Heo Nướng Mật Ong",
    "emoji": "🍖",
    "description": "Sườn sụn giòn sần sật đẫm mật ong nướng xém cạnh",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Ngao Hai Cùi Nướng Mỡ Hành",
    "emoji": "🐚",
    "description": "Ngao hai cùi thịt giòn ngọt rưới mỡ hành thơm nức",
    "tag": "Hải sản"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Cà Tím Nướng Mỡ Hành Tôm Khô",
    "emoji": "🍆",
    "description": "Cà tím nướng mềm ngọt rưới đẫm mỡ hành tôm khô nước mắm tỏi",
    "tag": "Thanh vị"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Cuộn Măng Tây Nướng Bơ Tỏi",
    "emoji": "🥩",
    "description": "Bò mềm cuộn măng tây xanh mướt giòn ngọt phết bơ tỏi",
    "tag": "Healthy"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Ba Chỉ Heo Nướng Sốt Gochujang",
    "emoji": "🥓",
    "description": "Thịt ba chỉ ướp sốt tương ớt Hàn Quốc nướng xém cạnh cay thơm",
    "tag": "Cay ngọt"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Lưỡi Bò Nướng Muối Tiêu Chanh",
    "emoji": "🥩",
    "description": "Lưỡi bò giòn sần sật nướng chín tới chấm muối tiêu chanh ớt",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Đùi Gà Nướng Sốt Teriyaki Nhật",
    "emoji": "🍗",
    "description": "Đùi gà rút xương nướng sốt ngọt mặn bóng bẩy kiểu Nhật",
    "tag": "Nhật Bản"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Ốc Bươu Nướng Tiêu Xanh Phú Quốc",
    "emoji": "🐚",
    "description": "Ốc bươu nhồi tiêu xanh nướng trên than hồng cay thơm nồng",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Vịt Nướng Chao Miền Tây",
    "emoji": "🦆",
    "description": "Thịt vịt mềm ngọt ướp chao đỏ béo ngậy nướng thơm lừng",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Nướng Ngói Đà Lạt",
    "emoji": "🥩",
    "description": "Thịt bò ướp đậm đà nướng chín mềm trên miếng ngói đỏ hồng",
    "tag": "Đà Lạt"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Ếch Nướng Ống Tre Hương Rừng",
    "emoji": "🐸",
    "description": "Thịt ếch đồng ướp sả ớt nướng trong ống tre giữ trọn vị ngọt",
    "tag": "Độc lạ"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Cá Basa Nướng Giấy Bạc Hành Thì Là",
    "emoji": "🐟",
    "description": "Cá basa phi lê béo mềm nướng giấy bạc thơm lừng thì là",
    "tag": "Thanh ngọt"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Chân Vịt Rút Xương Nướng Mật Ong",
    "emoji": "🍗",
    "description": "Chân vịt rút xương giòn sần sật đẫm sốt mật ong cay",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Tôm Càng Xanh Nướng Phô Mai Kéo Sợi",
    "emoji": "🦐",
    "description": "Tôm càng xanh gạch béo ngậy nướng ngập phô mai tan chảy",
    "tag": "Sang chảnh"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Sườn Que Nướng Sốt Me Chua Ngọt",
    "emoji": "🍖",
    "description": "Sườn que róc thịt sốt me chua cay sệt quánh đưa miệng",
    "tag": "Chua ngọt"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Heo Rừng Nướng Muối Ớt Tây Bắc",
    "emoji": "🥓",
    "description": "Thịt heo rừng bì giòn thịt chắc ướp mắc khén nướng than",
    "tag": "Tây Bắc"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Nấm Đùi Gà Nướng Sốt Bơ Tỏi",
    "emoji": "🍄",
    "description": "Nấm đùi gà nướng mọng nước thấm đẫm bơ tỏi thơm lừng",
    "tag": "Thanh đạm"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Gan Ngỗng Nướng Áp Chảo Sốt Dâu",
    "emoji": "🥩",
    "description": "Gan ngỗng Pháp béo ngậy áp chảo nướng thơm ngát sốt dâu rừng",
    "tag": "Quý tộc"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Thịt Dải Heo Nướng Mọi Chấm Muối Ớt",
    "emoji": "🥓",
    "description": "Thịt dải lợn nướng nguyên bản ngọt đậm chấm muối ớt chanh",
    "tag": "Dân dã"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Cá Hồi Nướng Bơ Tỏi Giấy Bạc",
    "emoji": "🐟",
    "description": "Cá hồi phi lê tươi rói nướng bơ tỏi béo ngậy mềm tan",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Xiên Nướng Rau Củ Ngũ Sắc",
    "emoji": "🥩",
    "description": "Bò xiên ớt chuông hành tây nướng xém cạnh rực rỡ sắc màu",
    "tag": "Bắt mắt"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Nọng Heo Nướng Mắc Khén Hạt Dổi",
    "emoji": "🥓",
    "description": "Thịt nạc nọng giòn ngọt nướng đượm mùi gia vị rừng Tây Bắc",
    "tag": "Đậm chất"
  },
  {
    "category": "Món Nướng & BBQ",
    "name": "Bò Nướng Kim Tiền Giòn Ngậy",
    "emoji": "🥩",
    "description": "Thịt bò bọc mỡ chài nướng than hoa mềm béo thơm phức",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Thái Tomyum Chua Cay Hải Sản",
    "emoji": "🍲",
    "description": "Nước lẩu cốt dừa chua cay đẫm tôm mực bò Mỹ tươi rói",
    "tag": "Chua cay"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Riêu Cua Bắp Bò Sườn Sụn",
    "emoji": "🦀",
    "description": "Nồi lẩu riêu cua đồng thơm lừng bắp bò hoa sườn sụn giòn",
    "tag": "Ấm cúng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Ếch Măng Cay Tê Tái",
    "emoji": "🐸",
    "description": "Thịt ếch xào măng cay giòn sần sật nước lẩu thơm nồng sa tế",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Nấm Thiên Nhiên Thanh Ngọt",
    "emoji": "🍄",
    "description": "Nước dùng thanh khiết ninh từ xương và các loại nấm quý",
    "tag": "Healthy"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Bò Nhúng Giấm Cuốn Bánh Tráng",
    "emoji": "🥩",
    "description": "Thịt bò tươi nhúng nước giấm chua thanh cuốn bánh tráng rau sống",
    "tag": "Chua ngọt"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Gà Lá É Phú Yên",
    "emoji": "🍗",
    "description": "Thịt gà đồi dai ngọt nấu cùng lá é thơm the the ấm lòng",
    "tag": "Phú Yên"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Kim Chi Ba Chỉ Bò Hàn Quốc",
    "emoji": "🥘",
    "description": "Nước lẩu chua cay kim chi đậu hũ non nấm kim châm ba chỉ bò",
    "tag": "Hàn Quốc"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Kèo Lá Giang Chua Mát",
    "emoji": "🐟",
    "description": "Cá kèo tươi ngọt vị chua thanh mát đặc trưng Nam Bộ",
    "tag": "Nam Bộ"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Đuôi Bò Hầm Thuốc Bắc",
    "emoji": "🥩",
    "description": "Đuôi bò giòn dẻo hầm thuốc bắc kỷ tử hạt sen đại bổ",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cua Đồng Bắp Bò Hoa Chuối",
    "emoji": "🦀",
    "description": "Cua đồng giã tay gạch béo ngậy ăn kèm hoa chuối thái mỏng",
    "tag": "Dân dã"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Gà Nấm Đông Cô Hạt Sen",
    "emoji": "🍗",
    "description": "Gà ta ninh hạt sen bùi béo nấm đông cô thơm ngọt nước dùng",
    "tag": "Bồi bổ"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Dê Khô Sốt Sa Tế Măng Giòn",
    "emoji": "🐐",
    "description": "Thịt dê ướp thảo mộc xào khô sa tế cay nồng kèm chao chấm",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Ốc Bươu Chuối Đậu Tía Tô",
    "emoji": "🐚",
    "description": "Ốc bươu giòn sần sật chuối xanh bùi dẻo đậu phụ rán thơm lừng",
    "tag": "Phố cổ"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Vịt Om Sấu Chua Thanh Hà Nội",
    "emoji": "🦆",
    "description": "Thịt vịt béo mềm nấu nước sấu chua thanh mát ăn kèm bún tươi",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Tầm Sapa Nấu Măng Cay",
    "emoji": "🐟",
    "description": "Cá tầm Sapa sụn giòn ngọt nấu măng cay thơm nồng nghi ngút",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Bò Nhúng Mẻ Dân Dã",
    "emoji": "🥩",
    "description": "Thịt bò mềm chấm nước mẻ chua dịu cuốn rau thơm chuối chát",
    "tag": "Chua thanh"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Tokbokki Phô Mai Xúc Xích",
    "emoji": "🍢",
    "description": "Lẩu bánh gạo cay Hàn Quốc đẫm sốt phô mai kéo sợi chả cá",
    "tag": "Trẻ trung"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Hải Sản Chua Cay Thập Cẩm",
    "emoji": "🦐",
    "description": "Tôm càng ghẹ xanh mực trứng ngao hoa ngập tràn nồi lẩu",
    "tag": "Tươi ngon"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Hồi Kim Chi Chua Cay",
    "emoji": "🐟",
    "description": "Đầu và lườn cá hồi béo ngậy nấu kim chi cay ấm bụng",
    "tag": "Béo ngọt"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Bao Tử Hầm Tiêu Xanh",
    "emoji": "🥣",
    "description": "Bao tử heo giòn sần sật hầm tiêu xanh cay nồng ấm bụng",
    "tag": "Cay thơm"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cháo Chim Câu Hạt Sen",
    "emoji": "🕊️",
    "description": "Cháo ninh nhuyễn ngọt lịm từ thịt chim câu và hạt sen đậu xanh",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Gà Tiềm Ớt Hiểm Cay Nồng",
    "emoji": "🍗",
    "description": "Gà tiềm ớt hiểm xanh thơm the the nước ngọt đậm đà",
    "tag": "Cay tê"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Đầu Cá Hồi Nấu Ngót Thì Là",
    "emoji": "🐟",
    "description": "Đầu cá hồi nấu cà chua dọc mùng thì là chua dịu thơm ngát",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Bò Ba Toa Đà Lạt",
    "emoji": "🥩",
    "description": "Thịt bò gân nạm giòn sần sật nước dùng thơm ngát thảo mộc",
    "tag": "Đà Lạt"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Diêu Hồng Nấu Riêu Cua",
    "emoji": "🐟",
    "description": "Cá diêu hồng tươi ngọt kết hợp riêu cua đồng chua thanh",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Mắm Miền Tây Bông Điên Điển",
    "emoji": "🍲",
    "description": "Mắm cá linh cá sặc thơm nồng đẫm tôm mực cà tím bông súng",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Lòng Bò Giòn Sần Sật Măng Cay",
    "emoji": "🥩",
    "description": "Lòng bò làm sạch giòn sần sật nấu măng cay thơm phức",
    "tag": "Lai rai"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cua Cà Mau Gạch Béo Ngậy",
    "emoji": "🦀",
    "description": "Cua biển Cà Mau chắc thịt gạch son béo ngậy nước dùng ngọt lịm",
    "tag": "Sang trọng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Chép Giòn Om Dưa Chua",
    "emoji": "🐟",
    "description": "Cá chép giòn sần sật xào dưa chua thơm ngát hành thì là",
    "tag": "Gia đình"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Xuyên Tiêu Tứ Xuyên Cay Tê",
    "emoji": "🌶️",
    "description": "Nồi lẩu cay nồng ớt khô hạt tiêu Tứ Xuyên tê tê đầu lưỡi",
    "tag": "Thử thách"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Sữa Đậu Nành Collagen Nhật",
    "emoji": "🥛",
    "description": "Nước dùng sữa đậu nành thanh ngọt bổ dưỡng thơm bùi",
    "tag": "Nhật Bản"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Bò Lúc Lắc Nhúng Dấm",
    "emoji": "🥩",
    "description": "Bò vuông mềm ngập nước dấm sả hành tây cuốn bánh tráng",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Gà Đen H'Mông Nấu Nấm Rừng",
    "emoji": "🍗",
    "description": "Gà đen thịt chắc bổ dưỡng ninh nấm hương rừng thơm nức",
    "tag": "Tây Bắc"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Lăng Nấu Măng Chua Cay",
    "emoji": "🐟",
    "description": "Cá lăng da trơn béo ngọt nấu măng rừng chua cay tê tái",
    "tag": "Ngon lành"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Sườn Non Nấu Sấu Chua Dịu",
    "emoji": "🍖",
    "description": "Sườn non hầm mềm cùng sấu tươi nước dùng chua ngọt thanh tao",
    "tag": "Mát lòng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Bớp Nấu Ngót Thì Là",
    "emoji": "🐟",
    "description": "Cá bớp biển thịt béo trắng nấu cà chua dứa thì là ngọt thanh",
    "tag": "Thanh vị"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Nghêu Nấu Chua Cay Sả Gừng",
    "emoji": "🐚",
    "description": "Nghêu tươi ngọt nước nấu sả gừng ớt cay xè ấm bụng",
    "tag": "Giải cảm"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Gà Hèm Rượu Nếp Cẩm",
    "emoji": "🍗",
    "description": "Gà ta nấu hèm rượu nếp cẩm chua ngọt lạ miệng thơm nồng",
    "tag": "Độc đáo"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Bò Sa Tế Sả Ớt Cay Xè",
    "emoji": "🥩",
    "description": "Bò nạm gầu giòn nhúng nước lẩu sa tế sả ớt đỏ au bắt mắt",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Ghẹ Nấu Rau Muống Miền Tây",
    "emoji": "🦀",
    "description": "Ghẹ tươi sống nấu rau muống giòn ngọt nước lèo thanh mát",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Đuối Nấu Lá Giang Chua",
    "emoji": "🐟",
    "description": "Cá đuối thịt thơm sụn giòn nấu lá giang chua dịu dễ ăn",
    "tag": "Dân dã"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Chim Trĩ Hầm Đông Trùng Hạ Thảo",
    "emoji": "🕊️",
    "description": "Thịt chim trĩ quý ninh cùng nấm đông trùng đại bổ",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Sườn Cừu Mông Cổ Thảo Mộc",
    "emoji": "🍖",
    "description": "Sườn cừu ninh thảo mộc hồi quế kỷ tử thơm nức không ngấy",
    "tag": "Thảo mộc"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Thác Lác Khổ Qua Thanh Mát",
    "emoji": "🐟",
    "description": "Chả cá thác lác dai giòn nhúng khổ qua bào mỏng thanh nhiệt",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Tôm Càng Sen Ngọt Bùi",
    "emoji": "🦐",
    "description": "Tôm càng xanh nấu cùng củ sen hạt sen nước dùng ngọt thanh",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Bò Wagyu Sukiyaki Nhật Bản",
    "emoji": "🥩",
    "description": "Bò Wagyu vân mỡ nhúng nước tương ngọt chấm trứng gà sống",
    "tag": "Xịn sò"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Shabu Shabu Nước Rong Biển Dashi",
    "emoji": "🍲",
    "description": "Lẩu nhúng kiểu Nhật thanh nhẹ giữ nguyên độ tươi của thịt bò",
    "tag": "Chuẩn Nhật"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Vịt Nấu Chao Cần Thơ",
    "emoji": "🦆",
    "description": "Vịt xiêm béo mềm nấu chao môn thơm bùi đậm chất miền Tây",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Cá Mú Nấu Măng Ớt Xanh",
    "emoji": "🐟",
    "description": "Cá mú tươi ngọt thịt nấu măng ớt hiểm xanh thơm nồng cay tê",
    "tag": "Hải sản"
  },
  {
    "category": "Món Lẩu Nghi Ngút",
    "name": "Lẩu Sụn Heo Nấu Dưa Cải Chua",
    "emoji": "🍖",
    "description": "Sườn sụn giòn sần sật om dưa cải chua giòn đưa cơm",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Bò Tái Chín Nạm Gầu Giòn",
    "emoji": "🍜",
    "description": "Bát phở bò truyền thống nước dùng ninh xương ngọt thanh hành hoa",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Bò Tái Lăn Hà Nội",
    "emoji": "🍲",
    "description": "Thịt bò xào lăn tỏi thơm nức mũi nước dùng béo ngậy phố cổ",
    "tag": "Quốc hồn"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Gà Ta Đùi Da Giòn",
    "emoji": "🍗",
    "description": "Thịt gà ta vàng ươm lá chanh thơm ngát nước dùng gà ngọt thanh",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Bò Sốt Vang Bánh Mì Nóng",
    "emoji": "🥩",
    "description": "Bò sốt vang thơm nồng rượu vang quế hồi ăn phở hoặc bánh mì",
    "tag": "Ấm cúng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Tái Bắp Hoa Thơm Mềm",
    "emoji": "🥩",
    "description": "Bắp hoa bò giòn mềm nhúng tái hồng hào nước phở sôi sùng sục",
    "tag": "Tuyệt phẩm"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Bò Huế Đầy Đủ Giò Chả",
    "emoji": "🍜",
    "description": "Nước dùng thơm mùi sả mắm ruốc đẫm bắp bò gân giò cua",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Riêu Cua Bò Giò Ốc Đậu",
    "emoji": "🦀",
    "description": "Bát bún riêu đầy đặn gạch cua béo ngậy đậu rán giòn giấm bỗng",
    "tag": "Mê ly"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Mọc Sườn Dọc Mùng Thanh Mát",
    "emoji": "🥣",
    "description": "Mọc giòn thơm nấm hương sườn non mềm dọc mùng xanh mướt",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Ốc Nguội Giấm Bỗng Phố Cổ",
    "emoji": "🐚",
    "description": "Bún ốc nguội thanh cảnh chấm nước dùng ốc giấm bỗng chua dịu",
    "tag": "Hà Nội xưa"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Thang Cầu Kỳ Hà Nội",
    "emoji": "🍜",
    "description": "Bát bún tinh hoa đất kinh kỳ với giò lụa gà xé trứng tráng mỏng",
    "tag": "Tinh hoa"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Cá Cay Hải Phòng",
    "emoji": "🐟",
    "description": "Cá rô chiên giòn rụm chả cá lòng cá sốt ớt cay xè chuẩn Đất Cảng",
    "tag": "Hải Phòng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Mắm Miền Tây Tôm Mực Heo Quay",
    "emoji": "🍲",
    "description": "Nước lèo mắm cá linh thơm lừng đẫm tôm mực thịt quay giòn bì",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Sườn Chua Nấu Sấu Dọc Mùng",
    "emoji": "🍖",
    "description": "Sườn mềm nước dùng sấu chua dịu dọc mùng giòn sần sật",
    "tag": "Chua thanh"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Chả Cá Quy Nhơn Nước Trong",
    "emoji": "🐟",
    "description": "Chả cá thu dai ngọt nước dùng nấu đầu cá trong veo ngọt lịm",
    "tag": "Quy Nhơn"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Ngan Măng Tiết Béo Ngậy",
    "emoji": "🦆",
    "description": "Thịt ngan béo mọng măng khô giòn sần sật nước dùng ngọt xương",
    "tag": "Béo ngọt"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Vịt Xáo Măng Chua Cay",
    "emoji": "🦆",
    "description": "Thịt vịt mềm ngọt xáo măng cay nồng chấm nước mắm gừng tỏi",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Mắm Nêm Thịt Heo Quay Đà Nẵng",
    "emoji": "🥓",
    "description": "Bún trộn mắm nêm thơm nồng thịt heo quay giòn bì rau sống",
    "tag": "Đà Nẵng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Chân Giò Nấu Dọc Mùng",
    "emoji": "🍖",
    "description": "Móng giò giòn sần sật nước dùng chua dịu thơm mùi hành hoa",
    "tag": "Dân dã"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Cá Rô Đồng Chiên Giòn Cải Cúc",
    "emoji": "🐟",
    "description": "Cá rô đồng gỡ xương chiên vàng giòn rụm rau cải cay ngọt",
    "tag": "Đồng quê"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Bề Bề Tôm Nõn Hạ Long",
    "emoji": "🦐",
    "description": "Bề bề bóc nõn ngọt lịm tôm tươi nước dùng thanh khiết mùi biển",
    "tag": "Hạ Long"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Chả Cua Đồng Giò Sống",
    "emoji": "🦀",
    "description": "Gạch cua đồng béo ngậy mọc giò viên dai giòn nước chua thanh",
    "tag": "Mê mẩn"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Cá Ngừ Đại Dương Miền Trung",
    "emoji": "🐟",
    "description": "Cá ngừ kho thơm cà chua nước dùng ngọt đậm ăn kèm ớt xanh",
    "tag": "Miền Trung"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Sứa Nha Trang Giòn Sần Sật",
    "emoji": "🪼",
    "description": "Sứa biển giòn sần sật chả cá tươi nước dùng cá liệt trong veo",
    "tag": "Nha Trang"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Lòng Dồi Trường Nóng Hổi",
    "emoji": "🥣",
    "description": "Lòng dồi luộc giòn sần sật tiết heo thơm béo rắc tiêu hành",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Khô Gia Lai Hai Tô Tương Đen",
    "emoji": "🍜",
    "description": "Tô phở trộn tương đen hành phi ăn kèm tô nước súp bò ngọt lịm",
    "tag": "Gia Lai"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Bò Giò Heo Nam Phổ Huế",
    "emoji": "🍜",
    "description": "Bún sợi to giò heo hầm mềm rục nước dùng cay tê chuẩn vị cố đô",
    "tag": "Cố đô"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Nước Lèo Sóc Trăng Ngải Bún",
    "emoji": "🍲",
    "description": "Mùi thơm ngải bún đặc trưng cá lóc đồng tôm đất thịt heo quay",
    "tag": "Sóc Trăng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Mực Phú Quốc Tươi Rói",
    "emoji": "🦑",
    "description": "Mực ống cơm vừa đánh bắt ngọt giòn tôm biển nước dùng thanh ngọt",
    "tag": "Phú Quốc"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Măng Vịt Nước Mắm Gừng",
    "emoji": "🦆",
    "description": "Vịt cỏ luộc ngọt mềm măng tươi giòn chấm mắm gừng cay the",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Bung Hoa Chuối Sườn Non",
    "emoji": "🍖",
    "description": "Hoa chuối nấu mềm mọc thịt béo ngậy nước dùng chua dịu",
    "tag": "Mộc mạc"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Gà Bắp Bò Thập Cẩm",
    "emoji": "🍜",
    "description": "Bát phở kết hợp gà ta dai giòn và bắp bò mềm mọng nước ngọt",
    "tag": "Đầy đặn"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Cá Lóc Miền Tây Rau Đắng",
    "emoji": "🐟",
    "description": "Cá lóc đồng luộc ngọt thịt nước lèo thanh ngọt ăn kèm rau đắng",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Hến Xào Nước Lèo Thơm Ruốc",
    "emoji": "🐚",
    "description": "Hến xào cay thơm rau răm ớt hiểm nước luộc hến thanh mát",
    "tag": "Huế"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Xào Mềm Bò Rau Cải Ngọt",
    "emoji": "🍜",
    "description": "Bánh phở xào mềm ngấm sốt bò mềm và rau cải ngọt giòn",
    "tag": "Đưa miệng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Trộn Gà Xé Sốt Chua Ngọt",
    "emoji": "🍗",
    "description": "Phở trộn gà ta xé sợi hành phi đậu phộng rưới sốt chua cay",
    "tag": "Chua ngọt"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Giò Heo Hầm Măng Khô",
    "emoji": "🍖",
    "description": "Giò heo ninh mềm măng khô Tây Bắc thơm nồng nước dùng béo",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Bò Cay Bạc Liêu Sa Tế",
    "emoji": "🌶️",
    "description": "Bò hầm sa tế ớt hiểm cay xé lưỡi nước sốt sánh đậm màu đỏ",
    "tag": "Bạc Liêu"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Mọc Măng Tươi Xương Ống",
    "emoji": "🥣",
    "description": "Nước dùng ninh xương ống tủy ngọt mộc nhĩ nấm hương măng tươi",
    "tag": "Thanh đạm"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Măng Ngan Nấm Hương",
    "emoji": "🦆",
    "description": "Ngan ré chắc thịt măng củ giòn nấm hương thơm phức nước dùng",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Bò Sốt Tiêu Đen Niêu Đất",
    "emoji": "🍲",
    "description": "Phở bò sốt tiêu đen sôi ùng ục trong niêu đất thơm nức mũi",
    "tag": "Độc lạ"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Riêu Ốc Chuối Đậu Béo Bùi",
    "emoji": "🐚",
    "description": "Ốc giòn sần sật chuối xanh bùi dẻo đậu rán vàng ngập nước riêu",
    "tag": "Dân dã"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Tái Ngỗng Áp Chảo Mỡ Hành",
    "emoji": "🦆",
    "description": "Thịt ngỗng mềm ngọt áp chảo thơm lừng chan nước phở thanh",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Đuôi Bò Hầm Củ Sen",
    "emoji": "🥩",
    "description": "Đuôi bò giòn ngọt hầm củ sen bùi béo nước dùng bổ dưỡng",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Tim Cật Bò Trần Trứng Gà",
    "emoji": "🥣",
    "description": "Tim cật giòn sần sật lòng đỏ trứng gà ta béo ngậy nước phở sôi",
    "tag": "Tươi ngon"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Bò Sốt Cay Tây Ninh",
    "emoji": "🍜",
    "description": "Nước dùng cay nồng hương ớt Tây Ninh thịt bò mềm thơm ngậy",
    "tag": "Tây Ninh"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Cá Dầm Ninh Hòa Chả Giòn",
    "emoji": "🐟",
    "description": "Cá thu dầm ngọt nước chả cá chiên dai thơm chấm mắm ớt",
    "tag": "Nha Trang"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Ghẹ Sữa Nấu Rau Ngót",
    "emoji": "🦀",
    "description": "Ghẹ sữa giã nấu rau ngót thanh mát giải nhiệt ngày hè",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Chả Cá Đà Nẵng Măng Chua",
    "emoji": "🐟",
    "description": "Chả cá hấp chiên bí đỏ măng chua cà chua nước lèo ngọt dịu",
    "tag": "Đà Nẵng"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Phở Bò Xào Giòn Sốt Vang",
    "emoji": "🍜",
    "description": "Bánh phở chiên vàng giòn rụm ngập sốt bò sốt vang sánh đỏ",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Phở & Bún Nước",
    "name": "Bún Riêu Bề Bề Cua Bể Thập Cẩm",
    "emoji": "🦀",
    "description": "Bề bề bóc nõn thịt cua bể tươi rói ngập tràn trong bát riêu",
    "tag": "Hải sản"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Nam Vang Khô Sốt Đậm Đà",
    "emoji": "🍜",
    "description": "Hủ tiếu dai trộn sốt đặc biệt tôm thịt tim cật tóp mỡ hành phi",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Gõ Xá Xíu Sườn Non Tóp Mỡ",
    "emoji": "🍜",
    "description": "Hương vị đường phố quen thuộc sợi hủ tiếu mềm xá xíu thơm ngọt",
    "tag": "Kỷ niệm"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Mì Thập Cẩm Tôm Thịt",
    "emoji": "🥢",
    "description": "Sự kết hợp giữa sợi hủ tiếu và sợi mì vàng dai tôm thịt đầy đặn",
    "tag": "No nê"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Cá Lóc Nam Bộ Nước Trong",
    "emoji": "🐟",
    "description": "Phi lê cá lóc tươi rói nước lèo ninh xương cá trong veo ngọt lịm",
    "tag": "Thanh vị"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Bò Kho Sả Ớt Đậm Đà",
    "emoji": "🥩",
    "description": "Thịt bò nạm gân hầm mềm rục sốt bò kho cay nồng thơm mùi sả",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Sa Tế Nai Cay Nồng Đậu Phộng",
    "emoji": "🦌",
    "description": "Thịt nai mềm ngọt sốt sa tế bùi bùi béo ngậy đậu phộng giã",
    "tag": "Độc lạ"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Quảng Tôm Thịt Bánh Tráng Mè",
    "emoji": "🍜",
    "description": "Sợi mì vàng óng tôm thịt ram mặn bẻ bánh tráng mè giòn rụm",
    "tag": "Quảng Nam"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Quảng Gà Ta Rau Sống Non",
    "emoji": "🍗",
    "description": "Thịt gà ta rim mặn ngọt đậm đà chan xăm xắp nước lèo rau cải non",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Quảng Ếch Măng Cay Ớt Xanh",
    "emoji": "🐸",
    "description": "Thịt ếch đồng xào nghệ măng cay nước sốt cay tê chuẩn vị miền Trung",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Vịt Tiềm Thuốc Bắc Cải Thìa",
    "emoji": "🦆",
    "description": "Đùi vịt tiềm da giòn thịt mềm ngập hương thuốc bắc nấm đông cô",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Hoành Thánh Xá Xíu Tôm Thịt",
    "emoji": "🥟",
    "description": "Viên hoành thánh tôm thịt béo ngậy sợi mì trứng dai vàng nước trong",
    "tag": "Chuẩn Hoa"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Sủi Cảo Tôm Thịt Nước Xương Hầm",
    "emoji": "🥟",
    "description": "Sủi cảo bọc tôm tươi giòn sần sật nước hầm xương ngọt thanh",
    "tag": "Thanh đạm"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Xá Xíu Khô Dầu Hào Tỏi Phi",
    "emoji": "🍜",
    "description": "Mì trộn khô dầu hào xá xíu đỏ ươm tóp mỡ giòn tan xì xụp",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Cay Hàn Quốc 7 Cấp Độ Hải Sản",
    "emoji": "🌶️",
    "description": "Mì gói Hàn Quốc cay xè tôm mực bò Mỹ kim chi thách thức vị giác",
    "tag": "Cay xè"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Ramen Tonkotsu Nước Hầm 12 Tiếng",
    "emoji": "🍜",
    "description": "Nước hầm xương heo béo ngậy thịt chashu mềm tan trứng lòng đào",
    "tag": "Chuẩn Nhật"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Ramen Miso Trứng Lòng Đào Chashu",
    "emoji": "🍜",
    "description": "Vị tương Miso Nhật Bản đậm đà bắp ngọt măng khô rong biển",
    "tag": "Nhật Bản"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Udon Xào Bò Sốt Teriyaki",
    "emoji": "🥩",
    "description": "Sợi udon to tròn dai dẻo xào bò mềm và sốt ngọt mặn Nhật Bản",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Udon Hải Sản Nước Dashi Rong Biển",
    "emoji": "🦐",
    "description": "Nước dùng dashi cá ngừ thanh khiết tôm mực chả cá Nhật naruto",
    "tag": "Thanh khiết"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Soba Lạnh Chấm Sốt Tsuyu",
    "emoji": "🥢",
    "description": "Mì kiều mạch mát lạnh chấm nước sốt tsuyu rong biển và mù tạt",
    "tag": "Giải nhiệt"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Lươn Giòn Tan Rau Răm",
    "emoji": "🐟",
    "description": "Thịt lươn chiên giòn rụm nước dùng lươn ngọt đậm đà rau răm thơm",
    "tag": "Nghệ An"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Lươn Xào Lăn Nấm Hương Mộc Nhĩ",
    "emoji": "🐟",
    "description": "Lươn xào lăn săn thịt miến dai tơi xốp thơm ngát mùi nấm hương",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Măng Gà Ta Đùi Xé",
    "emoji": "🍗",
    "description": "Miến dong dai mềm thịt gà ta béo ngọt măng khô ninh nhừ",
    "tag": "Truyền thống"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Cua Bể Xào Tay Giòn Ngọt",
    "emoji": "🦀",
    "description": "Thịt cua bể tươi bóc sẵn xào cùng miến tơi hạt tiêu hành phi",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Trộn Ngan Sốt Me Chua Ngọt",
    "emoji": "🦆",
    "description": "Thịt ngan mềm béo trộn sốt me chua cay lạc rang giòn rụm",
    "tag": "Chua ngọt"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Tim Cật Xào Giá Đỗ Hành Hoa",
    "emoji": "🥣",
    "description": "Tim cật heo xào giòn sần sật miến ngấm gia vị hành hoa thơm nức",
    "tag": "Đưa miệng"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Bò Nấu Cần Tỏi Thơm Nức",
    "emoji": "🥩",
    "description": "Thịt bò mềm ngọt cần tây tỏi thơm lừng miến dong dai trong veo",
    "tag": "Mộc mạc"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Xào Giòn Thập Cẩm Hải Sản",
    "emoji": "🦑",
    "description": "Sợi mì chiên phồng giòn tan rưới ngập nước sốt tôm mực rau củ",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Xào Mềm Bò Rau Cải Ngọt",
    "emoji": "🥩",
    "description": "Mì trứng xào mềm thịt bò tơ rau cải ngọt bóng bẩy sốt hào",
    "tag": "Quen thuộc"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Mực Ống Tươi Tôm Thịt",
    "emoji": "🦑",
    "description": "Mực ống tươi rói luộc giòn ngọt nước lèo thơm hành phi tỏi",
    "tag": "Vũng Tàu"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Hồ Lòng Heo Cải Chua",
    "emoji": "🥣",
    "description": "Bánh hủ tiếu bản to mềm mượt lòng heo giòn sần sật cải chua thanh",
    "tag": "Gốc Hoa"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Khô Gà Cay Xé Phay Ớt Đỏ",
    "emoji": "🍗",
    "description": "Gà xé cay thơm trộn sợi mì dai cay xè sốt ớt đỏ kích thích",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Sườn Non Chiên Giòn Sốt Chua Ngọt",
    "emoji": "🍖",
    "description": "Sườn non chiên giòn rụm trộn mì trứng sốt cà chua dứa",
    "tag": "Chua ngọt"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Gân Bò Hầm Sa Tế",
    "emoji": "🥩",
    "description": "Gân bò trong veo giòn dẻo hầm sa tế cay nồng ấm bụng",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Xào Giòn Thịt Bò Sốt Nấm",
    "emoji": "🍄",
    "description": "Mì giòn rụm ngập sốt nấm hương bò mềm thơm lừng ngào ngạt",
    "tag": "Thơm nức"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Xào Ốc Móng Tay Bơ Tỏi",
    "emoji": "🐚",
    "description": "Ốc móng tay giòn ngọt tắm bơ tỏi miến dong dai thơm nức mũi",
    "tag": "Béo thơm"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Xào Lòng Gà Trứng Non",
    "emoji": "🍗",
    "description": "Lòng mề gà xào giòn chùm trứng non vàng ươm béo ngậy",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Bò Đài Loan Hầm Thuốc Bắc",
    "emoji": "🥩",
    "description": "Bắp bò hoa hầm mềm rục nước dùng thơm nồng hoa hồi quế cải chua",
    "tag": "Đài Loan"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Dê Bát Đá Sôi Sùng Sục",
    "emoji": "🐐",
    "description": "Thịt dê tươi nhúng vào bát đá nước lèo sôi sục giữ nhiệt cực lâu",
    "tag": "Độc lạ"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Xào Giòn Bào Ngư Tôm Tươi",
    "emoji": "🦐",
    "description": "Bào ngư mini giòn sần sật tôm tươi sốt sệt bóng bẩy mì vàng rụm",
    "tag": "Sang trọng"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Trộn Bò Khô Chua Ngọt Cay Giòn",
    "emoji": "🥩",
    "description": "Bò khô dai cay đu đủ xanh giòn trộn miến lạc rang rau thơm",
    "tag": "Ăn vặt"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Hoành Thánh Chiên Giòn Sốt Me",
    "emoji": "🥟",
    "description": "Hoành thánh tôm chiên vàng giòn rụm chấm sốt me chua cay mì trộn",
    "tag": "Giòn tan"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Sa Đéc Bột Gạo Giò Heo",
    "emoji": "🍖",
    "description": "Sợi hủ tiếu làng bột Sa Đéc dai ngọt giò heo hầm nước lèo thanh",
    "tag": "Đồng Tháp"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Udon Cà Ri Gà Béo Ngậy",
    "emoji": "🍗",
    "description": "Nước sốt cà ri Nhật Bản sền sệt béo ngậy thịt gà khoai tây cà rốt",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Lươn Om Chuối Đậu Tía Tô",
    "emoji": "🐟",
    "description": "Lươn xào thơm om chuối đậu bùi béo miến mềm thấm đẫm gia vị",
    "tag": "Dân dã"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Xào Cay Kiểu Thái Tomyum",
    "emoji": "🦐",
    "description": "Hải sản tôm mực xào mì gói cay nồng sốt tomyum lá chanh thái",
    "tag": "Thái Lan"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Hủ Tiếu Bò Viên Khổng Lồ",
    "emoji": "🥩",
    "description": "Viên bò viên gân to đùng giòn sần sật nước súp hầm xương ống",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Lạnh Naengmyeon Hàn Quốc",
    "emoji": "🍜",
    "description": "Mì kiều mạch mát lạnh với nước dùng đá bào thịt bò lê tươi",
    "tag": "Mát lạnh"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Tương Đen Jajangmyeon Thịt Băm",
    "emoji": "🍜",
    "description": "Sợi mì dai ngập sốt tương đen chunjang bùi béo thịt băm dưa leo",
    "tag": "Chuẩn Hàn"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Miến Ngan Trộn Xá Xíu Sốt Tương Đen",
    "emoji": "🦆",
    "description": "Thịt ngan mềm béo xá xíu thơm lừng miến trộn sốt tương bùi",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Mì, Miến & Hủ Tiếu",
    "name": "Mì Xào Ốc Hương Sốt Bơ Tỏi",
    "emoji": "🐚",
    "description": "Ốc hương giòn ngọt sốt bơ tỏi thơm ngào ngạt quyện sợi mì dai",
    "tag": "Hải sản"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Tấm Sườn Bì Chả Trứng Ốp La",
    "emoji": "🍛",
    "description": "Sườn nướng mật ong thơm phức bì dai chả trứng béo mỡ hành",
    "tag": "Sài Gòn"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Tấm Sườn Cây Nướng Tóp Mỡ Giòn",
    "emoji": "🍖",
    "description": "Dẻ sườn cây nướng than hoa đẫm sốt tóp mỡ giòn tan rưới mắm ngọt",
    "tag": "Ngon đỉnh"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Niêu Đập Cháy Giòn Chấm Kho Quẹt",
    "emoji": "🍲",
    "description": "Cơm niêu đập giòn rụm quẹt đáy niêu chấm kho quẹt tôm thịt",
    "tag": "Dân dã"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Niêu Bò Xào Tiêu Đen Bông Cải",
    "emoji": "🥩",
    "description": "Thịt bò mềm mọng sốt tiêu cay nồng bông cải xanh giòn ngọt",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Niêu Sườn Non Sốt Chua Ngọt",
    "emoji": "🍖",
    "description": "Sườn non rán xém sốt cà chua dứa đậm đà đưa cơm cực kỳ",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Niêu Gà Xào Nấm Đông Cô Gừng",
    "emoji": "🍗",
    "description": "Thịt gà đùi xào nấm đông cô thơm lừng gừng tươi nước sốt sánh",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Gà Hải Nam Vàng Óng Mỡ Gà",
    "emoji": "🍗",
    "description": "Hạt cơm dẻo nấu nước luộc gà thịt gà luộc mềm mọng chấm gừng ớt",
    "tag": "Hải Nam"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Gà Xối Mỡ Đùi Gà Giòn Rụm",
    "emoji": "🍛",
    "description": "Đùi gà xối mỡ da giòn rụm thịt mềm ngọt cơm đỏ hạt dẻo thơm",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Gà Hội An Xé Phay Rau Răm",
    "emoji": "🍗",
    "description": "Cơm vàng nghệ thịt gà xé bóp hành tây rau răm nước mạ cay nồng",
    "tag": "Hội An"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Gà Tam Kỳ Nước Mạ Cay Nồng",
    "emoji": "🍗",
    "description": "Gà thả vườn luộc vàng ươm chan nước mạ sánh béo thơm lừng",
    "tag": "Quảng Nam"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Rang Dưa Bò Giòn Cháy Cạnh",
    "emoji": "🍛",
    "description": "Cơm rang hạt tơi săn thịt bò mềm xào dưa cải chua giòn sần sật",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Rang Thập Cẩm Lạp Xưởng Đậu Hà Lan",
    "emoji": "🍛",
    "description": "Cơm rang trứng vàng giò lụa lạp xưởng đậu Hà Lan cà rốt ngọt",
    "tag": "Gia đình"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Rang Hải Sản Tôm Mực Trứng Muối",
    "emoji": "🦐",
    "description": "Hải sản tươi tôm mực phủ bột trứng muối béo bùi thơm nức mũi",
    "tag": "Béo bùi"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Rang Kim Chi Ba Chỉ Bò Phô Mai",
    "emoji": "🥘",
    "description": "Kim chi cay nồng xào cơm ba chỉ bò phủ phô mai mozzarella kéo sợi",
    "tag": "Hàn Quốc"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thố Xá Xíu Quảng Đông Mỡ Hành",
    "emoji": "🍚",
    "description": "Cơm thố nóng xèo xèo xá xíu đỏ mọng nước mỡ hành tóp mỡ giòn",
    "tag": "Quảng Đông"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thố Bò Tiêu Đen Trứng Lòng Đào",
    "emoji": "🥩",
    "description": "Bò ướp tiêu đen thố đá nóng xèo xèo trộn trứng gà lòng đào béo ngậy",
    "tag": "Nóng hổi"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Sườn Nướng Sốt BBQ Dưa Chuột",
    "emoji": "🍖",
    "description": "Sườn ướp sốt BBQ thơm nồng nướng than ăn kèm dưa chuột cà chua",
    "tag": "Âu Mỹ"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Ba Chỉ Kho Trứng Cút Nước Dừa",
    "emoji": "🥓",
    "description": "Thịt ba chỉ mềm rục ngấm nước dừa ngọt trứng cút bùi thơm",
    "tag": "Chuẩn mẹ nấu"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cá Bống Kho Tiêu Ớt Hiểm",
    "emoji": "🐟",
    "description": "Cá bống nhỏ thịt săn chắc kho tiêu đen ớt cay thơm đậm đà",
    "tag": "Đồng quê"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cá Hồi Áp Chảo Sốt Teriyaki",
    "emoji": "🐟",
    "description": "Cá hồi phi lê áp chảo sốt tương ngọt Nhật Bản béo ngậy giàu Omega 3",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cá Thu Sốt Cà Chua Hành Thì Là",
    "emoji": "🐟",
    "description": "Khúc cá thu rán vàng ngập trong sốt cà chua đỏ mọng hành thì là",
    "tag": "Gia đình"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thịt Băm Sốt Cà Chua Đỗ Xào",
    "emoji": "🍛",
    "description": "Thịt nạc băm sốt cà chua đỗ cove xào tỏi thanh đạm dễ ăn",
    "tag": "Giản dị"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Bò Sốt Tiêu Bắp Ngọt Khoai Tây",
    "emoji": "🥩",
    "description": "Thịt bò xào sốt tiêu hạt bắp ngọt giòn ăn kèm khoai tây chiên",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Sườn Cốt Lết Ram Mặn Ngọt",
    "emoji": "🍖",
    "description": "Miếng sườn cốt lết dày dặn ram nước mắm tỏi ớt đường keo lại bóng bẩy",
    "tag": "Mặn ngọt"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thịt Kho Tàu Nước Dừa Miền Nam",
    "emoji": "🥓",
    "description": "Miếng thịt ba rọi vuông to kho mềm rục nước dừa trứng vịt béo ngậy",
    "tag": "Miền Nam"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Đùi Vịt Quay Bắc Kinh Da Giòn",
    "emoji": "🦆",
    "description": "Đùi vịt quay da giòn bóng bẩy thịt mềm ngọt chấm xì dầu tỏi ớt",
    "tag": "Bắc Kinh"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cá Lóc Kho Tộ Tóp Mỡ Hành Lá",
    "emoji": "🐟",
    "description": "Cá lóc đồng kho kẹo nước mắm tóp mỡ giòn thơm rắc tiêu ớt",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thịt Bò Xào Ớt Chuông Tiêu Hạt",
    "emoji": "🥩",
    "description": "Bò mềm xào ớt chuông ba màu hành tây tiêu đen thơm nồng",
    "tag": "Sắc màu"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Gà Sốt Cay Phô Mai Mozzarella",
    "emoji": "🍗",
    "description": "Gà sốt cay xé lưỡi phủ lớp phô mai nướng chảy vàng thơm ngậy",
    "tag": "Béo cay"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cuộn Trứng Omurice Kiểu Nhật",
    "emoji": "🍳",
    "description": "Cơm chiên bọc trứng cuộn mịn màng rưới sốt cà chua demi-glace",
    "tag": "Dễ thương"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Gà Sốt Nấm Kem Béo Kiểu Âu",
    "emoji": "🍗",
    "description": "Thịt gà áp chảo sốt kem tươi nấm mỡ béo ngậy thơm mùi bơ",
    "tag": "Phong cách Âu"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thịt Kho Mắm Ruốc Sả Ớt Huế",
    "emoji": "🥓",
    "description": "Thịt ba chỉ băm nhỏ kho mắm ruốc sả ớt cay nồng tốn cơm cực kỳ",
    "tag": "Xứ Huế"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cà Ri Gà Khoai Lang Cốt Dừa",
    "emoji": "🍗",
    "description": "Gà hầm khoai lang cà rốt ngập nước cốt dừa thơm nồng bột cà ri",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Rang Trứng Muối Tôm Khô Giòn",
    "emoji": "🦐",
    "description": "Cơm rang vàng tơi hạt phủ vụn trứng muối béo bùi và tôm khô giòn",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Bò Gyudon Nhật Bản Hành Tây",
    "emoji": "🥩",
    "description": "Thịt bò thái mỏng xào hành tây ngọt nước dùng dashi mirin Nhật",
    "tag": "Nhật Bản"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Heo Chiên Xù Tonkatsu Sốt Mè",
    "emoji": "🥓",
    "description": "Thịt thăn heo tẩm bột chiên xù giòn rụm sốt mè rang bắp cải bào",
    "tag": "Giòn tan"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Chiên Dứa Hải Sản Kiểu Thái",
    "emoji": "🍍",
    "description": "Cơm chiên trong trái dứa thơm ngọt tôm mực hạt điều rắc chà bông",
    "tag": "Thái Lan"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Lam Chấm Muối Vừng Gà Đồi",
    "emoji": "🍚",
    "description": "Cơm dẻo nướng trong ống nứa chấm muối mè thơm lừng gà ta",
    "tag": "Vùng cao"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cháy Kho Quẹt Tôm Thịt Mỡ Hành",
    "emoji": "🍲",
    "description": "Cơm cháy vàng giòn rụm quẹt nồi kho quẹt tóp mỡ tôm khô thơm nức",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thố Lươn Nướng Sốt Kabayaki",
    "emoji": "🐟",
    "description": "Lươn nướng sốt ngọt Nhật Bản béo ngậy rắc vừng rang thố đá",
    "tag": "Sang chảnh"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Niêu Cá Kèo Kho Rau Răm Ớt",
    "emoji": "🐟",
    "description": "Cá kèo ngọt thịt kho khô rau răm ớt hiểm ăn cùng cơm cháy niêu",
    "tag": "Dân dã"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Bò Bít Tết Trứng Ốp La Bơ Tỏi",
    "emoji": "🥩",
    "description": "Bò bít tết xèo xèo trứng ốp la lòng đào sốt bơ tỏi thơm ngào ngạt",
    "tag": "Năng lượng"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Cá Chẽm Sốt Chanh Dây Chua Ngọt",
    "emoji": "🐟",
    "description": "Phi lê cá chẽm chiên giòn rưới nước sốt chanh leo vàng óng chua dịu",
    "tag": "Mới lạ"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Gà Luộc Chấm Muối Tiêu Chanh",
    "emoji": "🍗",
    "description": "Đĩa cơm trắng dẻo thơm đùi gà ta luộc da vàng chấm muối tiêu ớt",
    "tag": "Mộc mạc"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Tôm Rim Mặn Ngọt Ba Chỉ Cháy",
    "emoji": "🦐",
    "description": "Tôm đồng rim thịt ba chỉ cháy cạnh nước mắm đường sánh keo",
    "tag": "Quê nhà"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Chiên Tỏi Giòn Canh Rong Biển",
    "emoji": "🍚",
    "description": "Cơm rang thơm nức tỏi phi vàng giòn ăn kèm bát canh rong biển thịt",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Thịt Heo Xào Kim Chi Cay Nồng",
    "emoji": "🥓",
    "description": "Thịt ba chỉ heo xào kim chi cải thảo chua cay tê tê đầu lưỡi",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Bò Xào Nấm Kim Châm Dầu Hào",
    "emoji": "🥩",
    "description": "Bò mềm xào nấm kim châm giòn ngọt sốt dầu hào hành lá thơm",
    "tag": "Dễ ăn"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Đùi Gà Nướng Mật Ong Cơm Trắng",
    "emoji": "🍗",
    "description": "Đùi gà nướng mật ong da bóng giòn thịt mềm ngọt ăn cùng cơm trắng",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Cơm & Cơm Niêu",
    "name": "Cơm Canh Cua Rau Đay Cà Pháo Giòn",
    "emoji": "🦀",
    "description": "Bữa cơm mùa hè với canh riêu cua mướp rau đay cà pháo giòn tan",
    "tag": "Hương vị quê"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Lúc Lắc Khoai Tây Chiên Tiêu Đen",
    "emoji": "🥩",
    "description": "Thịt bò thăn vuông mềm mọng sốt tiêu đen khoai tây chiên giòn",
    "tag": "Sang chảnh"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Mực Tươi Xào Sa Tế Cần Tỏi",
    "emoji": "🦑",
    "description": "Mực ống tươi giòn sần sật xào sa tế cay nồng thơm lừng cần tỏi",
    "tag": "Cay giòn"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Ốc Móng Tay Xào Rau Muống Tỏi",
    "emoji": "🐚",
    "description": "Ốc móng tay béo ngậy xào rau muống xanh mướt tỏi phi thơm nức",
    "tag": "Quốc dân"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Sườn Xào Chua Ngọt Dứa Cà Chua",
    "emoji": "🍖",
    "description": "Sườn non chiên vàng sốt cà chua dứa đậm đà đưa cơm tuyệt hảo",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Mì Xào Giòn Hải Sản Sốt Sệt",
    "emoji": "🦐",
    "description": "Mì chiên vàng phồng giòn tan ngập tràn tôm mực bông cải nước sốt bóng",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Phở Xào Cháy Cạnh Bắp Bò Cải Ngọt",
    "emoji": "🍜",
    "description": "Bánh phở xào xém cạnh dẻo thơm bắp bò mềm ngọt rau cải xanh",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Xào Cần Tỏi Tây Hành Tây",
    "emoji": "🥩",
    "description": "Thịt bò tơ xào tái ngọt mềm dậy mùi cần tây tỏi tây thơm phức",
    "tag": "Thơm nức"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Tôm Sú Xào Măng Tây Bơ Tỏi",
    "emoji": "🦐",
    "description": "Tôm sú bóc nõn giòn ngọt xào măng tây non sốt bơ tỏi béo thơm",
    "tag": "Healthy"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Lòng Heo Xào Dưa Chua Tóp Mỡ",
    "emoji": "🥓",
    "description": "Lòng non giòn sần sật xào dưa cải muối chua tóp mỡ thơm nức",
    "tag": "Lai rai"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Thịt Ba Chỉ Xào Mắm Ruốc Sả Ớt",
    "emoji": "🥓",
    "description": "Ba chỉ thái mỏng xào săn mắm ruốc sả băm ớt hiểm thơm cay tốn cơm",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Gà Xào Sả Ớt Cay Nồng Miền Trung",
    "emoji": "🍗",
    "description": "Thịt gà đùi chặt miếng xào vàng sém đượm vị sả băm ớt cay xè",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Mực Xào Cần Nước Chua Ngọt",
    "emoji": "🦑",
    "description": "Mực tươi xào dứa cà chua cần nước giòn ngọt thanh tao",
    "tag": "Dân dã"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Xào Nấm Rơm Hành Hoa",
    "emoji": "🍄",
    "description": "Thịt bò mềm mọng xào nấm rơm tươi ngọt lịm rắc hạt tiêu thơm",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Ngọn Su Su Xào Tỏi Cao Bằng",
    "emoji": "🥬",
    "description": "Ngọn su su non xanh giòn sần sật xào ngập tỏi đập dập thơm lừng",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bông Bí Xào Tỏi Tôm Nõn",
    "emoji": "🌼",
    "description": "Bông bí vàng ngọt mềm xào tôm tươi thơm ngát hương hoa đồng nội",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Cải Làn Xào Nấm Đông Cô Dầu Hào",
    "emoji": "🥬",
    "description": "Cải làn xanh giòn xào nấm hương đông cô bóng bẩy sốt dầu hào",
    "tag": "Thanh lịch"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Xào Khổ Qua Trứng Gà",
    "emoji": "🥩",
    "description": "Vị đắng thanh của khổ qua quyện thịt bò mềm ngọt và trứng béo",
    "tag": "Thanh nhiệt"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Mề Gà Xào Đậu Cô Ve Giòn Ngọt",
    "emoji": "🍗",
    "description": "Mề gà khía hoa xào giòn sần sật đậu cove ngọt mát thơm tiêu",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Tim Cật Heo Xào Thập Cẩm Rau Củ",
    "emoji": "🥣",
    "description": "Tim cật xào giòn sần sật súp lơ cà rốt ngô bao tử nước sốt sánh",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Ốc Giác Xào Rau Muống Tỏi Phi",
    "emoji": "🐚",
    "description": "Ốc giác thái mỏng giòn dai xào rau muống xanh giòn rụm",
    "tag": "Quán ốc"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Lươn Xào Sả Ớt Xúc Bánh Đa",
    "emoji": "🐟",
    "description": "Thịt lươn đồng xào săn đậm đà sả ớt xúc bánh đa vừng giòn rụm",
    "tag": "Xứ Nghệ"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Ếch Xào Lăn Cốt Dừa Cà Ri",
    "emoji": "🐸",
    "description": "Thịt ếch vàng ruộm nước cốt dừa béo ngậy nấm mèo hành tây",
    "tag": "Béo bùi"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bạch Tuộc Xào Cay Kiểu Hàn Quốc",
    "emoji": "🐙",
    "description": "Bạch tuộc giòn sần sật đẫm sốt ớt Gochujang mè rang thơm phức",
    "tag": "Chuẩn Hàn"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Tôm Rim Mặn Ngọt Hành Tỏi",
    "emoji": "🦐",
    "description": "Tôm đồng vỏ giòn thịt ngọt rim mặn ngọt keo đường đỏ au",
    "tag": "Cơm nhà"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Thịt Bò Xào Hành Tây Cà Chua",
    "emoji": "🥩",
    "description": "Bò xào mềm mọng nước hành tây ngọt thơm cà chua thanh dịu",
    "tag": "Quen thuộc"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Cá Hồi Áp Chảo Sốt Chanh Leo",
    "emoji": "🐟",
    "description": "Cá hồi áp chảo da giòn thịt hồng mềm rưới sốt chanh leo chua dịu",
    "tag": "Âu sang"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Ức Gà Áp Chảo Sốt Mật Ong Mù Tạt",
    "emoji": "🍗",
    "description": "Ức gà mềm không khô đượm sốt honey mustard chua ngọt sánh vàng",
    "tag": "Eat clean"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Thăn Lợn Áp Chảo Sốt Tiêu Xanh",
    "emoji": "🥩",
    "description": "Thăn heo mềm mọng áp chảo xém cạnh sốt tiêu xanh cay the",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Cuộn Nấm Kim Châm Áp Chảo",
    "emoji": "🥓",
    "description": "Thịt ba chỉ bò cuộn nấm kim châm áp chảo sốt tương tỏi ngọt",
    "tag": "Món ngon"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Đậu Hũ Non Xào Thịt Băm Sốt Cà",
    "emoji": "🧈",
    "description": "Đậu hũ non mềm mượt tan trong miệng xào thịt băm cà chua hành lá",
    "tag": "Dễ ăn"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bắp Bò Xào Măng Trúc Quân Tử",
    "emoji": "🥩",
    "description": "Bắp bò hoa giòn sần sật xào măng trúc non Tây Bắc cay thơm",
    "tag": "Tây Bắc"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Ốc Hương Xào Bơ Cay Bánh Mì",
    "emoji": "🐚",
    "description": "Ốc hương xào bơ tỏi sốt ớt cay ăn kèm bánh mì nóng giòn chấm sốt",
    "tag": "Cực phẩm"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Cà Tím Xào Thịt Băm Lá Lốt",
    "emoji": "🍆",
    "description": "Cà tím mềm ngọt thịt băm thơm nức mùi lá lốt tía tô đậm vị",
    "tag": "Dân dã"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Giá Đỗ Xào Huyết Heo Hẹ Non",
    "emoji": "🥬",
    "description": "Giá đỗ giòn thanh xào tiết heo mềm béo hẹ non thơm nức mũi",
    "tag": "Bình dân"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Nấm Đùi Gà Xào Bò Dầu Hào",
    "emoji": "🍄",
    "description": "Nấm đùi gà dai ngọt như thịt gà xào bò mềm sốt hào sóng sánh",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Sò Điệp Xào Măng Tây Bơ Pháp",
    "emoji": "🐚",
    "description": "Cồi sò điệp dày thịt ngọt ngào xào măng tây non ngậy bơ Pháp",
    "tag": "Cao cấp"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Gà Xào Hạt Điều Kiểu Thái",
    "emoji": "🍗",
    "description": "Thịt gà ớt chuông hạt điều rang bùi béo sốt chua ngọt chuẩn Thái",
    "tag": "Thái Lan"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Cá Điêu Hồng Xào Chua Ngọt",
    "emoji": "🐟",
    "description": "Phi lê cá rán vàng xào dứa cà chua ớt chuông nước sốt bóng bẩy",
    "tag": "Màu sắc"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Dồi Trường Xào Dưa Chua Sa Tế",
    "emoji": "🥓",
    "description": "Dồi trường heo trắng giòn sần sật xào dưa cải muối sa tế cay",
    "tag": "Lai rai"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Xào Lá Lốt Hành Tây",
    "emoji": "🥩",
    "description": "Thịt bò thái mỏng xào lá lốt thơm lừng hành tây ngọt giòn",
    "tag": "Thơm phức"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bao Tử Cá Basa Xào Dưa Cải",
    "emoji": "🐟",
    "description": "Bao tử cá basa giòn sần sật xào dưa chua thơm ngát hành hoa",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Càng Ghẹ Xào Muối Ớt Cay Xè",
    "emoji": "🦀",
    "description": "Càng ghẹ phủ lớp muối ớt rang khô cay cay mặn mặn mút ngập răng",
    "tag": "Ghiền liền"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Xào Súp Lơ Xanh Sốt Tỏi",
    "emoji": "🥩",
    "description": "Thịt bò thăn mềm xào bông cải xanh giòn ngọt thanh mát bổ dưỡng",
    "tag": "Healthy"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Lòng Gà Xào Mướp Hương Lòng Mề",
    "emoji": "🍗",
    "description": "Mướp hương thơm ngát xào lòng mề gà giòn ngọt nước canh thanh",
    "tag": "Hương quê"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Nui Xào Bò Trứng Ốp La",
    "emoji": "🍝",
    "description": "Nui xào vàng mềm ngấm sốt cà chua thịt bò mềm trứng ốp la lòng đào",
    "tag": "Ăn sáng"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Rau Muống Xào Chao Béo Ngậy",
    "emoji": "🥬",
    "description": "Rau muống non xanh mướt xào chao đỏ thơm bùi ngậy vị miền Nam",
    "tag": "Miền Nam"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Hến Xào Sả Ớt Bánh Tráng Nướng",
    "emoji": "🐚",
    "description": "Hến sông ngọt bùi xào sả ớt xúc bánh tráng mè nướng giòn rụm",
    "tag": "Xứ Huế"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Đọt Bí Xào Tỏi Mỡ Heo Tóp Mỡ",
    "emoji": "🥬",
    "description": "Đọt bí non giòn ngọt xào mỡ heo tỏi phi vàng thơm lừng nức nở",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Cơm Nguội Xào Dưa Bò Giòn Rụm",
    "emoji": "🍛",
    "description": "Cơm nguội rang giòn hạt xào thịt bò dưa cải chua thơm lừng bếp mẹ",
    "tag": "Kỷ niệm"
  },
  {
    "category": "Món Xào & Áp Chảo",
    "name": "Bò Xào Ớt Xiêm Xanh Cay Nồng",
    "emoji": "🥩",
    "description": "Thịt bò mềm xào ớt xiêm rừng cay nồng thơm the kích thích vị giác",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Gà Rán Giòn Sốt Cay Phô Mai",
    "emoji": "🍗",
    "description": "Miếng gà da giòn rụm bên trong mọng nước ngập sốt cay phô mai kéo sợi",
    "tag": "Gây nghiện"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Xèo Miền Tây Giòn Rụm Tôm Thịt",
    "emoji": "🥞",
    "description": "Vỏ bánh vàng ươm giòn tan nhân tôm thịt giá đỗ cuốn rau rừng mắm chua ngọt",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Nem Chua Rán Hà Nội Nóng Hổi",
    "emoji": "🥓",
    "description": "Nem chua rán giòn vỏ bên trong dai dẻo chấm tương ớt cay ngọt",
    "tag": "Phố cổ"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Phô Mai Que Kéo Sợi Vàng Giòn",
    "emoji": "🧀",
    "description": "Thanh phô mai tẩm bột chiên vàng giòn rụm kéo sợi dài tít tắp",
    "tag": "Ăn vặt"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Gối Nhân Thịt Trứng Cút Miến",
    "emoji": "🥟",
    "description": "Vỏ bánh gập hình bán nguyệt chiên vàng rộm chấm nước mắm đu đủ",
    "tag": "Hà Nội xưa"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Chả Giò Hải Sản Sốt Mayonnaise",
    "emoji": "🥢",
    "description": "Vỏ bánh tráng rế giòn rụm nhân tôm cua mực sốt mayonaisse béo ngậy",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm",
    "emoji": "🍛",
    "description": "Đùi gà xối mỡ vàng ruộm rưới mắm tỏi ớt cơm hạt dẻo đỏ",
    "tag": "Chắc dạ"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Khoai Tây Chiên Lắc Phô Mai",
    "emoji": "🍟",
    "description": "Khoai tây chiên vàng giòn rụm phủ đẫm lớp bột phô mai thơm ngào ngạt",
    "tag": "Trẻ trung"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bột Chiên Trứng Giòn Rụm Đu Đủ Bào",
    "emoji": "🍳",
    "description": "Miếng bột chiên xém cạnh giòn rụm trứng gà lòng đỏ tan chảy nước tương",
    "tag": "Sài Gòn"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Cá Tai Tượng Chiên Xù Cuốn Bánh Tráng",
    "emoji": "🐟",
    "description": "Cá tai tượng vảy dựng giòn rụm cuốn bánh tráng chấm mắm nêm miền Tây",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Cánh Gà Chiên Nước Mắm Tỏi Ớt",
    "emoji": "🍗",
    "description": "Cánh gà da giòn rụm đẫm sốt nước mắm đường keo lại tỏi ớt cay ngọt",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Tôm Lăn Bột Chiên Xù Sốt Mè",
    "emoji": "🦐",
    "description": "Tôm sú bóc nõn tẩm bột chiên xù vàng ươm chấm sốt tương ớt ngọt",
    "tag": "Giòn tan"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Khoai Môn Lệ Phố Nhân Trứng Muối",
    "emoji": "🍠",
    "description": "Vỏ khoai môn tím bùi dẻo bọc nhân trứng muối kim sa tan chảy",
    "tag": "Thơm bùi"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Khoai Lang Lắc Xí Muội Chua Ngọt",
    "emoji": "🍠",
    "description": "Khoai lang nhật vàng ngọt bùi chiên giòn lắc bột xí muội mặn ngọt",
    "tag": "Đưa miệng"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Nem Rán Truyền Thống Thịt Mộc Nhĩ",
    "emoji": "🥢",
    "description": "Nem rán giòn tan thơm mùi nấm hương mộc nhĩ chấm nước mắm chanh tỏi",
    "tag": "Tết quê"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Tôm Hồ Tây Giòn Tan",
    "emoji": "🦐",
    "description": "Bánh bột khoai lang chiên giòn kẹp con tôm tươi đỏ au chấm mắm dưa góp",
    "tag": "Hồ Tây"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Ếch Chiên Bơ Tỏi Thơm Nức Mũi",
    "emoji": "🐸",
    "description": "Thịt ếch đồng tẩm bột chiên giòn đẫm bơ tỏi thơm ngào ngạt",
    "tag": "Thơm nức"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Mực Chiên Giòn Sốt Me Cay",
    "emoji": "🦑",
    "description": "Mực ống tẩm bột chiên vàng rưới sốt me chua ngọt cay the",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bò Cuộn Phô Mai Chiên Xù",
    "emoji": "🥩",
    "description": "Thịt bò mềm bọc phô mai kéo sợi tẩm bột chiên xù giòn tan",
    "tag": "Tan chảy"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Trứng Cút Lộn Chiên Giòn Sốt Me",
    "emoji": "🥚",
    "description": "Trứng cút lộn chiên giòn vỏ sốt me chua ngọt rắc đậu phộng rau răm",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Sườn Sụn Chiên Nước Mắm Giòn Sần Sật",
    "emoji": "🍖",
    "description": "Sườn sụn giòn tan ngấm đẫm gia vị mắm tỏi ớt ăn nhai sần sật",
    "tag": "Lai rai"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Cá Kèo Chiên Giòn Chấm Mắm Me",
    "emoji": "🐟",
    "description": "Cá kèo tươi nguyên con tẩm bột chiên giòn tan chấm sốt me chua cay",
    "tag": "Nam Bộ"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Căn Trứng Cút Chiên Giòn",
    "emoji": "🥞",
    "description": "Bánh căn giòn rụm chén mỡ hành xoài xanh chấm mắm nêm xíu mại",
    "tag": "Phan Thiết"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Gà Popcorn Chiên Giòn Lắc Phô Mai",
    "emoji": "🍗",
    "description": "Thịt ức gà viên nhỏ chiên giòn rụm lắc đẫm bột phô mai béo ngọt",
    "tag": "Bắt miệng"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Chả Mực Hạ Long Chiên Vàng Giòn",
    "emoji": "🦑",
    "description": "Mực mai giã tay chiên vàng thơm phức giòn sần sật ngọt thịt",
    "tag": "Hạ Long"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Rán Mặn Nhân Thịt Mộc Nhĩ",
    "emoji": "🥟",
    "description": "Vỏ nếp giòn dẻo nhân thịt mộc nhĩ miến tiêu thơm nồng chấm mắm ớt",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Cá Cơm Chiên Giòn Tỏi Ớt",
    "emoji": "🐟",
    "description": "Cá cơm sữa chiên vàng giòn rụm rim tỏi ớt mắm đường ăn cả con",
    "tag": "Cơm nhà"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Hàu Chiên Giòn Sốt Tartar",
    "emoji": "🦪",
    "description": "Hàu sữa béo múp tẩm bột chiên giòn chấm sốt tartar béo ngậy chua dịu",
    "tag": "Mới lạ"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Bột Lọc Chiên Giòn Tôm Thịt",
    "emoji": "🥟",
    "description": "Bánh bột lọc chiên vàng rộp giòn dai nhân tôm thịt mặn mòi chấm tương",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Còng Bánh Cam Ngào Đường",
    "emoji": "🥯",
    "description": "Bánh rán vỏ nếp giòn rụm ngào lớp đường mật mía vàng óng mè rang",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Chim Cút Chiên Bơ Tỏi Nước Mắm",
    "emoji": "🍗",
    "description": "Chim cút chiên vàng ươm thơm lừng mùi bơ tỏi ăn kèm bánh mì",
    "tag": "Quán cóc"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Dồi Sụn Chiên Giòn Chấm Tương Ớt",
    "emoji": "🥢",
    "description": "Dồi sụn chiên xém cạnh giòn sần sật thơm phức rau thơm",
    "tag": "Ngon giòn"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Cá Trê Chiên Giòn Xoài Băm Mắm Gừng",
    "emoji": "🐟",
    "description": "Cá trê chiên vàng rộm giòn tan ăn kèm xoài xanh băm mắm gừng chua cay",
    "tag": "Dân dã"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Tàu Hũ Ky Chiên Giòn Cuộn Tôm",
    "emoji": "🦐",
    "description": "Lớp váng đậu giòn tan bọc tôm tươi băm nhuyễn chiên vàng ruộm",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Khọt Vũng Tàu Tôm Tươi Giòn Rụm",
    "emoji": "🥞",
    "description": "Bánh khọt chiên vàng giòn rụm con tôm đỏ rắc bột tôm cháy cuốn rau cải",
    "tag": "Vũng Tàu"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Ba Chỉ Heo Chiên Giòn Bì Chấm Mắm Tỏi",
    "emoji": "🥓",
    "description": "Thịt ba chỉ luộc rồi chiên giòn bì nổ lách tách chấm mắm chua cay",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Gà Viên Phô Mai Mozzarella Chiên Xù",
    "emoji": "🧀",
    "description": "Thịt gà viên bọc phô mai mozzarella chiên xù nóng hổi kéo sợi",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Chuối Chiên Giòn Phồng Rộp",
    "emoji": "🍌",
    "description": "Chuối sứ ép mỏng nhúng bột chiên giòn phồng ngọt ngào thơm ngát",
    "tag": "Đường phố"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Tiêu Chiên Phồng Mè Trắng",
    "emoji": "🥯",
    "description": "Bánh tiêu ruột xốp rỗng vàng ươm thơm mùi mè trắng kẹp xôi hoặc ăn không",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Khoai Môn Lệ Phố Bọc Thịt Chiên Giòn",
    "emoji": "🍠",
    "description": "Vỏ khoai dẻo bùi bọc nhân thịt nấm hương chiên vàng rộm giòn tan",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Cá Lóc Chiên Xù Cuốn Bánh Tráng",
    "emoji": "🐟",
    "description": "Cá lóc đồng chiên xù xơ xác giòn rụm chấm mắm me đậu phộng",
    "tag": "Đặc sắc"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Ngô Chiên Giòn Thơm Mùi Sữa",
    "emoji": "🌽",
    "description": "Hạt bắp ngọt trộn bột chiên giòn rụm thơm lừng sữa tươi bơ béo",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Khoai Tây Lắc Trứng Muối Rong Biển",
    "emoji": "🍟",
    "description": "Khoai tây giòn tan lắc vụn trứng muối béo mặn và rong biển thơm",
    "tag": "Mới lạ"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Tôm Chiên Cốm Xanh Hà Nội",
    "emoji": "🦐",
    "description": "Tôm tươi bọc lớp cốm xanh chiên giòn thơm hương lúa mới chấm tương mai",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Nấm Kim Châm Tẩm Bột Chiên Giòn",
    "emoji": "🍄",
    "description": "Nấm kim châm tẩm bột chiên xòe quạt giòn tan rắc bột phô mai cay",
    "tag": "Ăn vặt"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Đùi Gà Chiên Xù Kiểu KFC",
    "emoji": "🍗",
    "description": "Đùi gà tẩm bột chiên xù vảy vàng rụm thịt mềm ngọt nước",
    "tag": "Khoái khẩu"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Chả Ram Tôm Đất Bình Định Giòn Rụm",
    "emoji": "🦐",
    "description": "Cuốn ram bé xíu giòn tan bọc trọn con tôm đất ngọt lịm chấm mắm tỏi",
    "tag": "Bình Định"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Quẩy Nóng Giòn Chấm Nước Phở",
    "emoji": "🥖",
    "description": "Quẩy vàng giòn rụm ruột xốp ngâm nước phở bò béo ngậy thơm nức",
    "tag": "Quen thuộc"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Nem Ốc Chiên Giòn Chấm Nước Mắm Gừng",
    "emoji": "🐚",
    "description": "Ốc giòn sần sật bọc lá lốt chiên giòn rụm thơm ngát mùi gừng sả",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Chiên & Rán Giòn",
    "name": "Bánh Bao Chiên Giòn Nhân Trứng Cút",
    "emoji": "🥟",
    "description": "Vỏ bánh bao ngọt chiên vàng rộm nhân thịt mộc nhĩ trứng cút đậm đà",
    "tag": "Ăn xế"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Gà Ta Hấp Lá Chanh Chấm Muối Tiêu",
    "emoji": "🍗",
    "description": "Thịt gà ta da vàng ươm giòn sần sật thơm ngát lá chanh chấm muối ớt",
    "tag": "Truyền thống"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Dimsum Há Cảo Tôm Thịt Xửng Tre",
    "emoji": "🥟",
    "description": "Vỏ há cảo trong veo mỏng mịn nhân tôm tươi nguyên con giòn sần sật",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Ngao Hấp Sả Ớt Dứa Nước Ngọt Lịm",
    "emoji": "🥣",
    "description": "Ngao béo múp ngập nước canh thơm lừng sả gừng dứa chua ngọt húp xì xụp",
    "tag": "Hải sản"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Tôm Sú Hấp Bia Sả Gừng",
    "emoji": "🦐",
    "description": "Tôm sú tươi nhảy tanh tách hấp bia sả thơm ngọt chấm muối tiêu chanh",
    "tag": "Tươi ngon"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Mực Trứng Hấp Gừng Hành Lá",
    "emoji": "🦑",
    "description": "Mực trứng tươi rói bụng đầy trứng béo bùi chấm nước mắm gừng ớt cay",
    "tag": "Béo ngọt"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Gỏi Cuốn Tôm Thịt Bún Rau Sống",
    "emoji": "🥗",
    "description": "Tôm thịt luộc cuộn bún rau thơm bánh tráng chấm tương đen bơ đậu phộng",
    "tag": "Healthy"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Bao Kim Sa Tan Chảy",
    "emoji": "🥟",
    "description": "Vỏ bánh bao mềm xốp nóng hổi nhân trứng muối kim sa béo ngậy tan chảy",
    "tag": "Ngọt bùi"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Thịt Ba Chỉ Luộc Cuốn Bánh Tráng",
    "emoji": "🥓",
    "description": "Thịt ba chỉ luộc hai đầu mỡ cuốn rau rừng chấm mắm nêm đậm đà",
    "tag": "Chuẩn vị"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Chép Giòn Hấp Bia Thì Là",
    "emoji": "🐟",
    "description": "Cá chép giòn sần sật hấp bia sả thơm nức mũi chấm nước mắm gừng tỏi",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Giò Nóng Nhân Thịt Mộc Nhĩ",
    "emoji": "🥟",
    "description": "Bánh giò bột gạo mềm mịn thơm mùi lá chuối nhân thịt nạc mộc nhĩ hạt tiêu",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Ốc Nhồi Hấp Sả Lá Bưởi",
    "emoji": "🐚",
    "description": "Ốc bươu nhồi thịt giòn sần sật hấp lá sả lá bưởi thơm nồng chấm mắm gừng",
    "tag": "Dân dã"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Ghẹ Hấp Bia Xả Nóng Hổi",
    "emoji": "🦀",
    "description": "Ghẹ tươi chắc thịt ngọt lịm hấp bia sả chấm muối tiêu chanh ớt hiểm",
    "tag": "Sang trọng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bò Tơ Hấp Cuốn Bánh Tráng Rau Rừng",
    "emoji": "🥩",
    "description": "Bò tơ mềm ngọt hấp gừng sả cuốn bánh tráng rau rừng chấm mắm nêm",
    "tag": "Tây Ninh"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Lóc Hấp Bầu Cuốn Bánh Tráng",
    "emoji": "🐟",
    "description": "Cá lóc đồng nằm trọn trong trái bầu hấp chín ngọt lịm chấm mắm nêm",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Bèo Chén Tôm Chấy Mỡ Hành",
    "emoji": "🥣",
    "description": "Bánh bèo mềm mướt trong từng chén nhỏ phủ tôm chấy da heo chiên giòn",
    "tag": "Xứ Huế"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cua Biển Hấp Muối Tiêu Chanh",
    "emoji": "🦀",
    "description": "Cua Cà Mau gạch son chắc nịch hấp nguyên con giữ trọn vị ngọt biển",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Bao Xá Xíu Phồn Hoa",
    "emoji": "🥟",
    "description": "Bánh bao nhân xá xíu đậm vị ngọt mặn sốt sánh đỏ thơm lừng",
    "tag": "Chuẩn Hoa"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Diêu Hồng Hấp Xì Dầu Nấm Hương",
    "emoji": "🐟",
    "description": "Cá diêu hồng tươi ngọt sốt xì dầu gừng sợi hành hoa thì là thơm ngát",
    "tag": "Thanh vị"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Sò Lụa Hấp Thái Chua Cay",
    "emoji": "🐚",
    "description": "Sò lụa ngọt nước đẫm sốt me cay kiểu Thái thơm mùi sả ớt lá chanh",
    "tag": "Cay tê"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Tai Heo Luộc Giòn Chấm Mắm Tôm",
    "emoji": "🥓",
    "description": "Tai heo luộc trắng giòn sần sật thái mỏng chấm mắm tôm đánh bọt chanh ớt",
    "tag": "Giòn sần sật"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Chân Giò Heo Rút Xương Hấp Nấm",
    "emoji": "🍖",
    "description": "Chân giò cuộn nấm đông cô hấp mềm rục thái khoanh tròn đẹp mắt",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bao Tử Heo Hấp Tiêu Xanh",
    "emoji": "🥣",
    "description": "Bao tử heo làm sạch giòn sần sật hấp tiêu xanh thơm nồng ấm bụng",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Hồi Hấp Gừng Hành Sốt Tương",
    "emoji": "🐟",
    "description": "Cá hồi phi lê hấp vừa chín tới mềm ngọt thơm dịu hương gừng và sốt tương",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Bột Lọc Hấp Tôm Thịt Lá Chuối",
    "emoji": "🥟",
    "description": "Bánh bột lọc trong veo thấy rõ tôm đỏ thịt mỡ chấm mắm ớt cay xè",
    "tag": "Huế"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bắp Bò Luộc Mắm Gừng Ớt",
    "emoji": "🥩",
    "description": "Bắp bò hoa luộc chín tới giòn ngọt thái mỏng chấm nước mắm gừng tỏi cay",
    "tag": "Lai rai"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Lòng Heo Luộc Thập Cẩm Chấm Mắm Tôm",
    "emoji": "🥣",
    "description": "Lòng non dồi trường gan cuống họng luộc giòn sần sật thơm phức",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Súp Cua Gà Xé Nấm Đông Cô",
    "emoji": "🥣",
    "description": "Bát súp cua sánh mượt ngọt lịm thịt cua bể gà xé trứng cút nấm đông cô",
    "tag": "Ấm lòng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Chẽm Hấp Tàu Xì Gốc Hoa",
    "emoji": "🐟",
    "description": "Cá chẽm phi lê hấp tương đen tàu xì thơm bùi mặn mòi hạt tiêu",
    "tag": "Quảng Đông"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Thịt Bò Tái Chanh Hành Tây",
    "emoji": "🥩",
    "description": "Thịt bò tươi tái chanh chua dịu bóp hành tây rau răm đậu phộng mè rang",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Mực Ống Hấp Nước Dừa Xiêm",
    "emoji": "🦑",
    "description": "Mực ống cơm hấp nước dừa tươi ngọt lịm giòn sần sật chấm mắm ớt",
    "tag": "Thanh ngọt"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Nậm Tôm Thịt Lá Chuối",
    "emoji": "🥟",
    "description": "Bánh nậm mềm mịn thơm mùi lá chuối rải tôm thịt rim đỏ au",
    "tag": "Xứ Huế"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Gà Hấp Muối Hột Lá Chuối",
    "emoji": "🍗",
    "description": "Gà ta ủ muối hột kín nắp hấp chín bằng hơi muối da giòn vàng rộm",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Mú Hấp Hồng Kông Xì Dầu",
    "emoji": "🐟",
    "description": "Cá mú tươi sống hấp chuẩn vị Hồng Kông nước sốt xì dầu gừng hành",
    "tag": "Nhà hàng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Chả Lụa Heo Luộc Truyền Thống",
    "emoji": "🥢",
    "description": "Chả lụa giòn dai thơm mùi nước mắm cốt chấm muối tiêu chanh",
    "tag": "Quen thuộc"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Nghêu Hấp Nước Dừa Tươi Sả",
    "emoji": "🐚",
    "description": "Nghêu tươi ngọt nấu cùng nước dừa béo thanh thơm mùi sả ớt đập dập",
    "tag": "Mát ngọt"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Tráp Hấp Chanh Sả Chua Cay",
    "emoji": "🐟",
    "description": "Cá biển thịt trắng ngọt hấp chanh sả ớt kiểu Thái Lan chua thanh giải ngấy",
    "tag": "Thái"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Trứng Hấp Kiểu Nhật Chawanmushi",
    "emoji": "🥚",
    "description": "Trứng hấp mềm mịn như thạch tan ngay trong miệng tôm tươi nấm đông cô",
    "tag": "Nhật Bản"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Vịt Luộc Chấm Nước Mắm Gừng Sả",
    "emoji": "🦆",
    "description": "Thịt vịt cỏ ngọt mềm béo ngậy chấm nước mắm gừng tỏi ớt cay tê",
    "tag": "Dân dã"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bò Cuộn Cải Bẹ Xanh Chấm Mù Tạt",
    "emoji": "🥩",
    "description": "Thịt bò thăn chần tái cuộn lá cải cay nồng chấm xì dầu mù tạt",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Hàu Hấp Sả Gừng Chấm Mù Tạt",
    "emoji": "🦪",
    "description": "Hàu sữa hấp vừa hé miệng giữ trọn vị ngọt béo chấm mù tạt cay nồng",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Lăng Hấp Xì Dầu Thì Là",
    "emoji": "🐟",
    "description": "Cá lăng da trơn béo ngậy hấp xì dầu thì là hành hoa thơm lừng",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Tôm Hấp Nước Dừa Tươi Trái Dừa",
    "emoji": "🦐",
    "description": "Tôm càng đỏ au xếp quanh trái dừa hấp nước dừa ngọt thơm nức mũi",
    "tag": "Đẹp mắt"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Bao Nhân Thịt Trứng Cút Nóng",
    "emoji": "🥟",
    "description": "Chiếc bánh bao to bự bột mềm xốp nhân thịt nạc trứng cút thơm tiêu",
    "tag": "No bụng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Cá Tai Tượng Hấp Nấm Đông Cô",
    "emoji": "🐟",
    "description": "Cá tai tượng thịt ngọt dai hấp cùng nấm đông cô bún tàu sốt tương",
    "tag": "Miền Nam"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bao Tử Cá Basa Hấp Hành Gừng",
    "emoji": "🐟",
    "description": "Bao tử cá basa giòn sần sật hấp hành gừng thơm chấm nước mắm tỏi ớt",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Đậu Hũ Non Hấp Thịt Băm Nấm Mỡ",
    "emoji": "🧈",
    "description": "Đậu hũ non mềm mịn ngập thịt băm xào nấm mỡ sốt xì dầu thơm ngậy",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Chả Quế Nướng Hấp Nóng Hổi",
    "emoji": "🥢",
    "description": "Miếng chả quế thơm lừng hương quế hồi kẹp bánh dày hoặc xôi trắng",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Chim Câu Hấp Lá Dứa Hạt Sen",
    "emoji": "🕊️",
    "description": "Chim bồ câu non hấp lá dứa thơm mát củ sen hạt sen bùi béo bổ dưỡng",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Bánh Ít Trần Nhân Tôm Thịt Mỡ Hành",
    "emoji": "🥟",
    "description": "Vỏ nếp dẻo quánh nhân tôm thịt đậm đà phủ mỡ hành tôm chấy",
    "tag": "Miền Trung"
  },
  {
    "category": "Món Hấp & Luộc Thanh Ngọt",
    "name": "Móng Giò Heo Hấp Bia Sả Ớt",
    "emoji": "🍖",
    "description": "Móng giò giòn dẻo hấp bia sả thơm lừng chấm muối ớt chanh sả",
    "tag": "Ấm cúng"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Ngó Sen Tôm Thịt Tai Heo",
    "emoji": "🥗",
    "description": "Ngó sen giòn trắng muốt tôm tươi tai heo giòn sần sật nước mắm chua ngọt",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Phở Cuốn Bò Xào Rau Thơm Hà Nội",
    "emoji": "🥢",
    "description": "Bánh phở mềm cuộn thịt bò xào thơm lừng rau xà lách chấm nước mắm tỏi ớt",
    "tag": "Phố cổ"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Bò Khô Đu Đủ Chua Ngọt",
    "emoji": "🥗",
    "description": "Đu đủ xanh bào giòn rụm bò khô dai cay đậu phộng rang nước mắm chua ngọt",
    "tag": "Ăn vặt"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Bánh Tráng Cuốn Thịt Heo Luộc Mắm Nêm",
    "emoji": "🥓",
    "description": "Thịt ba chỉ hai đầu mỡ cuốn bánh tráng rau rừng chấm mắm nêm Đà Nẵng",
    "tag": "Đà Nẵng"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Cuốn Tôm Nhảy Tương Đậu Phộng",
    "emoji": "🦐",
    "description": "Tôm tươi đỏ au cuộn bánh tráng rau sống bún chấm tương bơ đậu phộng béo",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Sứa Biển Đỏ Chua Cay Giòn Sần Sật",
    "emoji": "🪼",
    "description": "Sứa biển giòn sần sật hoa chuối cà rốt rau thơm mè rang nước mắm chanh",
    "tag": "Giải nhiệt"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Củ Hũ Dừa Tôm Thịt Bến Tre",
    "emoji": "🥥",
    "description": "Củ hũ dừa giòn ngọt trắng nõn trộn tôm thịt mực nước mắm chua ngọt",
    "tag": "Bến Tre"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Bưởi Tôm Mực Thanh Dịu",
    "emoji": "🍊",
    "description": "Tép bưởi mọng nước chua thanh trộn tôm sú mực tươi rắc hành phi đậu phộng",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Bò Bía Mặn Lạp Xưởng Củ Đậu",
    "emoji": "🥢",
    "description": "Bánh tráng cuộn củ đậu hấp ngọt lạp xưởng tôm khô chấm tương đen đậu phộng",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Tai Heo Dưa Leo Cà Rốt",
    "emoji": "🥓",
    "description": "Tai heo luộc giòn sần sật dưa leo bào giòn mát thấm đẫm mắm chua cay",
    "tag": "Lai rai"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Gà Xé Phay Hành Tây Rau Răm",
    "emoji": "🍗",
    "description": "Gà ta xé sợi bóp chanh ớt hành tây ngâm giấm chua ngọt thơm nức rau răm",
    "tag": "Quen thuộc"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Hoa Chuối Tai Heo Bùi Bùi",
    "emoji": "🥗",
    "description": "Hoa chuối thái mỏng trắng nõn tai heo giòn dai lạc rang thơm bùi",
    "tag": "Dân dã"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Cá Trích Phú Quốc Cuốn Bánh Tráng",
    "emoji": "🐟",
    "description": "Cá trích tươi sống tái chanh dừa nạo cuốn bánh tráng chấm mắm ớt đậu phộng",
    "tag": "Phú Quốc"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Vịt Bắp Cải Tía Tô Nước Mắm Gừng",
    "emoji": "🦆",
    "description": "Thịt vịt luộc béo mềm bắp cải bào giòn thơm lá tía tô chấm mắm gừng",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Cuốn Nem Nướng Lụi Chả Ram Giòn",
    "emoji": "🥢",
    "description": "Nem nướng thơm phức cuốn bánh tráng kèm ram chiên giòn rụm sốt tương đậu",
    "tag": "Nha Trang"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Đu Đủ Tép Bạc Đồng Chua Cay",
    "emoji": "🦐",
    "description": "Tép đồng rang vàng trộn đu đủ xanh bào giòn rụm chua chua ngọt ngọt",
    "tag": "Nam Bộ"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Rong Nho Tươi Tôm Sú Sốt Mè",
    "emoji": "🍇",
    "description": "Rong nho biển giòn bụp bụp tôm tươi sốt mè rang béo ngậy thanh mát",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Bò Cuộn Bánh Tráng Phơi Sương Trảng Bàng",
    "emoji": "🥩",
    "description": "Bắp bò hoa luộc mềm cuốn bánh tráng phơi sương rau rừng mắm nêm",
    "tag": "Tây Ninh"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Xoài Xanh Cá Sặc Rán Giòn",
    "emoji": "🐟",
    "description": "Cá sặc mặn mòi xé nhỏ trộn xoài xanh chua giòn rụm rau răm ớt hiểm",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Chân Gà Rút Xương Sả Quất",
    "emoji": "🍗",
    "description": "Chân gà rút xương giòn sần sật vị chua thanh thơm nức mùi quất và sả",
    "tag": "Ghiền liền"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Cá Hồi Tươi Sốt Chanh Dây",
    "emoji": "🐟",
    "description": "Cá hồi Nauy tươi sống cắt hạt lựu sốt chanh leo chua dịu ngò tây thơm",
    "tag": "Sang trọng"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Cuốn Diếp Chả Cá Cần Thơ",
    "emoji": "🥬",
    "description": "Lá cải xanh cuốn chả cá hấp thịt ba chỉ chấm mắm me chua ngọt cay",
    "tag": "Cần Thơ"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Mực Chua Cay Kiểu Thái Lan",
    "emoji": "🦑",
    "description": "Mực tươi giòn sần sật trộn ớt bột nước cốt chanh sả lá chanh chuẩn Thái",
    "tag": "Thái Lan"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Rau Muống Chẻ Thịt Bò Xào",
    "emoji": "🥬",
    "description": "Rau muống chẻ sợi xoăn tít giòn rụm trộn thịt bò xào tỏi ớt đậu phộng",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Bắp Chuối Thịt Gà Đồi",
    "emoji": "🍗",
    "description": "Bắp chuối non ngọt chát dịu thịt gà thả đồi bóp giấm ớt thơm nồng",
    "tag": "Vùng cao"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Cuốn Tôm Thịt Lá Cải Chấm Mù Tạt",
    "emoji": "🦐",
    "description": "Tôm thịt cuộn trong lá cải bẹ xanh tươi non chấm xì dầu mù tạt cay nồng",
    "tag": "Cay tê"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Xoài Tôm Khô Cay Ngọt",
    "emoji": "🦐",
    "description": "Xoài xanh băm sợi chua dịu tôm khô ngọt bùi nước mắm đường sánh quyện",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Ốc Bươu Xoài Xanh Tía Tô",
    "emoji": "🐚",
    "description": "Ốc bươu luộc giòn sần sật xoài xanh chua giòn thơm ngát lá tía tô mè rang",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Bò Bóp Thấu Chuối Chát Khế Chua",
    "emoji": "🥩",
    "description": "Thịt bò tái mềm bóp khế chua chuối xanh chát đậu phộng mè rang hành phi",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Bánh Tráng Cuốn Cá Nục Hấp Mắm Nêm",
    "emoji": "🐟",
    "description": "Cá nục hấp ngọt lịm cuốn bánh tráng rau muống non chấm mắm nêm cay",
    "tag": "Đà Nẵng"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Sứa Dưa Chuột Cà Rốt Lạc Rang",
    "emoji": "🪼",
    "description": "Sứa biển giòn mát dưa chuột thanh ngọt lạc rang thơm bùi ăn giải nhiệt",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Lươn Hoa Chuối Giòn Ngọt",
    "emoji": "🐟",
    "description": "Thịt lươn chiên giòn trộn hoa chuối non nước mắm me thơm nức rau răm",
    "tag": "Xứ Nghệ"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Cuốn Thịt Nướng Kim Chi Bánh Tráng",
    "emoji": "🥓",
    "description": "Thịt nướng than hoa cuộn bánh tráng kim chi chua cay rau xà lách tươi",
    "tag": "Hàn Việt"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Măng Chua Tôm Thịt Mộc Mạc",
    "emoji": "🎋",
    "description": "Măng rừng ngâm chua giòn sần sật trộn tôm thịt rau răm ớt đỏ cay nồng",
    "tag": "Tây Bắc"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Củ Đậu Tôm Khô Rau Húng",
    "emoji": "🥗",
    "description": "Củ đậu thái sợi giòn mọng nước tôm khô ngọt đậm nước mắm chua ngọt",
    "tag": "Mát lành"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Ếch Bắp Chuối Xé Phay",
    "emoji": "🐸",
    "description": "Thịt đùi ếch luộc xé sợi bắp chuối non thái mỏng rau răm đậu phộng",
    "tag": "Dân dã"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Cuốn Chả Giò Rau Sống Bánh Tráng",
    "emoji": "🥢",
    "description": "Chả giò chiên giòn tan cuốn trong bánh tráng rau sống chấm mắm chua ngọt",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Cá Mai Nha Trang Nước Chấm Mè",
    "emoji": "🐟",
    "description": "Cá mai tươi rói bóp chanh tái ngọt lịm chấm sốt đậu phộng mè rang",
    "tag": "Nha Trang"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Su Hào Cà Rốt Bò Khô",
    "emoji": "🥗",
    "description": "Su hào cà rốt thái sợi giòn sần sật bò khô cay nồng rau thơm phố cổ",
    "tag": "Quen thuộc"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Khổ Qua Chà Bông Đá Lạnh",
    "emoji": "🥒",
    "description": "Khổ qua thái mỏng ướp đá lạnh giòn tan rắc chà bông mặn mà chấm mắm ớt",
    "tag": "Thanh nhiệt"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Bánh Tráng Cuốn Bò Tơ Rau Mầm",
    "emoji": "🥩",
    "description": "Bò tơ mềm ngọt cuốn rau mầm tươi non sốt mù tạt mật ong thanh mát",
    "tag": "Mới lạ"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Đọt Dừa Tôm Mực Nước Mắm Nhĩ",
    "emoji": "🥥",
    "description": "Đọt dừa non ngọt lịm tôm mực tươi sốt mắm nhĩ ớt xiêm thơm lừng",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Dạ Dày Heo Giòn Dưa Leo",
    "emoji": "🥣",
    "description": "Dạ dày heo luộc trắng giòn sần sật dưa leo thanh mát nước mắm tỏi ớt",
    "tag": "Lai rai"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Củ Sen Chân Gà Rút Xương",
    "emoji": "🍗",
    "description": "Củ sen giòn bùi chân gà rút xương dai giòn sốt chua ngọt hấp dẫn",
    "tag": "Mê ly"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Cuốn Trứng Đậu Phụ Rau Mầm Chấm Tương",
    "emoji": "🧈",
    "description": "Trứng rán thái chỉ đậu phụ chiên rau mầm bánh tráng chấm tương bần",
    "tag": "Thanh đạm"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Bông Súng Tôm Đất Nước Cốt Me",
    "emoji": "🌸",
    "description": "Cọng bông súng giòn xốp tôm đất ngọt thịt đượm sốt me chua cay miền Tây",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Nộm Rau Tiến Vua Tai Heo Giòn Sần Sật",
    "emoji": "🥬",
    "description": "Rau tiến vua ngâm giòn sần sật tai heo béo giòn nước mắm chua ngọt",
    "tag": "Tiến vua"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Măng Cụt Gà Ta Lái Thiêu",
    "emoji": "🍗",
    "description": "Măng cụt xanh giòn chua ngọt trộn thịt gà ta đồi xé sợi nức tiếng",
    "tag": "Cơn sốt"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Cuốn Bì Heo Thính Gạo Rau Sống",
    "emoji": "🥓",
    "description": "Bì heo trộn thính gạo thơm phức cuốn bánh tráng rau thơm chấm mắm tỏi",
    "tag": "Nam Bộ"
  },
  {
    "category": "Món Gỏi & Cuốn Thanh Mát",
    "name": "Gỏi Tép Đồng Nhảy Tía Tô Chua Cay",
    "emoji": "🦐",
    "description": "Tép đồng tươi ngọt trộn nước cốt chanh lá tía tô ớt hiểm thơm the",
    "tag": "Mộc mạc"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Trộn Bò Khô Trứng Cút",
    "emoji": "🍕",
    "description": "Bánh tráng dẻo thơm bò khô mực xé xoài xanh trứng cút sốt tắc me",
    "tag": "Đệ nhất"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Nướng Đà Lạt Mỡ Hành",
    "emoji": "🍕",
    "description": "Pizza Việt Nam nướng than giòn rụm trứng cút bò băm phô mai xúc xích",
    "tag": "Đà Lạt"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Cá Viên Bò Viên Tôm Viên Chiên Giòn",
    "emoji": "🍢",
    "description": "Xiên que cá bò tôm viên chiên vàng phồng chấm tương đen tương ớt",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Xúc Xích Nướng Đá Hà Khẩu Cay Thơm",
    "emoji": "🌭",
    "description": "Xúc xích nướng trên sỏi đá nóng rắc ớt bột tê cay chuẩn Hà Khẩu",
    "tag": "Hot trend"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Cuốn Bơ Sốt Trứng Cút",
    "emoji": "🌯",
    "description": "Bánh tráng cuộn sốt bơ béo ngậy hành phi ruốc tép trứng cút bùi thơm",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Trứng Chén Nướng Phô Mai Mỡ Hành",
    "emoji": "🍳",
    "description": "Trứng cút nướng trong chén gốm nhỏ phô mai hành phi tóp mỡ xèo xèo",
    "tag": "Nóng hổi"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Cút Lộn Xào Me Chua Ngọt Đậu Phộng",
    "emoji": "🥚",
    "description": "Trứng cút lộn chiên săn đẫm sốt me chua cay rắc đậu phộng rau răm",
    "tag": "Quen thuộc"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Chấm Sốt Bơ Tắc Mỡ Hành",
    "emoji": "🧈",
    "description": "Bánh tráng phơi sương chấm ngập sốt bơ trứng muối tắc chua cay",
    "tag": "Gây nghiện"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Nem Nướng Lụi Xiên Que Chấm Tương",
    "emoji": "🍢",
    "description": "Nem nướng thịt heo thơm phức quết que tre nướng vàng xém cạnh",
    "tag": "Thơm lừng"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Hồ Lô Nướng Mật Ong Than Hoa",
    "emoji": "🍡",
    "description": "Viên thịt hồ lô tròn xoe nướng mật ong da giòn thịt ngọt ngào",
    "tag": "Khoái khẩu"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Chân Gà Rút Xương Sả Tắc Cóc Non",
    "emoji": "🍗",
    "description": "Chân gà giòn sần sật ngâm cóc non sả ớt tắc chua cay giòn tan",
    "tag": "Ăn là mê"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bắp Xào Bơ Tép Mỡ Hành Tóp Mỡ",
    "emoji": "🌽",
    "description": "Bắp ngọt xào bơ thơm ngát tép khô mặn mòi tóp mỡ giòn rụm",
    "tag": "Đường phố"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Phô Mai Que Chiên Giòn Kéo Sợi",
    "emoji": "🧀",
    "description": "Thanh phô mai mozzarella chiên vàng rộm cắn ngập miệng kéo sợi dài",
    "tag": "Béo thơm"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Nướng Mắm Ruốc Ninh Thuận",
    "emoji": "🍕",
    "description": "Bánh tráng nướng mắm ruốc thơm nồng nem chua chả lụa mỡ hành",
    "tag": "Ninh Thuận"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Tàu Hũ Trân Châu Đường Đen Nóng",
    "emoji": "🍮",
    "description": "Tàu hũ mềm mịn núng nính ngập trân châu đường đen dẻo thơm",
    "tag": "Núng nính"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Khoai Lang Kén Chiên Vàng Giòn",
    "emoji": "🍠",
    "description": "Khoai lang ngọt thơm bọc nước cốt dừa mè đen chiên vàng giòn rụm",
    "tag": "Thơm bùi"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Chuối Nếp Nướng Nước Cốt Dừa",
    "emoji": "🍌",
    "description": "Chuối bọc xôi nếp nướng lá chuối giòn rụm chan cốt dừa béo ngậy",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Nem Chua Bọc Phô Mai Chiên Xù",
    "emoji": "🥓",
    "description": "Nem chua rán giòn rụm nhân phô mai béo ngậy kéo sợi tan chảy",
    "tag": "Đỉnh chóp"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Chả Cá Dây Chiên Xù Tương Ớt",
    "emoji": "🍢",
    "description": "Chả cá sợi dài chiên vàng phồng giòn dai chấm tương ớt cay ngọt",
    "tag": "Cổng trường"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Lụi Tây Nguyên Sốt Me",
    "emoji": "🌯",
    "description": "Bánh tráng cuộn thịt băm nấm mèo nướng than chấm sốt me sệt cay",
    "tag": "Tây Nguyên"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Ốc Nhồi Thịt Hấp Sả Ống Nứa",
    "emoji": "🐚",
    "description": "Ốc bươu nhồi thịt giòn sần sật hấp sả trong ống nứa thơm nức mũi",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Kẹp Trứng Nướng Đà Nẵng",
    "emoji": "🍕",
    "description": "Bánh tráng kẹp trứng pate bò khô mỡ hành nướng giòn rụm",
    "tag": "Đà Nẵng"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bò Cuộn Lá Lốt Xiên Nướng Than",
    "emoji": "🥩",
    "description": "Xiên bò lá lốt nướng thơm ngát mỡ hành đậu phộng chấm mắm nêm",
    "tag": "Thơm nức"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Xiên Mực Khô Nướng Sa Tế Cóc Cay",
    "emoji": "🦑",
    "description": "Mực khô cán mỏng nướng sa tế cay xè ăn kèm cóc non xoài chua",
    "tag": "Lai rai"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Khoai Tây Lốc Xoáy Chiên Giòn Phô Mai",
    "emoji": "🥔",
    "description": "Khoai tây cắt xoắn ốc que dài chiên giòn rụm lắc phô mai ngọt",
    "tag": "Bắt mắt"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tiêu Sầu Riêng Phô Mai Nóng",
    "emoji": "🥯",
    "description": "Bánh tiêu chiên phồng ruột ngập sốt sầu riêng phô mai thơm ngát",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Chè Bưởi An Giang Nước Cốt Dừa",
    "emoji": "🥥",
    "description": "Cùi bưởi giòn sần sật đỗ xanh bùi bùi chan cốt dừa béo ngậy",
    "tag": "Mát lòng"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Trứng Gà Nướng Thái Lan Chấm Muối Tiêu",
    "emoji": "🥚",
    "description": "Trứng gà tẩm gia vị tiêu ớt mật ong nướng than thơm nức mũi",
    "tag": "Thái Lan"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Xiên Nem Nướng Phô Mai Chảy",
    "emoji": "🍢",
    "description": "Nem nướng thơm phức bọc phô mai que nướng chảy vàng xèo xèo",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Bơ Đỏ Tôm Khô Hành Phi",
    "emoji": "🧈",
    "description": "Bánh tráng dẻo cuộn sốt bơ đỏ béo ngậy tôm khô hành phi giòn",
    "tag": "Ghiền liền"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Khô Bò Vắt Chanh Ớt Tươi",
    "emoji": "🥩",
    "description": "Thịt bò khô miếng to mềm cay xè vắt đẫm nước cốt chanh tươi chua dịu",
    "tag": "Khoái khẩu"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Gà Lắc Phô Mai Trứng Muối Giòn",
    "emoji": "🍗",
    "description": "Gà chiên giòn rụm lắc đẫm bột phô mai béo ngậy và trứng muối",
    "tag": "Hot hit"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Bột Lọc Chiên Chấm Tương Cay",
    "emoji": "🥟",
    "description": "Bột lọc chiên phồng rộp vỏ giòn dẻo nhân tôm thịt mặn mòi",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Mì Nướng Muối Ớt Chà Bông",
    "emoji": "🥖",
    "description": "Bánh mì ép dẹp nướng giòn quết bơ muối ớt mỡ hành trứng cút chà bông",
    "tag": "Sài Gòn"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Da Heo Chiên Giòn Lắc Tỏi Ớt",
    "emoji": "🥓",
    "description": "Da heo nổ cốm giòn tan rụm xóc mắm tỏi ớt đường cay mặn ngọt",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Xôi Chiên Phồng Nhân Thịt Mộc Nhĩ",
    "emoji": "🍚",
    "description": "Bánh nếp chiên phồng giòn rụm xẻ đôi nhồi thịt băm mộc nhĩ hành phi",
    "tag": "Ăn xế"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Rán Doremon Kẹp Kem Socola",
    "emoji": "🥞",
    "description": "Bánh dorayaki mềm xốp nhân kem socola hoặc trà xanh ngọt ngào",
    "tag": "Dễ thương"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Xúc Xích Lốc Xoáy Tẩm Bột Bắp Chiên",
    "emoji": "🌭",
    "description": "Xúc xích xiên que bọc bột ngô chiên xù rưới sốt tương cà mù tạt",
    "tag": "Hàn Quốc"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Flan Caramen Cà Phê Cốt Dừa",
    "emoji": "🍮",
    "description": "Bánh flan mềm mịn béo ngậy đắng nhẹ caramen cà phê sữa đá bào",
    "tag": "Thơm mát"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Trộn Sa Tế Tỏi Phi Cay Xè",
    "emoji": "🌶️",
    "description": "Bánh tráng trộn sa tế ớt hiểm cay nồng tỏi phi giòn rụm hít hà",
    "tag": "Cay xè"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Dồi Sụn Nướng Xiên Que Vỉa Hè",
    "emoji": "🥢",
    "description": "Xiên dồi sụn nướng than hoa thơm nức mũi nhai giòn sần sật",
    "tag": "Vỉa hè"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Chả Tôm Nướng Mía Thơm Ngọt",
    "emoji": "🦐",
    "description": "Chả tôm quết dẻo bọc quanh thanh mía nướng than hoa ngọt thanh",
    "tag": "Thanh lịch"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Trứng Cút Nướng Bơ Hành Xúc Xích",
    "emoji": "🍳",
    "description": "Trứng cút thơm nức mũi nướng bơ xúc xích ngô ngọt hành hoa",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Khoai Mì Nướng Than Cốt Dừa",
    "emoji": "🍠",
    "description": "Khoai mì bào sợi nướng than hoa thơm lừng mùi sữa dừa béo bùi",
    "tag": "Dân dã"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bắp Nướng Mỡ Hành Tóp Mỡ Cay",
    "emoji": "🌽",
    "description": "Trái bắp nếp nướng than hoa vàng rộm chan đẫm mỡ hành tóp mỡ ớt",
    "tag": "Kỷ niệm"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Cá Chỉ Vàng Nướng Cồn Chấm Tương Ớt",
    "emoji": "🐟",
    "description": "Cá chỉ vàng nướng thơm nức mũi ngọt thịt chấm tương ớt cay",
    "tag": "Lai rai"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tráng Me Bơ Trứng Cút Bùi Ngậy",
    "emoji": "🌯",
    "description": "Bánh tráng chấm nước sốt me dẻo quánh sốt bơ trứng cút bùi ngậy",
    "tag": "Chua ngọt"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Xiên Heo Nướng Mật Ong Sả Cổng Trường",
    "emoji": "🍢",
    "description": "Xiên thịt heo ướp sả mật ong nướng than hoa xèo xèo thơm nức",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Bánh Tằm Bì Nước Cốt Dừa Miền Tây",
    "emoji": "🍜",
    "description": "Sợi bánh tằm mềm dai bì heo thính thơm chan nước cốt dừa mặn ngọt",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Ăn Vặt & Xiên Bẩn",
    "name": "Kem Bơ Đà Lạt Sầu Riêng Béo Ngậy",
    "emoji": "🥑",
    "description": "Bơ sáp xay sánh mịn viên kem dừa béo ngậy kèm múi sầu riêng thơm",
    "tag": "Đà Lạt"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Hương Sốt Trứng Muối Bánh Mì",
    "emoji": "🐚",
    "description": "Ốc hương béo ngậy đẫm sốt trứng muối vàng óng chấm bánh mì giòn",
    "tag": "Cực phẩm"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Móng Tay Xào Me Chua Cay",
    "emoji": "🐚",
    "description": "Ốc móng tay giòn ngọt tắm sốt me sệt chua ngọt rắc đậu phộng rau răm",
    "tag": "Quốc dân"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Hàu Nướng Phô Mai Mozzarella",
    "emoji": "🦪",
    "description": "Hàu sữa béo múp ngập phô mai mozzarella kéo sợi xèo xèo than hồng",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Hàu Nướng Mỡ Hành Đậu Phộng",
    "emoji": "🦪",
    "description": "Hàu tươi nướng mỡ hành thơm nức mũi đậu phộng giòn rụm chấm muối tiêu",
    "tag": "Thơm nức"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Điệp Nướng Trứng Cút Mỡ Hành",
    "emoji": "🐚",
    "description": "Cồi sò điệp ngọt lịm đập quả trứng cút nướng mỡ hành béo bùi",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Càng Ghẹ Rang Muối Ớt Cay Xè",
    "emoji": "🦀",
    "description": "Càng ghẹ phủ lớp muối ớt rang khô cay cay mặn mặn mút ngập răng",
    "tag": "Ghiền liền"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Bươu Nướng Tiêu Xanh Phú Quốc",
    "emoji": "🐚",
    "description": "Ốc bươu béo giòn nướng trong vỏ đẫm nước sốt tiêu xanh cay the",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Huyết Xào Tỏi Cháy Cạnh",
    "emoji": "🐚",
    "description": "Sò huyết béo bổ xào ngập tỏi phi vàng ươm thơm lừng rắc rau răm",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Lông Nướng Mỡ Hành Tóp Mỡ",
    "emoji": "🐚",
    "description": "Sò lông thịt dày ngọt đậm rưới đẫm mỡ hành tóp mỡ giòn rụm",
    "tag": "Quán ốc"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Len Xào Dừa Béo Ngậy Hút Xì Xụp",
    "emoji": "🐚",
    "description": "Ốc len chặt đuôi hút xì xụp ngập trong nước cốt dừa sả ớt béo bùi",
    "tag": "Miền Tây"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Mực Trứng Nướng Sa Tế Muối Ớt",
    "emoji": "🦑",
    "description": "Mực trứng tươi ôm đầy nang trứng béo bùi nướng than hoa cay xè",
    "tag": "Cay nồng"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Bạch Tuộc Nướng Muối Ớt Xanh",
    "emoji": "🐙",
    "description": "Bạch tuộc nướng giòn sần sật thơm nồng chấm muối ớt xanh Nha Trang",
    "tag": "Nha Trang"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Tôm Tít Cháy Tỏi Bơ Cay",
    "emoji": "🦐",
    "description": "Bề bề thịt ngọt săn chắc cháy tỏi bơ cay thơm lừng cắn ngập miệng",
    "tag": "Hải sản"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Mỡ Xào Me Chấm Bánh Mì",
    "emoji": "🐚",
    "description": "Ốc mỡ giòn ngậy sốt me dẻo quánh chua cay bánh mì chấm hết sẩy",
    "tag": "Mê ly"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ngao Hai Cùi Hấp Sả Gừng Dứa",
    "emoji": "🐚",
    "description": "Ngao hai cùi thịt giòn ngọt sần sật nước hấp thanh ngọt thơm sả",
    "tag": "Thanh ngọt"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Cà Na Rang Muối Ớt Cay",
    "emoji": "🐚",
    "description": "Ốc cà na nhỏ xinh vỏ phủ muối ớt cay mặn mút chùn chụt cực đã",
    "tag": "Lai rai"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Chân Cua Hoàng Đế Hấp Bơ Tỏi",
    "emoji": "🦀",
    "description": "Chân cua King Crab thịt ngọt đậm đà chấm bơ tỏi chanh thơm ngậy",
    "tag": "Sang trọng"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Tôm Hùm Nướng Phô Mai Bỏ Lò",
    "emoji": "🦞",
    "description": "Tôm hùm tươi sống chẻ đôi phủ lớp phô mai nướng vàng cháy xém",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Dương Nướng Mỡ Hành Đậu Phộng",
    "emoji": "🐚",
    "description": "Sò dương thịt dày giòn ngọt nướng than mỡ hành thơm nức mũi",
    "tag": "Đặc sắc"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Giác Xào Rau Muống Tỏi Phi",
    "emoji": "🐚",
    "description": "Ốc giác thái mỏng giòn dai xào rau muống xanh giòn rụm thơm tỏi",
    "tag": "Bình dân"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Cua Cà Mau Sốt Me Cay Chua Ngọt",
    "emoji": "🦀",
    "description": "Cua thịt Cà Mau chắc nịch ngập trong sốt me chua cay sền sệt",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Tỏi Nướng Muối Ớt Cay Nồng",
    "emoji": "🐚",
    "description": "Ốc tỏi to đùng thịt dai giòn nướng muối ớt đỏ cay xé lưỡi",
    "tag": "Cay tê"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Mực Ống Hấp Hành Gừng Chấm Mắm Gừng",
    "emoji": "🦑",
    "description": "Mực ống tươi rói luộc giòn ngọt chấm nước mắm gừng ớt cay nồng",
    "tag": "Tươi rói"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Nghêu Hấp Thái Sả Ớt Lá Chanh",
    "emoji": "🐚",
    "description": "Nước nghêu nấu chua cay Tomyum bốc khói nghi ngút húp ấm bụng",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Mía Hấp Sả Ớt Gừng",
    "emoji": "🐚",
    "description": "Sò mía vỏ mỏng thịt đầy nước hấp sả gừng ngọt lịm chấm muối tiêu",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Bươu Nhồi Thịt Hấp Lá Gừng",
    "emoji": "🐚",
    "description": "Thịt ốc giòn sần sật băm cùng mộc nhĩ nấm hương kéo cọng lá sả ra chấm",
    "tag": "Đặc sản"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Tôm Sú Rang Muối Hồng Kông",
    "emoji": "🦐",
    "description": "Tôm sú rang muối giòn tan vỏ mặn mặn thơm mùi tỏi ớt hành tây",
    "tag": "Chuẩn vị"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Mực Một Nắng Nướng Than Hoa Chấm Tương",
    "emoji": "🦑",
    "description": "Mực một nắng thịt dày ngọt mềm nướng than hoa thơm nức mũi",
    "tag": "Phan Thiết"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Càng Cúm Rang Muối Ớt Nóng",
    "emoji": "🦀",
    "description": "Càng cúm vỏ cứng thịt thơm ngọt phủ muối ớt rang khô mút cay cay",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Mai Nướng Mỡ Hành Trứng Cút",
    "emoji": "🐚",
    "description": "Sò mai khổng lồ thịt ngọt dai nướng trứng cút mỡ hành thơm nức",
    "tag": "Lạ mắt"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Gai Nướng Tiêu Xanh",
    "emoji": "🐚",
    "description": "Ốc gai thịt giòn sần sật nướng tiêu xanh thơm nồng ấm bụng",
    "tag": "Phú Quốc"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Chả Mực Hạ Long Giã Tay Chiên Giòn",
    "emoji": "🦑",
    "description": "Chả mực dai giòn sần sật chiên vàng ươm chấm tương ớt cay ngọt",
    "tag": "Hạ Long"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Tôm Càng Xanh Nướng Muối Ớt",
    "emoji": "🦐",
    "description": "Tôm càng gạch béo ngậy nướng muối ớt đỏ tươi thơm lừng",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Vú Nàng Hấp Sả Côn Đảo",
    "emoji": "🐚",
    "description": "Ốc vú nàng đặc sản Côn Đảo thịt ngọt mềm chấm muối tiêu chanh",
    "tag": "Côn Đảo"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Chén Nướng Mỡ Hành Đậu Phộng",
    "emoji": "🐚",
    "description": "Sò chén tròn thịt dày nướng mỡ hành tóp mỡ béo bùi",
    "tag": "Quán ốc"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Hàu Nướng Mù Tạt Phô Mai Cay",
    "emoji": "🦪",
    "description": "Vị cay nồng của mù tạt hòa quyện phô mai béo ngậy trên con hàu sữa",
    "tag": "Độc lạ"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Cua Lột Chiên Giòn Sốt Trứng Muối",
    "emoji": "🦀",
    "description": "Cua lột vỏ mềm ăn cả con chiên giòn đẫm sốt trứng muối béo bùi",
    "tag": "Sang chảnh"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Bông Xào Tỏi Bơ Cay",
    "emoji": "🐚",
    "description": "Ốc bông vỏ hoa đốm thịt giòn ngọt xào bơ tỏi thơm ngào ngạt",
    "tag": "Thơm bơ"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Mực Trứng Hấp Bia Gừng Sả",
    "emoji": "🦑",
    "description": "Mực trứng hấp bia sả thơm lừng trứng béo ngậy chấm mắm gừng",
    "tag": "Béo ngọt"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ngao Vàng Nướng Mỡ Hành",
    "emoji": "🐚",
    "description": "Ngao vàng thịt béo ngọt nướng mỡ hành than hoa thơm phức",
    "tag": "Dân dã"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Bạch Tuộc Nhúng Giấm Rau Rừng",
    "emoji": "🐙",
    "description": "Bạch tuộc tươi giòn sần sật nhúng nước giấm chua cuốn bánh tráng",
    "tag": "Lạ miệng"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Nhảy Nướng Than Hoa Phú Quốc",
    "emoji": "🐚",
    "description": "Ốc nhảy đực thịt ngọt giòn nhảy tách tách trên vỉ than hồng",
    "tag": "Phú Quốc"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Tôm Tít Hấp Nước Dừa Tươi",
    "emoji": "🦐",
    "description": "Bề bề thịt ngọt lịm hấp nước dừa tươi giữ trọn vị thanh biển",
    "tag": "Thanh vị"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Sò Lụa Xào Sa Tế Cay Xè",
    "emoji": "🐚",
    "description": "Sò lụa ngọt nước xào sa tế cay nồng thơm mùi tỏi ớt húng quế",
    "tag": "Cay xè"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Cá Đuối Nướng Mỡ Hành Chấm Mắm Me",
    "emoji": "🐟",
    "description": "Cá đuối thịt dai mềm sụn giòn nướng mỡ hành chấm mắm me chua cay",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Đỏ Nướng Muối Ớt Cay",
    "emoji": "🐚",
    "description": "Ốc đỏ thịt dai giòn sần sật ướp muối ớt nướng thơm lừng",
    "tag": "Lai rai"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Tôm Sú Tái Chanh Chấm Mù Tạt",
    "emoji": "🦐",
    "description": "Tôm sú tươi sống bóc nõn tái chanh chấm xì dầu mù tạt cay xộc mũi",
    "tag": "Tươi sống"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Hàu Né Phô Mai Trứng Gà Sốt Bơ",
    "emoji": "🦪",
    "description": "Hàu né chảo gang xèo xèo trứng gà lòng đào phô mai sốt bơ bánh mì",
    "tag": "Nóng hổi"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Ốc Hương Cháy Tỏi Giòn Tan",
    "emoji": "🐚",
    "description": "Ốc hương xào ngập tỏi phi vàng giòn rụm nhai thơm nức mũi",
    "tag": "Thơm nức"
  },
  {
    "category": "Món Ốc & Hải Sản Quán Gió",
    "name": "Lẩu Cua Biển Bầu Non Nước Trong",
    "emoji": "🦀",
    "description": "Cua biển gạch son nấu cùng trái bầu non nước lèo ngọt lịm thanh mát",
    "tag": "Tuyệt đỉnh"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bánh Gạo Tokbokki Sốt Cay Phô Mai",
    "emoji": "🍢",
    "description": "Bánh gạo dẻo dai sốt tương ớt Gochujang phô mai kéo sợi ngập tràn",
    "tag": "K-Food"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Cơm Cuộn Kimbap Truyền Thống",
    "emoji": "🍙",
    "description": "Rong biển cuộn cơm dẻo củ cải vàng thanh cua xúc xích trứng rán",
    "tag": "Chuẩn Hàn"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Cơm Trộn Bibimbap Thố Đá Nóng",
    "emoji": "🍲",
    "description": "Cơm thố đá nóng xèo xèo thịt bò băm rau củ tương ớt trứng lòng đào",
    "tag": "Nóng hổi"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Gà Rán Sốt Cay Yangnyeom Hàn Quốc",
    "emoji": "🍗",
    "description": "Gà rán giòn rụm áo lớp sốt đỏ ngọt cay bóng bẩy rắc mè rang",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Kim Chi Thịt Ba Chỉ Đậu Non",
    "emoji": "🥘",
    "description": "Kim chi chua cay ninh thịt ba chỉ đậu hũ non mềm mượt nóng hổi",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Mì Tương Đen Jajangmyeon Thịt Heo",
    "emoji": "🍜",
    "description": "Sợi mì dai ngập trong sốt tương đen chunjang béo bùi thịt băm dưa leo",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Gà Cay Phô Mai Đút Lò Xèo Xèo",
    "emoji": "🧀",
    "description": "Thịt gà sốt ớt cay xé lưỡi phủ lớp phô mai nướng chảy vàng thơm ngậy",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Thịt Ba Chỉ Nướng Samgyeopsal",
    "emoji": "🥓",
    "description": "Ba chỉ nướng xèo xèo cuốn lá kim mè tỏi nướng chấm ssamjang cay",
    "tag": "BBQ Hàn"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Mì Lạnh Naengmyeon Nước Dùng Đá Bào",
    "emoji": "🍜",
    "description": "Mì kiều mạch thanh mát nước dùng bò đá bào trứng luộc lê thái lát",
    "tag": "Mát lạnh"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Miến Trộn Japchae Thịt Bò Rau Củ",
    "emoji": "🥢",
    "description": "Miến khoai lang dai mềm trộn dầu mè thơm ngát thịt bò nấm đông cô",
    "tag": "Thơm lừng"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Rong Biển Thịt Bò Miyeokguk",
    "emoji": "🥣",
    "description": "Canh rong biển nấu thịt bò mềm thơm ngọt thanh bổ dưỡng ấm bụng",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Lẩu Quân Đội Budae Jjigae Thập Cẩm",
    "emoji": "🥘",
    "description": "Lẩu kim chi xúc xích thịt hộp spam mì gói phô mai đậu hũ non",
    "tag": "No căng"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Trứng Cuộn Phô Mai Rong Biển Gyeran Mari",
    "emoji": "🍳",
    "description": "Trứng rán cuộn nhiều lớp phô mai chảy béo ngậy rong biển thơm",
    "tag": "Mềm mịn"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bánh Xèo Kim Chi Hàn Quốc Kimchijeon",
    "emoji": "🥞",
    "description": "Bánh xèo bột giòn chiên kim chi chua cay và mực tươi thơm lừng",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bánh Xèo Hải Sản Hàn Quốc Haemul Pajeon",
    "emoji": "🥞",
    "description": "Bánh xèo ngập hành hoa tôm mực giòn rụm chấm nước tương giấm",
    "tag": "Thơm ngát"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bò Xào Bulgogi Sốt Tương Ngọt",
    "emoji": "🥩",
    "description": "Thịt bò thái mỏng ướp lê sốt tương ngọt xào hành tây nấm kim châm",
    "tag": "Ngọt mềm"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Sườn Bò Galbitang Trong Veo",
    "emoji": "🥣",
    "description": "Sườn bò hầm mềm rục nước súp trong veo ngọt lịm củ cải trắng miến",
    "tag": "Bồi bổ"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Mì Trộn Cay Bibim Guksu Trứng Luộc",
    "emoji": "🍜",
    "description": "Mì sợi nhỏ trộn sốt ớt cay chua ngọt kim chi giòn mát trứng luộc",
    "tag": "Kích thích"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Cơm Nắm Cá Ngừ Mayonnaise Samgak Kimbap",
    "emoji": "🍙",
    "description": "Cơm nắm tam giác bọc rong biển giòn nhân cá ngừ sốt mayo béo ngậy",
    "tag": "Tiện lợi"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Chả Cá Xiên Odeng Nước Dùng Củ Cải",
    "emoji": "🍢",
    "description": "Xiên chả cá mềm ngọt ngập trong nước dùng củ cải hành boa-rô nóng hổi",
    "tag": "Mùa đông"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Gà Rán Sốt Bơ Tỏi Mật Ong",
    "emoji": "🍗",
    "description": "Gà chiên giòn tan phủ sốt mật ong bơ tỏi ngọt thơm nức mũi",
    "tag": "Ngọt ngào"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Dồi Heo Hàn Quốc Sundae Hấp",
    "emoji": "🥢",
    "description": "Dồi nhồi miến nếp tiết heo hấp nóng chấm muối ớt bột tiêu",
    "tag": "Đường phố"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Lòng Bò Xào Cay Gopchang Bokkeum",
    "emoji": "🥘",
    "description": "Lòng bò giòn béo xào bắp cải sốt tương ớt cay nồng rắc mè",
    "tag": "Lai rai"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Thịt Heo Gukbap Busan",
    "emoji": "🥣",
    "description": "Cơm chan canh thịt heo hầm nước xương trắng đục hẹ tươi mắm tép",
    "tag": "Busan"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Mì Cay Hải Sản Jjamppong Đỏ Rực",
    "emoji": "🌶️",
    "description": "Mì hải sản tôm mực ngao nước dùng cay xè khói nghi ngút thơm ớt bột",
    "tag": "Cay tê"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Sườn Bò Hầm Galbijjim Sốt Tương",
    "emoji": "🍖",
    "description": "Dẻ sườn bò hầm mềm rục củ cải cà rốt hạt dẻ sốt tương ngọt béo",
    "tag": "Quý tộc"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bánh Rán Ngọt Hotteok Nhân Đường Quế",
    "emoji": "🥞",
    "description": "Vỏ bánh dẻo chiên vàng nhân đường mật mía quế và hạt óc chó bùi",
    "tag": "Ngọt ấm"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Chân Gà Cay Hàn Quốc Không Xương",
    "emoji": "🍗",
    "description": "Chân gà rút xương nướng sốt ớt bột cay xè nhắm bia lạnh tuyệt hảo",
    "tag": "Cay xè"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Cơm Chiên Kim Chi Trứng Ốp La",
    "emoji": "🍛",
    "description": "Cơm rang kim chi chua cay thịt nguội xúc xích trứng ốp la lòng đào",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Thịt Cổ Heo Nướng Sốt Mắm Tép Meljeot",
    "emoji": "🥓",
    "description": "Thịt nạc vai heo nướng than hoa chấm bát mắm tép sôi xèo xèo",
    "tag": "Jeju"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Mì Gói Cay Hàn Quốc Nấu Trứng Phô Mai",
    "emoji": "🍜",
    "description": "Bát mì Shin Ramyun nấu phô mai lát béo ngậy trứng gà hồng đào",
    "tag": "Ký túc xá"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Đậu Tương Doenjang Jjigae Bò",
    "emoji": "🥘",
    "description": "Canh tương đậu thơm bùi nấu ba chỉ bò bí ngòi nấm đậu phụ non",
    "tag": "Dân dã"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Mực Xào Cay Ojingeo Bokkeum",
    "emoji": "🦑",
    "description": "Mực tươi giòn sần sật xào hành tây ớt sừng sốt tương ớt đậm đà",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bánh Gạo Lắc Phô Mai Bột Chiên Giòn",
    "emoji": "🍢",
    "description": "Bánh gạo chiên phồng giòn rụm bên ngoài dẻo bên trong lắc phô mai",
    "tag": "Ăn vặt"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Khoai Tây Hầm Xốt Tương Mật Ong Gamja Jorim",
    "emoji": "🥔",
    "description": "Khoai tây bi kho mềm bùi ngấm đẫm sốt tương ngọt bóng bẩy mè",
    "tag": "Bùi ngọt"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Đậu Phụ Non Sundubu Jjigae Hải Sản",
    "emoji": "🥘",
    "description": "Đậu hũ non mềm mượt tan trong miệng nghêu tôm mực ớt cay xè",
    "tag": "Ấm lòng"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Thịt Heo Chiên Xù Donkatsu Hàn Quốc Sốt Nâu",
    "emoji": "🥓",
    "description": "Miếng thịt thăn heo đập mỏng chiên xù rưới đẫm sốt nâu đậm đà",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bò Xào Nấm Bulgogi Miến Dong",
    "emoji": "🥩",
    "description": "Thịt bò thăn mềm xào nấm đùi gà nấm kim châm ngọt nước miến dai",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Gà Hầm Sâm Samgyetang Bổ Dưỡng",
    "emoji": "🍗",
    "description": "Gà tơ nhồi gạo nếp nhân sâm táo đỏ hạt dẻ hầm nhừ thanh mát",
    "tag": "Bổ khí"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Kim Chi Cải Thảo Muối Cay Giòn",
    "emoji": "🥬",
    "description": "Cải thảo muối chua cay mặn ngọt giòn sần sật chuẩn hương vị Seoul",
    "tag": "Quốc hồn"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bánh Gạo Cay Xào Thịt Bò Cung Đình Gungjung",
    "emoji": "🍢",
    "description": "Bánh gạo xào thịt bò sốt tương ngọt không cay kiểu hoàng gia",
    "tag": "Cung đình"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Cơm Nắm Lắc Rong Biển Jumeokbap",
    "emoji": "🍙",
    "description": "Cơm trộn dầu mè rong biển vụn cá ngừ bóp nắm tròn xinh xắn",
    "tag": "Dễ thương"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Gà Nướng Sốt Phô Mai Chảo Gang",
    "emoji": "🍗",
    "description": "Thịt gà ướp sốt cay nướng trên chảo gang ngập phô mai kéo sợi",
    "tag": "Béo cay"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Thịt Ba Chỉ Luộc Bossam Cuốn Kim Chi",
    "emoji": "🥓",
    "description": "Thịt ba chỉ luộc thảo mộc mềm ngọt cuốn kim chi củ cải cay giòn",
    "tag": "Chuẩn vị"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bạch Tuộc Xào Cay Nakji Bokkeum",
    "emoji": "🐙",
    "description": "Bạch tuộc nhỏ xào cay xé lưỡi ăn kèm cơm trắng và giá đỗ luộc",
    "tag": "Thử thách"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Súp Chả Cá Nóng Eomuk Tang",
    "emoji": "🍢",
    "description": "Nồi súp chả cá thơm ngọt nước dùng rong biển thanh mát húp xì xụp",
    "tag": "Đường phố"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Mì Trộn Tương Đen Cay Jjambbong",
    "emoji": "🍜",
    "description": "Sự kết hợp giữa mì tương đen bùi béo và vị cay nồng hải sản",
    "tag": "Mới lạ"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Bánh Trứng Hàn Quốc Gyeran-bbang",
    "emoji": "🍞",
    "description": "Bánh mì ngọt mềm nướng nguyên quả trứng gà béo ngậy thơm lừng",
    "tag": "Mùa đông"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Canh Giá Đỗ Cay Giải Rượu Kongnamul Guk",
    "emoji": "🥣",
    "description": "Giá đỗ giòn thanh nấu ớt bột tỏi hành giải rượu giải cảm cực tốt",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Hàn Quốc K-Food",
    "name": "Kimbap Chiên Giòn Rụm Sốt Mayo",
    "emoji": "🍙",
    "description": "Cuộn kimbap tẩm bột chiên xù giòn tan chấm sốt tương ớt mayonnaise",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sashimi Cá Hồi Tươi Rói Nauy",
    "emoji": "🐟",
    "description": "Lát cá hồi béo ngậy tươi rói tan trong miệng chấm xì dầu mù tạt wasabi",
    "tag": "Tinh khiết"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sushi Nigiri Cá Hồi Khò Lửa Sốt Mè",
    "emoji": "🍣",
    "description": "Cơm giấm dẻo miếng cá hồi khò lửa xém thơm rưới sốt teriyaki mayo",
    "tag": "Tan chảy"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Bánh Xèo Nhật Bản Okonomiyaki",
    "emoji": "🥞",
    "description": "Bánh xèo bắp cải tôm mực thịt ba chỉ sốt nâu rong biển cá bào nhảy múa",
    "tag": "Osaka"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Bánh Bạch Tuộc Takoyaki Nóng Hổi",
    "emoji": "🐙",
    "description": "Viên bánh tròn xoe nhân bạch tuộc giòn sần sật sốt ngọt cá bào thơm nức",
    "tag": "Đường phố"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Mì Ramen Xương Heo Tonkotsu Chashu",
    "emoji": "🍜",
    "description": "Nước dùng hầm xương heo 12 tiếng sánh béo thịt chashu trứng lòng đào",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Mì Udon Bò Xào Sốt Teriyaki",
    "emoji": "🍜",
    "description": "Sợi mì udon to tròn dai dẻo xào thịt bò Mỹ mềm ngọt sốt Nhật",
    "tag": "No bụng"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Bò Nhật Bản Gyudon Hành Tây",
    "emoji": "🥩",
    "description": "Thịt bò thái mỏng xào hành tây mềm ngọt nước dùng mirin dashi chan cơm",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Heo Chiên Xù Tonkatsu Giòn Rụm",
    "emoji": "🥓",
    "description": "Thăn heo dày tẩm bột chiên xù giòn tan bắp cải bào sốt mè rang",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Mì Soba Kiều Mạch Lạnh Chấm Tsuyu",
    "emoji": "🥢",
    "description": "Mì kiều mạch ướp lạnh gắp chấm nước sốt tsuyu rong biển mát lạnh",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Tôm Tempura Chiên Giòn Rụm",
    "emoji": "🦐",
    "description": "Tôm sú bọc lớp bột tempura vàng xốp giòn tan chấm sốt củ cải mài",
    "tag": "Giòn xốp"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Lẩu Sukiyaki Bò Wagyu Trứng Sống",
    "emoji": "🍲",
    "description": "Thịt bò Wagyu vân mỡ nhúng nước tương ngọt chấm trứng gà sống béo ngậy",
    "tag": "Sang trọng"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Lươn Nướng Nhật Bản Unadon",
    "emoji": "🐟",
    "description": "Lươn nướng sốt kabayaki ngọt bóng bẩy mềm béo rắc tiêu sansho thơm",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Gà Xiên Nướng Yakitori Sốt Tare",
    "emoji": "🍢",
    "description": "Xiên gà nướng than hoa sốt tương ngọt tare xém cạnh thơm lừng",
    "tag": "Izakaya"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sushi Cuộn California Roll Trứng Cua",
    "emoji": "🍣",
    "description": "Cơm cuộn bơ sáp thanh cua dưa leo lăn ngập lớp trứng cá chuồn giòn bụp",
    "tag": "Bắt mắt"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Trứng Hấp Chawanmushi Nấm Đông Cô",
    "emoji": "🥚",
    "description": "Trứng hấp mịn màng như lụa tôm tươi thịt gà nấm ngân hạnh thanh tao",
    "tag": "Mềm mịn"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Cà Ri Nhật Bò Viên Phô Mai",
    "emoji": "🍛",
    "description": "Sốt cà ri Nhật thơm dịu ngọt béo cà rốt khoai tây thịt bò mềm nhừ",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sashimi Cá Ngừ Đại Dương Maguro",
    "emoji": "🐟",
    "description": "Thịt cá ngừ đỏ au ngọt đậm đà không chút tanh chấm wasabi cay nồng",
    "tag": "Tươi ngon"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Há Cảo Nhật Gyoza Áp Chảo Giòn Đáy",
    "emoji": "🥟",
    "description": "Vỏ há cảo mỏng áp chảo giòn một mặt nhân thịt băm bắp cải thơm gừng",
    "tag": "Giòn đáy"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Canh Rong Biển Tương Miso Đậu Hũ Non",
    "emoji": "🥣",
    "description": "Nước canh miso ấm lòng đậu hũ non mềm mịn rong biển wakame thanh mát",
    "tag": "Truyền thống"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Bánh Cá Nướng Taiyaki Nhân Đậu Đỏ",
    "emoji": "🐟",
    "description": "Bánh nướng hình con cá vàng giòn nhân đậu đỏ ngọt bùi nóng hổi",
    "tag": "Ngọt ấm"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Thăn Bò Nướng Wagyu Donburi",
    "emoji": "🥩",
    "description": "Thăn bò Wagyu nướng tái mềm tan trên bát cơm dẻo rưới sốt bơ tỏi",
    "tag": "Đỉnh cao"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sashimi Sò Đỏ Hokkigai Giòn Ngọt",
    "emoji": "🐚",
    "description": "Sò đỏ Nhật Bản giòn sần sật vị ngọt thanh khiết của đại dương",
    "tag": "Cao cấp"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sushi Bò Khò Phô Mai Kéo Sợi",
    "emoji": "🍣",
    "description": "Miếng bò Mỹ phủ phô mai khò lửa cháy xém thơm nức rưới sốt teriyaki",
    "tag": "Béo thơm"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Mì Ramen Tương Miso Ngô Ngọt Bơ",
    "emoji": "🍜",
    "description": "Mì nước tương miso đậm đà thả viên bơ Pháp thơm ngậy ngô ngọt giòn",
    "tag": "Hokkaido"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Đùi Gà Xào Trứng Oyakodon",
    "emoji": "🍗",
    "description": "Thịt gà đùi xào hành tây om cùng trứng gà lòng đào sánh mượt chan cơm",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Rau Củ Tempura Chiên Giòn Tan",
    "emoji": "🥦",
    "description": "Bí đỏ cà tím đậu bắp nấm hương chiên tempura giòn xốp thanh nhẹ",
    "tag": "Ăn chay"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Salad Rong Biển Trứng Cua Sốt Mè",
    "emoji": "🥗",
    "description": "Rong biển xanh tươi giòn giòn trứng cua nổ bụp sốt mè rang béo ngậy",
    "tag": "Khai vị"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Đậu Nành Nhật Edamame Luộc Muối",
    "emoji": "🫛",
    "description": "Hạt đậu nành luộc rắc muối hạt mặn mòi ngọt bùi ăn nhâm nhi",
    "tag": "Bùi béo"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cá Thu Đao Sanma Nướng Muối",
    "emoji": "🐟",
    "description": "Cá thu đao nướng nguyên con da giòn thịt ngọt béo vắt chanh tươi",
    "tag": "Mùa thu"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sushi Ép Osaka Hako Sushi Cá Hồi",
    "emoji": "🍣",
    "description": "Cơm ép khuôn gỗ vuông vức phủ cá hồi bơ sáp đẹp như tác phẩm nghệ thuật",
    "tag": "Tinh tế"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Mì Ramen Cay Cay Tantanmen Thịt Băm",
    "emoji": "🍜",
    "description": "Nước dùng mè rang cay nồng thơm lừng thịt heo băm xào sa tế rau cải",
    "tag": "Cay béo"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cá Tuyết Nướng Sốt Tương Miso Gindara",
    "emoji": "🐟",
    "description": "Cá tuyết thịt trắng béo ngậy ngấm sốt saikyo miso nướng thơm lừng",
    "tag": "Quý tộc"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Thịt Heo Cuộn Phô Mai Chiên Xù",
    "emoji": "🥓",
    "description": "Thịt heo cuộn phô mai tẩm bột xù cắn giòn rụm phô mai tuôn chảy",
    "tag": "Gây nghiện"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sushi Trứng Ngọt Tamagoyaki Vàng Ruộm",
    "emoji": "🍣",
    "description": "Miếng trứng rán cuộn nhiều lớp ngọt mềm mọng nước đặt trên cơm giấm",
    "tag": "Dễ thương"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Lẩu Thanh Nhẹ Shabu Shabu Bò Mỹ",
    "emoji": "🍲",
    "description": "Nhúng lát bò mỏng vào nước dùng dashi rong biển thanh khiết chấm sốt ponzu",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Chiên Tỏi Thịt Bò Wagyu Chảo Teppan",
    "emoji": "🍛",
    "description": "Cơm rang tỏi thơm nức hạt tơi xốp mỡ bò Wagyu béo ngậy trên chảo gang",
    "tag": "Thơm lừng"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sashimi Bạch Tuộc Tako Luộc Giòn",
    "emoji": "🐙",
    "description": "Bạch tuộc luộc chín tới thái mỏng giòn sần sật chấm mù tạt gừng hồng",
    "tag": "Giòn dai"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Bánh Mochi Nhân Kem Lạnh Trà Xanh",
    "emoji": "🍡",
    "description": "Vỏ bánh nếp dẻo dai bọc viên kem matcha mát lạnh thơm đắng nhẹ",
    "tag": "Mát lạnh"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sushi Cá Trích Ép Trứng Kazu Noko",
    "emoji": "🍣",
    "description": "Cá trích ngâm giấm ép liền lớp trứng cá vàng ruộm nhai giòn tí tách",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Đậu Hũ Chiên Giòn Sốt Nước Dashi Agedashi",
    "emoji": "🧈",
    "description": "Đậu hũ non tẩm bột chiên vàng ngập trong nước dùng dashi củ cải mài",
    "tag": "Thanh nhã"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Cá Hồi Trộn Trứng Muối Salmon Don",
    "emoji": "🐟",
    "description": "Bát cơm ngập tràn cá hồi tươi thái lát trứng cá hồi ikura óng ánh",
    "tag": "Rực rỡ"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Mì Udon Lạnh Sốt Mè Rang Gà Xé",
    "emoji": "🍜",
    "description": "Sợi udon dai mát sốt mè rang béo bùi thịt gà xé dưa chuột thanh mát",
    "tag": "Mùa hè"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Gà Chiên Kiểu Nhật Karaage Giòn Tan",
    "emoji": "🍗",
    "description": "Thịt đùi gà ướp gừng tỏi xì dầu tẩm bột chiên giòn rụm vắt chanh",
    "tag": "Khoái khẩu"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Bò Nướng Phô Mai Doria Đút Lò",
    "emoji": "🥩",
    "description": "Cơm phủ sốt thịt bò băm phô mai mozzarella đút lò nướng vàng xém",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sashimi Mực Mực Tươi Mềm Ngọt",
    "emoji": "🦑",
    "description": "Mực tươi thái sợi mảnh trắng trong như ngọc ngọt lịm chấm wasabi",
    "tag": "Ngọt mát"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Bánh Xèo Kiểu Hiroshima Mì Yakisoba",
    "emoji": "🥞",
    "description": "Bánh xèo nướng xếp tầng cùng mì xào bắp cải thịt heo và trứng ốp",
    "tag": "Hiroshima"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Súp Đầu Cá Hồi Nấu Canh Tương Miso",
    "emoji": "🐟",
    "description": "Đầu cá hồi béo ngậy nấu củ cải cà rốt nước tương miso ngọt đậm đà",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Cơm Nắm Onigiri Bọc Rong Biển Cá Hồi",
    "emoji": "🍙",
    "description": "Cơm nắm tam giác nhân ruốc cá hồi nướng bọc lá rong biển giòn tan",
    "tag": "Gọn gàng"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Sushi Lươn Nhật Nướng Unagi Nigiri",
    "emoji": "🍣",
    "description": "Miếng lươn nướng sốt nâu ngọt béo mềm rục quấn dải rong biển xinh xắn",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Nhật Bản Japanese",
    "name": "Bánh Kem Bông Lan Cuộn Trà Xanh Matcha",
    "emoji": "🍰",
    "description": "Bánh cuộn matcha thơm nồng đắng dịu cuộn kem tươi mịn màng",
    "tag": "Ngọt ngào"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Vịt Quay Bắc Kinh Da Giòn Cuốn Bánh Tráng",
    "emoji": "🦆",
    "description": "Da vịt giòn rụm bóng bẩy cuốn bánh tráng mỏng đầu hành dưa leo sốt ngọt",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Sủi Cảo Tứ Xuyên Sốt Cay Dầu Ớt",
    "emoji": "🥟",
    "description": "Viên sủi cảo tôm thịt mọng nước tắm trong dầu ớt giấm đen cay tê đầu lưỡi",
    "tag": "Tứ Xuyên"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Xíu Mại Tôm Thịt Trứng Cua Xửng Tre",
    "emoji": "🥟",
    "description": "Xíu mại nhân tôm thịt chắc nịch phủ trứng cua đỏ tươi hấp nóng hổi",
    "tag": "Dimsum"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Bao Kim Sa Trứng Muối Tan Chảy",
    "emoji": "🥟",
    "description": "Bánh bao mềm xốp bẻ đôi nhân trứng muối kim sa vàng óng tuôn trào",
    "tag": "Mê ly"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Mì Kéo Lan Châu Thịt Bò Hầm",
    "emoji": "🍜",
    "description": "Sợi mì kéo tay tươi dai nước dùng trong veo thơm mùi hoa hồi bắp bò mềm",
    "tag": "Lan Châu"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Đậu Hũ Ma Bà Tứ Xuyên Sốt Thịt Băm",
    "emoji": "🌶️",
    "description": "Đậu hũ non mềm mịn ngập sốt tương cay ớt bột tiêu hoa tiêu tê tê",
    "tag": "Cay tê"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Gà Cung Bảo Xào Đậu Phộng Kung Pao",
    "emoji": "🍗",
    "description": "Thịt gà ức thái hạt lựu ớt khô hạt điều đậu phộng sốt chua ngọt cay",
    "tag": "Kung Pao"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Sườn Heo Kinh Đô Chiên Sốt Chua Ngọt",
    "emoji": "🍖",
    "description": "Sườn non chiên vàng giòn sốt chua ngọt đỏ au bóng bẩy chuẩn vị Bắc Kinh",
    "tag": "Bắc Kinh"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Heo Quay Da Giòn Rụm Chấm Mù Tạt Đường",
    "emoji": "🥓",
    "description": "Miếng thịt heo quay ba rọi da nổ giòn tan cắn ngập miệng chấm tương ngọt",
    "tag": "Quảng Đông"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Chân Gà Hấp Tàu Xì Thơm Cay",
    "emoji": "🍗",
    "description": "Chân gà mềm rục róc xương ngấm đẫm sốt tàu xì tương đen thơm nồng",
    "tag": "Dimsum"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Xếp Hẹ Chiên Giòn Đáy",
    "emoji": "🥟",
    "description": "Vỏ bánh mỏng nhân hẹ xanh tôm thịt áp chảo giòn tan chấm tương dấm",
    "tag": "Thơm ngát"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Mì Xá Xíu Hoành Thánh Tôm Nước Trong",
    "emoji": "🍜",
    "description": "Sợi mì trứng vàng dai thịt xá xíu đỏ mọng viên hoành thánh tôm béo ngậy",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Bao Xá Xíu Hấp Vỏ Nứt",
    "emoji": "🥟",
    "description": "Bánh bao nứt vỏ bông xốp nhân thịt xá xíu đậm đà thơm mùi dầu hào",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Cơm Chiên Dương Châu Chuẩn Vị",
    "emoji": "🍛",
    "description": "Cơm hạt vàng tơi lạp xưởng tôm khô đậu Hà Lan trứng chiên thơm nức",
    "tag": "Dương Châu"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Cuốn Tôm Tươi Hấp Xì Dầu Chang Fen",
    "emoji": "🥢",
    "description": "Bánh cuốn bột gạo mỏng mịn bọc tôm tươi rưới xì dầu ngọt thơm lừng",
    "tag": "Quảng Đông"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Thịt Heo Đông Pha Kho Mềm Rục",
    "emoji": "🥓",
    "description": "Thịt ba chỉ vuông to kho nước tương rượu hoa tiêu mềm rục tan trong miệng",
    "tag": "Đông Pha"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Cá Chép Sốt Chua Ngọt Hình Hoa Cúc",
    "emoji": "🐟",
    "description": "Cá chép khía hoa chiên giòn bung xòe rưới sốt cà chua dấm đường đỏ rực",
    "tag": "Nghệ thuật"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bò Xào Tiêu Đen Chảo Gang Xèo Xèo",
    "emoji": "🥩",
    "description": "Thịt bò thăn mềm mọng xào hành tây ớt chuông sốt tiêu đen sôi sùng sục",
    "tag": "Nóng hổi"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Súp Vi Cá Bào Ngư Hải Sản",
    "emoji": "🥣",
    "description": "Bát súp hoàng gia sánh vàng ngọt lịm từ bào ngư nấm đông cô và thịt cua",
    "tag": "Đại bổ"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Trứng Nướng Bồ Đào Nha Dan Tat",
    "emoji": "🥧",
    "description": "Vỏ ngàn lớp giòn rụm nhân kem trứng nướng cháy xém béo ngậy thơm lừng",
    "tag": "Macau"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Mì Xào Giòn Quảng Đông Thập Cẩm",
    "emoji": "🍜",
    "description": "Mì chiên vàng rụm phồng rộp rưới ngập nước sốt tôm mực xá xíu cải thìa",
    "tag": "Quảng Đông"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Canh Gà Tiềm Thuốc Bắc Nấm Đông Cô",
    "emoji": "🍗",
    "description": "Thịt gà ác hầm kỷ tử táo đỏ hoài sơn nước dùng ngọt đậm đà bổ dưỡng",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Tôm Sú Rang Hoàng Bào Trứng Muối",
    "emoji": "🦐",
    "description": "Tôm sú chiên giòn áo lớp bột trứng muối vàng ruộm thơm bùi béo ngậy",
    "tag": "Béo bùi"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Mực Xào Sa Tế Kiểu Tiều Châu",
    "emoji": "🦑",
    "description": "Mực tươi giòn sần sật xào sa tế tỏi ớt húng quế chuẩn vị người Tiều",
    "tag": "Tiều Châu"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Củ Cải Chiên Giòn Chấm Tương",
    "emoji": "🥟",
    "description": "Bánh bột củ cải tôm khô lạp xưởng chiên xém hai mặt thơm bùi",
    "tag": "Dimsum"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Bao Chiên Thượng Hải Đáy Giòn Shengjian",
    "emoji": "🥟",
    "description": "Bánh bao nhân thịt băm áp chảo đáy giòn rụm cắn ngập nước súp ngọt",
    "tag": "Thượng Hải"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Cơm Thố Sườn Non Nấu Tàu Xì",
    "emoji": "🍚",
    "description": "Sườn non ướp tàu xì thơm nức hấp trên cơm thố nóng hổi hạt cơm ngấm sốt",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Lẩu Xuyên Tiêu Trùng Khánh Cay Tê",
    "emoji": "🌶️",
    "description": "Nồi lẩu hai ngăn cay xè ớt khô hoa tiêu Trùng Khánh nhúng bò tơ lòng giòn",
    "tag": "Trùng Khánh"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bò Kho Ngũ Vị Hương Cải Trắng",
    "emoji": "🥩",
    "description": "Nạm bò gân bò hầm mềm rục củ cải trắng thơm lừng hồi quế thảo quả",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Cải Thìa Xào Nấm Hương Dầu Hào",
    "emoji": "🥬",
    "description": "Cải thìa xanh mướt giòn ngọt xào nấm đông cô bóng bẩy sốt dầu hào",
    "tag": "Thanh đạm"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Trứng Bách Thảo Đậu Phụ Non Xì Dầu",
    "emoji": "🥚",
    "description": "Trứng bắc thảo bùi bùi đậu phụ non trắng mịn rưới xì dầu tỏi ớt",
    "tag": "Khai vị"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Mì Kẹp Thịt Bò Băm Roujiamo",
    "emoji": "🍔",
    "description": "Burger phong cách Tây An vỏ bánh nướng giòn kẹp thịt heo băm hầm mềm",
    "tag": "Tây An"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Chè Trôi Nước Mè Đen Đường Phèn Gừng",
    "emoji": "🥣",
    "description": "Viên bánh nếp mềm dẻo nhân mè đen béo ngậy chan nước đường gừng ấm nóng",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Cá Điêu Hồng Hấp Tàu Xì Xì Dầu",
    "emoji": "🐟",
    "description": "Cá hấp xì dầu gừng sợi hành hoa thì là thơm nức mùi tàu xì hạt tiêu",
    "tag": "Gia đình"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Gà Hấp Muối Quảng Đông Da Vàng",
    "emoji": "🍗",
    "description": "Gà thả vườn hấp muối biển da giòn vàng ươm thịt ngọt đậm đà",
    "tag": "Quảng Đông"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Miến Xào Cua Bể Nồi Đất Sốt Xì Dầu",
    "emoji": "🦀",
    "description": "Thịt cua bể tươi rói xào miến tơi xốp trong nồi đất giữ nhiệt thơm nức",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Tart Tôm Nướng Phô Mai",
    "emoji": "🥧",
    "description": "Vỏ bánh tart giòn rụm nhân tôm tươi nướng phô mai béo ngậy thơm lừng",
    "tag": "Mới lạ"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Đậu Cô Ve Xào Thịt Băm Tứ Xuyên",
    "emoji": "🥬",
    "description": "Đậu que xào cháy cạnh thịt băm cải muối mặn mòi hạt tiêu thơm nồng",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Cháo Trắng Hột Vịt Muối Thịt Băm",
    "emoji": "🥣",
    "description": "Bát cháo hoa trắng sánh mịn ăn kèm hột vịt muối béo mặn thịt xào đậm đà",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Xếp Triều Châu Nhân Củ Cải Tôm",
    "emoji": "🥟",
    "description": "Vỏ bánh trong suốt thấy rõ nhân củ cải tôm thịt hấp chín chấm tương giấm",
    "tag": "Triều Châu"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Gà Xé Phay Tứ Xuyên Trộn Dầu Ớt",
    "emoji": "🍗",
    "description": "Thịt gà luộc xé sợi tắm trong dầu ớt cay nồng đậu phộng mè rang hành boa-rô",
    "tag": "Cay tê"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Sườn Heo Nướng Sốt Mận Bắc Kinh",
    "emoji": "🍖",
    "description": "Dẻ sườn heo nướng sốt mận chua ngọt thơm lừng bóng bẩy rắc mè",
    "tag": "Chua ngọt"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Bao Thượng Hải Tiểu Long Bao Xiaolongbao",
    "emoji": "🥟",
    "description": "Vỏ mỏng trong veo bọc nhân tôm thịt ngập nước súp ngọt lịm húp thìa",
    "tag": "Thượng Hải"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Cá Chẽm Chiên Giòn Sốt Xì Dầu Tỏi Ớt",
    "emoji": "🐟",
    "description": "Phi lê cá chẽm rán giòn tan rưới xì dầu tỏi ớt thơm ngào ngạt",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Khoai Môn Chiên Xù Tổ Chim",
    "emoji": "🍠",
    "description": "Vỏ khoai môn chiên phồng xốp xơ xác nhân thịt xá xíu đậm đà",
    "tag": "Dimsum"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Chân Vịt Rút Xương Xào Tương Cay",
    "emoji": "🦆",
    "description": "Chân vịt giòn sần sật xào tương cay hành tây ớt chuông đưa miệng",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Canh Sườn Hầm Củ Sen Táo Đỏ",
    "emoji": "🍖",
    "description": "Sườn non ninh mềm củ sen bùi béo táo đỏ ngọt nước thanh nhiệt cơ thể",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Mì Xào Phúc Kiến Hải Sản Đậm Vị",
    "emoji": "🍜",
    "description": "Sợi mì to xào tôm mực thịt heo nước sốt sánh đậm màu nâu cánh gián",
    "tag": "Phúc Kiến"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Bánh Tráng Cuốn Bò Nướng Ngũ Vị",
    "emoji": "🥩",
    "description": "Thịt bò nướng ngũ vị thơm nức cuốn bánh tráng rau sống sốt tương ngọt",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Trung Hoa & Dimsum",
    "name": "Quy Linh Cao Mật Ong Tráng Miệng",
    "emoji": "🍮",
    "description": "Thạch thảo mộc đen tuyền mát lạnh đắng dịu chan mật ong ngọt ngào",
    "tag": "Thanh nhiệt"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bò Bít Tết Beefsteak Sốt Tiêu Đen",
    "emoji": "🥩",
    "description": "Thịt bò thăn mềm mọng chín vừa sốt tiêu đen cay nồng khoai nghiền",
    "tag": "Lãng mạn"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bò Bít Tết Sốt Nấm Kem Béo Truffle",
    "emoji": "🥩",
    "description": "Bò nướng than mềm tan sốt kem nấm hương thơm ngát dầu nấm truffle",
    "tag": "Quý tộc"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Ý Bò Băm Sốt Cà Chua Spaghetti Bolognese",
    "emoji": "🍝",
    "description": "Sợi mì dai ngon ngập sốt cà chua thịt bò băm phô mai Parmesan bột",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Ý Sốt Kem Trứng Thịt Xông Khói Carbonara",
    "emoji": "🍝",
    "description": "Sợi spaghetti đẫm sốt kem lòng đỏ trứng thịt ba chỉ hun khói giòn rụm",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Pizza Margherita Phô Mai Mozzarella Nướng Củi",
    "emoji": "🍕",
    "description": "Đế bánh nướng củi thơm xém sốt cà chua phô mai mozzarella lá húng tây",
    "tag": "Chuẩn Ý"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Pizza Hải Sản Sốt Pesto Lá Húng Tây",
    "emoji": "🍕",
    "description": "Tôm mực tươi rói phủ phô mai và sốt thảo mộc pesto xanh mướt thơm lừng",
    "tag": "Hải sản"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Pizza Bò Băm Ớt Chuông Hành Tây BBQ",
    "emoji": "🍕",
    "description": "Thịt bò băm đậm đà sốt BBQ ngọt khói ớt chuông giòn ngọt phô mai dẻo",
    "tag": "Mê ly"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Sườn Heo Nướng Sốt BBQ Khói Kiểu Mỹ",
    "emoji": "🍖",
    "description": "Dẻ sườn nướng chậm róc xương đẫm sốt BBQ chua ngọt thơm mùi khói gỗ",
    "tag": "Kiểu Mỹ"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Cá Hồi Na Uy Áp Chảo Sốt Bơ Chanh",
    "emoji": "🐟",
    "description": "Miếng cá hồi da giòn rụm thịt hồng cam mọng nước sốt bơ chanh vàng thơm",
    "tag": "Thanh lịch"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Salad Caesar Gà Nướng Bánh Mì Giòn",
    "emoji": "🥗",
    "description": "Xà lách Romaine giòn ngọt ức gà nướng sốt Caesar phô mai Parmesan bào",
    "tag": "Healthy"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Súp Bí Đỏ Kem Tươi Bánh Mì Bơ Tỏi",
    "emoji": "🥣",
    "description": "Súp bí đỏ vàng óng mịn màng béo ngậy kem tươi ăn cùng bánh mì bơ tỏi",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Súp Nấm Truffle Kem Sữa Béo Ngậy",
    "emoji": "🍄",
    "description": "Nấm mỡ nấm hương thơm lừng ninh nhuyễn hòa kem sữa dầu nấm thượng hạng",
    "tag": "Cao cấp"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Đùi Vịt Hầm Kiểu Pháp Confit De Canard",
    "emoji": "🦆",
    "description": "Đùi vịt ninh trong mỡ vịt da giòn rụm thịt mềm tan ăn kèm khoai tây",
    "tag": "Chuẩn Pháp"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Sườn Cừu Nướng Thảo Mộc Sốt Rượu Vang",
    "emoji": "🍖",
    "description": "Sườn cừu ướp lá hương thảo nướng chín tới sốt vang đỏ đậm đà quý phái",
    "tag": "Sang chảnh"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Vẹm Xanh Hấp Rượu Vang Trắng Bơ Tỏi",
    "emoji": "🦪",
    "description": "Vẹm xanh New Zealand béo ngọt ngập trong sốt vang trắng bơ tỏi bánh mì",
    "tag": "Biển cả"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Ý Hải Sản Tôm Mực Sốt Cà Cay Marinara",
    "emoji": "🍝",
    "description": "Tôm mực nghêu tươi sốt cà chua cay nhẹ tỏi ớt ngò tây thơm phức",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bò Wellington Bọc Bột Ngàn Lớp Nấm",
    "emoji": "🥩",
    "description": "Thăn bò bọc nấm xào pate gan ngỗng cuộn bánh ngàn lớp nướng vàng ruộm",
    "tag": "Đỉnh cao"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Burger Bò Nướng Phô Mai Cheddar Béo Ngậy",
    "emoji": "🍔",
    "description": "Thịt bò nướng than hoa phô mai cheddar tan chảy sốt đặc biệt khoai chiên",
    "tag": "No nê"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Gói Ý Lasagna Bò Đút Lò Ngập Phô Mai",
    "emoji": "🧀",
    "description": "Các lớp bánh mì phẳng xen kẽ sốt bò băm béo ngậy phô mai nướng vàng cháy",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bánh Mì Bơ Tỏi Nướng Giòn Rụm",
    "emoji": "🥖",
    "description": "Bánh mì baguette phết đẫm bơ tỏi ngò tây nướng giòn tan thơm nức mũi",
    "tag": "Khai vị"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Cơm Ý Risotto Nấm Hương Phô Mai Sánh Dẻo",
    "emoji": "🍚",
    "description": "Hạt gạo Ý ninh cùng nước dùng gà sốt nấm phô mai béo ngậy sánh mượt",
    "tag": "Chuẩn Ý"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Cá Chẽm Áp Chảo Sốt Bơ Caper Chua Thanh",
    "emoji": "🐟",
    "description": "Phi lê cá chẽm da giòn thịt ngọt sốt bơ hạt caper chua thanh măng tây",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Ý Sốt Mực Đen Độc Đáo Nero Di Seppia",
    "emoji": "🍝",
    "description": "Sợi mì đen tuyền từ túi mực tươi thơm vị biển tôm sú áp chảo",
    "tag": "Độc lạ"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Ức Vịt Áp Chảo Sốt Cam Chua Ngọt",
    "emoji": "🦆",
    "description": "Ức vịt hồng đào da giòn rưới nước sốt cam tươi chua ngọt thanh tao",
    "tag": "Pháp"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Salad Cá Ngừ Đại Dương Quả Bơ Sáp",
    "emoji": "🥗",
    "description": "Cá ngừ áp chảo tái bơ sáp béo ngậy cà chua bi sốt giấm balsamic",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Tôm Sú Nướng Phô Mai Bỏ Lò Bơ Tỏi",
    "emoji": "🦐",
    "description": "Tôm sú xẻ lưng phết bơ tỏi phủ ngập phô mai mozzarella đút lò",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Khoai Tây Nghiền Bơ Sữa Mịn Màng",
    "emoji": "🥔",
    "description": "Khoai tây nghiền mịn như nhung béo ngậy bơ lạt kem tươi rắc tiêu",
    "tag": "Mềm mịn"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Súp Hành Tây Kiểu Pháp Phô Mai Nướng",
    "emoji": "🥣",
    "description": "Hành tây xào caramel ngọt ngào bánh mì baguette phủ phô mai nướng chảy",
    "tag": "Ấm bụng"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Thịt Nguội Bát Đĩa Thập Cẩm Charcuterie Board",
    "emoji": "🧀",
    "description": "Đĩa thịt giăm bông Parma xúc xích Ý phô mai quả oliu bánh quy hạt",
    "tag": "Rượu vang"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Cá Hồi Nướng Giấy Bạc Măng Tây Sốt Chanh",
    "emoji": "🐟",
    "description": "Cá hồi nướng giữ trọn độ mọng nước ngọt thanh măng tây giòn",
    "tag": "Healthy"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Ý Sốt Pesto Hạt Óc Chó Gà Nướng",
    "emoji": "🍝",
    "description": "Sốt lá húng tây xanh mướt hạt óc chó bùi béo ức gà nướng thơm lừng",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Gà Nướng Thảo Mộc Hương Thảo Rosemary",
    "emoji": "🍗",
    "description": "Gà tơ nướng vàng ươm thơm nồng lá hương thảo tỏi nguyên tép khoai tây",
    "tag": "Thơm nồng"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Pizza 4 Loại Phô Mai Quattro Formaggi Mật Ong",
    "emoji": "🍕",
    "description": "Phô mai xanh Mozzarella Cheddar Parmesan nướng thơm rưới mật ong ngọt",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bò Lúc Lắc Kiểu Pháp Sốt Rượu Vang",
    "emoji": "🥩",
    "description": "Thịt bò cắt vuông mềm mọng áp chảo sốt rượu vang đỏ hành tây ớt chuông",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Cơm Risotto Hải Sản Tôm Mực Nghêu Saffron",
    "emoji": "🍚",
    "description": "Cơm Ý nhuộm màu vàng óng từ nhụy hoa nghệ tây ngập tràn tôm mực tươi",
    "tag": "Quý tộc"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Ý Ngao Trắng Sốt Rượu Vang Vongole",
    "emoji": "🍝",
    "description": "Ngao tươi ngọt lịm sốt rượu vang trắng tỏi phi ớt khô mùi tây thơm ngát",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bánh Tacos Bò Băm Phô Mai Mexico",
    "emoji": "🌮",
    "description": "Vỏ bánh ngô giòn rụm kẹp thịt bò băm phô mai sốt cà chua salsa chua cay",
    "tag": "Mexico"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bánh Burrito Gà Cay Cuộn Bơ Đậu Đen",
    "emoji": "🌯",
    "description": "Bánh bột mì cuộn cơm gà cay bơ sáp đậu đen sốt kem chua sour cream",
    "tag": "No nê"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bò Hầm Rượu Vang Đỏ Boeuf Bourguignon",
    "emoji": "🥩",
    "description": "Thịt bò thăn hầm chậm trong rượu vang đỏ cà rốt nấm mỡ mềm tan",
    "tag": "Pháp"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Sườn Heo Nướng Mật Ong Mù Tạt Vàng",
    "emoji": "🍖",
    "description": "Sườn non ướp mật ong mù tạt vàng Dijon nướng xém cạnh thơm phức",
    "tag": "Mới lạ"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Ý Sốt Kem Nấm Gà Nướng Fettuccine Alfredo",
    "emoji": "🍝",
    "description": "Sợi mì dẹt fettuccine đẫm sốt kem phô mai béo ngậy thịt gà nướng mềm",
    "tag": "Đầy đặn"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Phô Mai Viên Chiên Giòn Sốt Nam Việt Quất",
    "emoji": "🧀",
    "description": "Viên phô mai Camembert chiên giòn tan chấm sốt nam việt quất chua ngọt",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bánh Mì Nướng Bruschetta Cà Chua Húng Tây",
    "emoji": "🥖",
    "description": "Bánh mì giòn rụm phủ cà chua bi băm ngò tây tỏi rưới dầu oliu extra virgin",
    "tag": "Ý"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Hàu Đút Lò Phô Mai Bơ Tỏi Sốt Hollandaise",
    "emoji": "🦪",
    "description": "Hàu tươi ngập sốt kem trứng bơ hollandaise đút lò vàng ươm",
    "tag": "Thượng hạng"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Cá Tuyết Áp Chảo Sốt Kem Chanh Thì Là",
    "emoji": "🐟",
    "description": "Cá tuyết mềm ngọt da giòn sốt kem tươi thì là chanh vàng béo dịu",
    "tag": "Sang chảnh"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bánh Bột Ngô Nachos Phô Mai Thịt Bò Băm",
    "emoji": "🧀",
    "description": "Bánh nachos giòn rụm ngập sốt phô mai chảy thịt bò băm ớt jalapeño",
    "tag": "Ăn tiệc"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Súp Kem Tôm Hùm Sánh Mịn Lobster Bisque",
    "emoji": "🥣",
    "description": "Nước súp ninh từ vỏ tôm hùm thơm nồng kem béo rượu cognac ngọt lịm",
    "tag": "Xa xỉ"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Mì Gnocchi Khoai Tây Sốt Phô Mai Gorgonzola",
    "emoji": "🥔",
    "description": "Viên bánh gnocchi mềm dẻo ngập sốt phô mai xanh béo ngậy đậm đà",
    "tag": "Đặc sắc"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Thăn Lợn Cuộn Măng Tây Đút Lò Sốt Táo",
    "emoji": "🥓",
    "description": "Thăn heo cuộn măng tây nướng mềm mọng rưới sốt táo chua ngọt thơm lừng",
    "tag": "Thanh lịch"
  },
  {
    "category": "Món Âu & Đồ Tây",
    "name": "Bánh Chocolate Nóng Chảy Choco Lava Cake",
    "emoji": "🍫",
    "description": "Bánh socola mềm xốp xắn ra dòng socola đen ấm nóng tan chảy viên kem vani",
    "tag": "Ngọt ngào"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Bò 2 Tầng Phô Mai Tan Chảy",
    "emoji": "🍔",
    "description": "Hai miếng bò nướng than mọng nước phô mai cheddar kép dưa chuột muối",
    "tag": "No căng"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Gà Rán Giòn Cay Cánh Đùi Popeyes",
    "emoji": "🍗",
    "description": "Vỏ bột giòn rụm cay tê thịt gà mọng nước chấm tương cà tương ớt",
    "tag": "Khoái khẩu"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Khoai Tây Chiên Lắc Phô Mai Béo Ngậy",
    "emoji": "🍟",
    "description": "Khoai tây chiên vàng giòn rụm lắc đẫm bột phô mai cam thơm lừng",
    "tag": "Ăn vặt"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Pizza Phô Mai Xúc Xích Pepperoni",
    "emoji": "🍕",
    "description": "Đế bánh xốp giòn ngập tràn phô mai mozzarella và xúc xích cay tròn đỏ",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Gà Miếng Không Xương Chiên Giòn Nuggets",
    "emoji": "🍗",
    "description": "Thịt ức gà xay viên tẩm bột chiên giòn chấm sốt chua ngọt béo ngậy",
    "tag": "Tiện lợi"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Mì Ý Bò Băm Xúc Xích Jollibee",
    "emoji": "🍝",
    "description": "Mì Ý sốt cà chua ngọt ngào xúc xích đỏ phô mai bào hương vị tuổi thơ",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Mì Kẹp Xúc Xích Hotdog Phô Mai",
    "emoji": "🌭",
    "description": "Bánh mì dài kẹp xúc xích xông khói rưới sốt mù tạt vàng và tương cà",
    "tag": "Đường phố"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Gà Giòn Sốt Cay Mayonnaise",
    "emoji": "🍔",
    "description": "Miếng gà chiên giòn rụm kẹp xà lách tươi sốt mayo cay béo ngậy",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Khoai Tây Nghiền Sốt Gravy Bò",
    "emoji": "🥔",
    "description": "Khoai tây nghiền mịn màng chan ngập sốt nâu ninh xương bò thơm nồng",
    "tag": "Mềm mịn"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Cuộn Gà Giòn Twister Phô Mai",
    "emoji": "🌯",
    "description": "Bánh tortilla nướng cuộn gà rán giòn xà lách cà chua sốt tiêu mayo",
    "tag": "Gọn gàng"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Gà Rán Sốt Phô Mai Tuyết Vàng",
    "emoji": "🍗",
    "description": "Gà rán giòn tan phủ lớp bột phô mai tuyết mặn mặn ngọt béo ngào ngạt",
    "tag": "Hot trend"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Khoai Môn Lệ Phố Nhân Trứng Cút Chiên",
    "emoji": "🍠",
    "description": "Viên khoai môn dẻo ngọt bùi bọc trứng cút chiên giòn rụm",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Tôm Nướng Sốt Tartar Giòn Tan",
    "emoji": "🍔",
    "description": "Chả tôm tươi giòn sần sật kẹp xà lách bắp cải sốt tartar chua béo",
    "tag": "Hải sản"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Xúc Xích Phô Mai Bọc Bột Mì Chiên Corn Dog",
    "emoji": "🌭",
    "description": "Xúc xích phô mai mozzarella que dài bọc bột ngô chiên xù giòn tan",
    "tag": "Hàn Quốc"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Mực Vòng Tẩm Bột Chiên Calamari Rings",
    "emoji": "🦑",
    "description": "Khoanh mực tươi tẩm bột chiên xù vàng ươm chấm sốt tương ớt mayo",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Mì Thổ Nhĩ Kỳ Doner Kebab",
    "emoji": "🥙",
    "description": "Bánh mì tam giác kẹp thịt nướng quay xắt mỏng bắp cải tím sốt tỏi cay",
    "tag": "Kebab"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Phô Mai Que Chiên Xù Vàng Óng",
    "emoji": "🧀",
    "description": "Thanh phô mai kéo sợi dài tít tắp chấm tương ớt chua cay ngọt dịu",
    "tag": "Béo thơm"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Gà Bắp Rang Popcorn Gà Cay",
    "emoji": "🍗",
    "description": "Viên gà nhỏ giòn tan thơm lừng vị cay nhâm nhi xem phim tuyệt đỉnh",
    "tag": "Xem phim"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Pizza Gấp Calzone Nhân Thịt Bò",
    "emoji": "🥟",
    "description": "Bánh pizza gập đôi hình bán nguyệt bên trong ngập phô mai thịt bò băm",
    "tag": "Độc lạ"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Cá Phi Lê Chiên Giòn Sốt Chanh",
    "emoji": "🍔",
    "description": "Phi lê cá biển chiên giòn tan kẹp phô mai lát và sốt tartar chua dịu",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Khoai Tây Cắt Múi Cau Nướng Vỏ Wedges",
    "emoji": "🍟",
    "description": "Khoai tây để nguyên vỏ tẩm gia vị thảo mộc chiên giòn rụm ruột bở bùi",
    "tag": "Kiểu Mỹ"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Cánh Gà Chiên Nước Mắm Sốt Cay Cay",
    "emoji": "🍗",
    "description": "Cánh gà chiên giòn đẫm mắm đường tỏi ớt kẹo lại bóng bẩy giòn cay",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Bột Ngô Nachos Phô Mai Bò Băm",
    "emoji": "🧀",
    "description": "Bánh giòn rụm ngập sốt phô mai ấm nóng thịt bò xào đậu đen sốt salsa",
    "tag": "Mexico"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Xúc Xích Đức Nướng Thảo Mộc Than Hồng",
    "emoji": "🌭",
    "description": "Xúc xích vỏ giòn cắn ngập thịt mọng nước thơm nồng lá kinh giới",
    "tag": "Chuẩn Đức"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Kẹp Sandwich Thịt Nguội Trứng Mayo",
    "emoji": "🥪",
    "description": "Bánh sandwich mềm kẹp giăm bông phô mai lát trứng gà sốt bơ béo",
    "tag": "Ăn sáng"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Gà Rán Không Xương Sốt Bơ Tỏi Mật Ong",
    "emoji": "🍗",
    "description": "Gà chiên giòn không xương áo lớp sốt mật ong thơm nồng bơ tỏi",
    "tag": "Ngọt thơm"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Mì Kẹp Thịt Bò Nướng Phô Mai Sub",
    "emoji": "🥖",
    "description": "Ổ bánh mì dài kiểu Subway kẹp thịt bò nướng hành tây sốt tiêu đen",
    "tag": "No lâu"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Khoai Lang Chiên Cọng Lắc Xí Muội",
    "emoji": "🍠",
    "description": "Khoai lang ngọt thơm chiên giòn rụm xóc bột xí muội chua ngọt mê ly",
    "tag": "Ăn vặt"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Pizza Mini Xúc Xích Ngô Ngọt",
    "emoji": "🍕",
    "description": "Chiếc bánh pizza nhỏ xinh ngập phô mai xúc xích bắp hạt giòn ngọt",
    "tag": "Dễ thương"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Nấm Bò Nướng Sốt Kem Nấm",
    "emoji": "🍔",
    "description": "Thịt bò nướng mọng nước nấm mỡ xào bơ sốt kem nấm béo thơm nức",
    "tag": "Thơm béo"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Mì Nướng Muối Ớt Xúc Xích Phô Mai",
    "emoji": "🥖",
    "description": "Bánh mì giòn rụm sốt muối ớt mỡ hành chà bông xúc xích béo ngậy",
    "tag": "Đường phố"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Tacos Gà Giòn Sốt Guacamole Bơ",
    "emoji": "🌮",
    "description": "Vỏ bánh ngô giòn tan thịt gà chiên sốt bơ sáp tươi cà chua mát rượi",
    "tag": "Tươi mới"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Mì Kẹp Thịt Heo Quay Xá Xíu",
    "emoji": "🥖",
    "description": "Bánh mì nóng giòn kẹp thịt heo quay giòn bì chan nước sốt xá xíu đậm",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Gà Xiên Que Nướng Teriyaki Phô Mai",
    "emoji": "🍢",
    "description": "Xiên gà nướng mềm mọng rưới sốt tương ngọt Nhật và phô mai nướng",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Khoai Tây Bào Chiên Giòn Hash Brown",
    "emoji": "🥔",
    "description": "Bánh khoai tây bào sợi ép bánh chiên vàng rộm giòn tan ngoài mềm trong",
    "tag": "Bữa sáng"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Bò Nướng Trứng Ốp La Lòng Đào",
    "emoji": "🍔",
    "description": "Thịt bò nướng mềm kẹp trứng gà ốp la lòng đào cắn chảy béo ngậy",
    "tag": "Béo ngậy"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Cá Que Tẩm Bột Chiên Giòn Fish Sticks",
    "emoji": "🐟",
    "description": "Thanh cá biển phi lê tẩm bột chiên xù giòn tan chấm sốt mayonnaise",
    "tag": "Trẻ em"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Bột Chiên Xúc Xích Trứng Cút",
    "emoji": "🍳",
    "description": "Bột gạo chiên giòn xém xào xúc xích trứng cút đu đủ bào nước tương",
    "tag": "Sài Gòn"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Mì Xào Bò Hộp Xúc Xích Cay Nóng",
    "emoji": "🍜",
    "description": "Mì gói xào thịt bò xông khói xúc xích ớt sừng rau cải ngọt ăn khuya",
    "tag": "Ăn đêm"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Kẹp Waffle Gà Rán Giòn Rụm",
    "emoji": "🧇",
    "description": "Bánh waffle mềm xốp kẹp miếng gà rán giòn rưới siro phong ngọt ngào",
    "tag": "Mỹ"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Hành Tây Tẩm Bột Chiên Giòn Onion Rings",
    "emoji": "🧅",
    "description": "Vòng hành tây ngọt giòn tẩm bột chiên xù vàng ươm chấm tương cà",
    "tag": "Giòn rụm"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Thịt Bò Xé Kéo Pulled Pork BBQ",
    "emoji": "🍔",
    "description": "Thịt heo xé sợi hầm mềm đẫm sốt BBQ kẹp bắp cải tím muối chua",
    "tag": "Kiểu Mỹ"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Khoai Tây Nghiền Chiên Xù Phô Mai Viên",
    "emoji": "🥔",
    "description": "Khoai tây nghiền viên tròn bọc phô mai chiên xù giòn tan kéo sợi",
    "tag": "Tan chảy"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Xúc Xích Cuộn Phồng Bơ Tỏi Puffs",
    "emoji": "🥐",
    "description": "Vỏ ngàn lớp giòn tan cuộn xúc xích xông khói nướng thơm bơ tỏi",
    "tag": "Thơm lừng"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Tôm Viên Bọc Phô Mai Chiên Giòn",
    "emoji": "🦐",
    "description": "Tôm tươi giã quết dai giòn nhân phô mai béo ngậy chiên vàng ruộm",
    "tag": "Mê ly"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Burger Gà Sốt Nấm Phô Mai Thụy Sĩ",
    "emoji": "🍔",
    "description": "Ức gà nướng mềm phô mai Thụy Sĩ béo nấm mỡ xào bơ tỏi thơm ngát",
    "tag": "Châu Âu"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Gà Viên Sốt Chua Ngọt Đậu Phộng",
    "emoji": "🍗",
    "description": "Gà viên tẩm bột chiên giòn đảo đều trong chảo sốt chua ngọt bóng bẩy",
    "tag": "Bắt vị"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Mì Kẹp Thịt Bò Nướng Bơ Tỏi Pate",
    "emoji": "🥖",
    "description": "Bánh mì baguette giòn rụm pate béo ngậy thịt bò xào bơ tỏi thơm phức",
    "tag": "Kinh điển"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Xúc Xích Phô Mai Lắc Bột Phô Mai Cay",
    "emoji": "🌭",
    "description": "Xúc xích chiên giòn nứt vỏ lắc đẫm bột phô mai cay thơm nức mũi",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Fast Food & Đồ Tiện Lợi",
    "name": "Bánh Bông Lan Trứng Muối Chà Bông Sốt Bơ",
    "emoji": "🧁",
    "description": "Bánh bông lan mềm ẩm ngập sốt bơ dầu trứng phô mai trứng muối bùi béo",
    "tag": "Gây nghiện"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Đậu Mắm Tôm Thập Cẩm Phố Cổ",
    "emoji": "🥢",
    "description": "Mẹt bún lá đậu rán giòn chả cốm nem rán dồi sụn mắm tôm đánh bông bọt",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Xèo Miền Tây Khổng Lồ Giòn Rụm",
    "emoji": "🥞",
    "description": "Bánh xèo vàng giòn nhân tôm tép thịt ba chỉ đậu xanh cuốn đọt rau rừng",
    "tag": "Nam Bộ"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Mì Kẹp Thịt Nướng Hội An Đậm Vị",
    "emoji": "🥖",
    "description": "Bánh mì vỏ giòn ruột đặc thịt nướng thơm lừng nước sốt gia truyền pate",
    "tag": "Hội An"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bê Thui Cầu Mống Chấm Mắm Nêm",
    "emoji": "🥩",
    "description": "Thịt bê thui tái hồng bì trong giòn cuốn bánh tráng rau rừng chấm mắm nêm",
    "tag": "Quảng Nam"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Cá Cay Hải Phòng Đầy Đủ Lòng Cá",
    "emoji": "🐟",
    "description": "Cá rô đồng chiên giòn chả cá thu lòng cá dồi sụn nước dùng cay nồng",
    "tag": "Đất Cảng"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Canh Cua Ghẹ Trảng Bàng",
    "emoji": "🦀",
    "description": "Sợi bánh canh bột lọc dai dẻo nước dùng sánh đậm thịt cua ghẹ ngọt lịm",
    "tag": "Tây Ninh"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Cơm Lam Gà Nướng Mắc Khén Sapa",
    "emoji": "🍗",
    "description": "Cơm dẻo thơm nướng ống nứa gà đồi nướng than hoa thơm nồng hạt dổi",
    "tag": "Tây Bắc"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Nem Nướng Nha Trang Bánh Tráng Cuốn Ram",
    "emoji": "🥢",
    "description": "Nem thịt heo thơm ngọt ram chiên giòn rụm nước sốt tương đậu phộng",
    "tag": "Nha Trang"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Chả Nướng Than Hoa Bát Nước Chấm",
    "emoji": "🥓",
    "description": "Chả băm chả miếng nướng than hoa đượm khói ngập bát nước mắm đu đủ",
    "tag": "Thủ đô"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Bèo Chén Xứ Huế Tôm Chấy Mỡ Hành",
    "emoji": "🥣",
    "description": "Mâm bánh bèo chén tôm chấy da heo chiên giòn chan nước mắm ngọt cay",
    "tag": "Cố đô"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Lẩu Gà Lá É Phú Yên Cay Nồng Ấm Áp",
    "emoji": "🍗",
    "description": "Thịt gà đồi dai ngọt nước dùng the the cay nhẹ thơm ngát lá é xanh",
    "tag": "Phú Yên"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Mắm Sóc Trăng Đậm Đà Cá Linh",
    "emoji": "🍲",
    "description": "Mắm cá linh nấu nước lèo thơm lừng ngập tôm mực cá lóc heo quay",
    "tag": "Sóc Trăng"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Cơm Hến Huế Nước Lèo Ruốc Thơm",
    "emoji": "🍚",
    "description": "Cơm nguội trộn hến xào cay rau chuối môn bạc hà tóp mỡ mắm ruốc",
    "tag": "Xứ Huế"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Bột Lọc Gói Lá Chuối Tôm Thịt",
    "emoji": "🥟",
    "description": "Bột lọc trong veo dai dẻo bọc con tôm đỏ miếng thịt mỡ mặn mòi",
    "tag": "Miền Trung"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Chả Cá Lã Vọng Hà Nội Thì Là Mắm Tôm",
    "emoji": "🐟",
    "description": "Cá lăng ướp riềng nghệ xào chảo gang xèo xèo thì là hành hoa bún tươi",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Cuốn Nóng Phủ Hành Phi Trứng Lòng Đào",
    "emoji": "🥢",
    "description": "Bánh tráng mỏng mềm mướt nhân thịt mộc nhĩ trứng gà lòng đào mắm chanh",
    "tag": "Thanh Trì"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Mì Quảng Ếch Đồng Nấu Nghệ Bánh Tráng",
    "emoji": "🐸",
    "description": "Thịt ếch đồng vàng ruộm nghệ tươi sả ớt chan xăm xắp mì bẻ bánh tráng",
    "tag": "Quảng Nam"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Căn Trứng Cút Mỡ Hành Phan Thiết",
    "emoji": "🥞",
    "description": "Bánh căn nướng khuôn đất giòn đáy chấm mắm nêm xíu mại xoài xanh",
    "tag": "Phan Thiết"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Cá Kho Làng Vũ Đại Niêu Đất Cổ Truyền",
    "emoji": "🐟",
    "description": "Cá trắm đen kho niêu đất 16 tiếng củi nhãn xương nhừ thịt chắc đậm đà",
    "tag": "Hà Nam"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Bò Giò Heo Cố Đô Huế Cay Xè",
    "emoji": "🍜",
    "description": "Bát bún sợi to giò heo móng mềm nước dùng đỏ au thơm nồng sả mắm ruốc",
    "tag": "Huế"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Hỏi Lòng Heo Phú Yên Bánh Tráng",
    "emoji": "🥣",
    "description": "Bánh hỏi sợi mảnh thoa mỡ hành đĩa lòng heo luộc giòn chấm mắm ớt",
    "tag": "Phú Yên"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Cá Ngừ Đại Dương Bình Định",
    "emoji": "🐟",
    "description": "Cá ngừ đại dương kho cà chua thơm ngọt nước lèo thanh mát ớt xanh",
    "tag": "Quy Nhơn"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Tằm Cà Ri Gà Bạc Liêu Béo Bùi",
    "emoji": "🍜",
    "description": "Sợi bánh tằm mềm dai thịt gà hầm nước cốt dừa bột cà ri cay béo",
    "tag": "Bạc Liêu"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Cơm Tấm Sườn Bì Chả Sài Gòn Mỡ Hành",
    "emoji": "🍛",
    "description": "Sườn nướng mật ong thơm phức bì dai chả trứng béo ngậy đồ chua",
    "tag": "Sài Gòn"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Khọt Cô Ba Vũng Tàu Tôm Tươi",
    "emoji": "🥞",
    "description": "Bánh khọt giòn rụm con tôm đỏ au rắc tôm cháy cuốn cải xanh mắm ớt",
    "tag": "Vũng Tàu"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Gỏi Cá Trích Kiên Giang Cuốn Bánh Tráng",
    "emoji": "🐟",
    "description": "Cá trích tái chanh cơm dừa nạo rau rừng cuốn bánh tráng chấm mắm tỏi",
    "tag": "Kiên Giang"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Quậy Phú Quốc Tôm Cá Tươi Rói",
    "emoji": "🍜",
    "description": "Chả tôm chả cá quết tươi vào tô nước dùng sôi sùng sục tự pha nước chấm",
    "tag": "Phú Quốc"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Cá Lóc Nướng Trui Rơm Đồng Tháp Mười",
    "emoji": "🐟",
    "description": "Cá lóc đồng nướng rơm nguyên con thơm mùi khói cuốn rau chuối chát",
    "tag": "Đồng Tháp"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Lẩu Mắm Miền Tây Rau Nhút Bông Súng",
    "emoji": "🍲",
    "description": "Nồi lẩu mắm thơm nồng nghi ngút ăn cùng mười mấy loại rau dại đồng nội",
    "tag": "Đồng bằng"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Cóng Sóc Trăng Đậu Xanh Tôm Tươi",
    "emoji": "🥟",
    "description": "Bánh cóng chiên giòn xốp nhân đậu xanh thịt băm con tôm đất đỏ au",
    "tag": "Sóc Trăng"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Suông Trà Vinh Nước Dùng Tôm Đậm",
    "emoji": "🍜",
    "description": "Viên chả tôm uốn cong hình con đuông mềm ngọt nước lèo me tương hột",
    "tag": "Trà Vinh"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Nem Chua Thanh Hóa Cuốn Lá Đinh Lăng",
    "emoji": "🥓",
    "description": "Nem chua lên men tự nhiên giòn dai chua cay tỏi ớt lá đinh lăng thơm",
    "tag": "Thanh Hóa"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Đa Cua Hải Phòng Bề Bề Chả Lá Lốt",
    "emoji": "🍜",
    "description": "Sợi bánh đa đỏ dai mềm riêu cua đồng chả lá lốt bề bề ngọt thanh",
    "tag": "Hải Phòng"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Chả Rươi Tứ Kỳ Hải Dương Chiên Vàng",
    "emoji": "🥢",
    "description": "Rươi tươi đánh trứng thịt băm vỏ quýt thơm nức mũi chiên vàng giòn",
    "tag": "Hải Dương"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Thịt Dê Tái Chanh Ninh Bình Cơm Cháy",
    "emoji": "🐐",
    "description": "Thịt dê núi ngọt mềm bóp chanh gừng ăn kèm cơm cháy giòn rụm chấm tương",
    "tag": "Ninh Bình"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Gà Đồi Tiên Yên Nướng Mật Ong Da Vàng",
    "emoji": "🍗",
    "description": "Gà Tiên Yên da vàng mọng thịt ngọt giòn nướng than chấm muối ớt chanh",
    "tag": "Quảng Ninh"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Mọc Cầu Bà Dậu Dọc Mùng Hà Nội",
    "emoji": "🥣",
    "description": "Mọc giòn thơm nấm hương mộc nhĩ nước ninh xương ống ngọt thanh mát",
    "tag": "Phố cổ"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Cuốn Tráng Hơi Cao Bằng Chan Nước Xương",
    "emoji": "🥢",
    "description": "Bánh cuốn mềm mịn ăn kèm bát nước hầm xương giò heo thơm mùi măng ớt",
    "tag": "Cao Bằng"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Thắng Cố Ngựa Bắc Hà Nấu Thảo Quả",
    "emoji": "🍲",
    "description": "Thịt và lòng ngựa ninh nhừ gia vị thảo mộc hạt dổi ớt cay vùng cao",
    "tag": "Lào Cai"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Phở Chua Lạng Sơn Vịt Quay Da Giòn",
    "emoji": "🍜",
    "description": "Phở trộn nước sốt chua ngọt vịt quay Bắc Kinh khoai tây chiên giòn",
    "tag": "Lạng Sơn"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Khâu Nhục Tiên Yên Lợn Bản Hấp Nhừ",
    "emoji": "🥓",
    "description": "Thịt ba chỉ hấp mềm nhừ khoai môn nấm mèo ngấm đẫm gia vị tàu xì",
    "tag": "Quảng Ninh"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Pía Sóc Trăng Sầu Riêng Trứng Muối",
    "emoji": "🥮",
    "description": "Vỏ ngàn lớp mỏng tang nhân sầu riêng tươi đậu xanh trứng muối béo ngậy",
    "tag": "Sóc Trăng"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Bò Thốt Nốt Nướng An Giang",
    "emoji": "🥞",
    "description": "Bánh bò xốp mềm thơm ngào ngạt đường thốt nốt nước cốt dừa nướng vàng",
    "tag": "An Giang"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Đúc Nóng Thịt Băm Mộc Nhĩ Hành Phi",
    "emoji": "🥣",
    "description": "Bột gạo mềm mịn nóng hổi ngập thịt băm xào mộc nhĩ nước mắm chan thơm",
    "tag": "Mùa đông"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Hủ Tiếu Sa Đéc Tô Khô Sốt Tương",
    "emoji": "🍜",
    "description": "Sợi hủ tiếu bột tươi dai ngọt trộn sốt tương đen tôm thịt xá xíu giò",
    "tag": "Đồng Tháp"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Chè Bưởi Cốt Dừa An Giang",
    "emoji": "🥥",
    "description": "Cùi bưởi giòn sần sật không chút đắng đỗ xanh bùi béo nước cốt dừa thơm",
    "tag": "An Giang"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Cơm Lam Muối Mè Bản Đôn Tây Nguyên",
    "emoji": "🍚",
    "description": "Gạo nếp nương thơm dẻo nướng ống nứa thơm ngát chấm muối mè rừng",
    "tag": "Tây Nguyên"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Cá Tai Tượng Chiên Xù Cuốn Bánh Tráng Tiền Giang",
    "emoji": "🐟",
    "description": "Cá tai tượng vảy xù giòn tan chấm mắm me đậu phộng cuốn bánh tráng",
    "tag": "Tiền Giang"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bún Thang Hà Nội Tinh Hoa Kinh Kỳ",
    "emoji": "🍜",
    "description": "Bát bún thanh tao gà xé trứng tráng chỉ giò lụa củ cải dầm tôm khô",
    "tag": "Hà Nội"
  },
  {
    "category": "Món Đặc Sản Vùng Miền",
    "name": "Bánh Bèo Bì Bình Dương Nước Mắm Tỏi Ớt",
    "emoji": "🥣",
    "description": "Bánh bèo mềm mướt phủ bì heo trộn thính thơm thịt ram mắm ớt chua cay",
    "tag": "Bình Dương"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Trân Châu Đường Đen Béo Ngậy",
    "emoji": "🧋",
    "description": "Trà sữa đậm vị trà thơm béo trân châu đường đen dẻo quánh ngọt ngào",
    "tag": "Quốc dân"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Oolong Nướng Trân Châu Hoàng Kim",
    "emoji": "🧋",
    "description": "Vị trà oolong nướng thơm nồng đậm đà hạt trân châu vàng giòn dai",
    "tag": "Đậm đà"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sữa Tươi Trân Châu Đường Đen The Alley",
    "emoji": "🥛",
    "description": "Sữa tươi thanh trùng Dalat Milk ngập trân châu đường đen nấu dẻo ấm",
    "tag": "Béo ngọt"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Đào Cam Sả Tươi Mát Lạnh",
    "emoji": "🍹",
    "description": "Trà đen thơm ngát vị đào giòn ngọt cam vàng mọng nước sả thơm lừng",
    "tag": "Thanh mát"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Mãng Cầu Đậm Vị Chua Ngọt",
    "emoji": "🍹",
    "description": "Thịt mãng cầu xiêm tươi dầm chua ngọt giòn giòn hòa cùng trà lài thơm",
    "tag": "Cơn sốt"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Hoa Quả Nhiệt Đới Thập Cẩm",
    "emoji": "🍉",
    "description": "Dưa hấu thanh long chanh dây cam vàng dâu tây ngập tràn ly trà thanh",
    "tag": "Giải nhiệt"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Vải Lài Hạt Chia Mọng Nước",
    "emoji": "🍹",
    "description": "Trà hoa lài thanh khiết trái vải thiều mọng nước giòn ngọt hạt chia mát",
    "tag": "Thanh tao"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Cà Phê Muối Xứ Huế Kem Béo",
    "emoji": "☕",
    "description": "Cà phê phin đậm đà hòa lớp kem sữa mặn béo ngậy ngào ngạt hương vị",
    "tag": "Xứ Huế"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Matcha Latte Kem Sữa Nhật Bản",
    "emoji": "🍵",
    "description": "Bột trà xanh Uji Nhật Bản đắng dịu hòa sữa tươi lớp kem cheese béo",
    "tag": "Nhật Bản"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Kem Cheese Macchiato Mặn Mòi",
    "emoji": "🧋",
    "description": "Lớp kem phô mai sánh mịn mặn béo phủ trên nền hồng trà đậm vị",
    "tag": "Béo ngậy"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Chanh Giã Tay Quảng Đông Thơm Nồng",
    "emoji": "🍋",
    "description": "Chanh nước hoa Quảng Đông giã tay đượm tinh dầu thơm nức giải nhiệt",
    "tag": "Hot trend"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Dâu Tằm Pha Lê Dầm Chua Ngọt",
    "emoji": "🍓",
    "description": "Dâu tằm tươi rim đường phèn màu tím thẫm chua ngọt giòn mát",
    "tag": "Đẹp da"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Mận Hậu Sapa Mùa Hè Chua Ngọt",
    "emoji": "🍒",
    "description": "Mận hậu đỏ au dầm nước cốt thơm ngọt chua thanh đá mát lạnh",
    "tag": "Mùa hè"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Thái Xanh Thơm Mát Lạ Miệng",
    "emoji": "🧋",
    "description": "Trà Thái xanh thơm ngát hương thảo mộc ngọt béo màu xanh bắt mắt",
    "tag": "Thái Lan"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Thái Đỏ Đậm Vị Truyền Thống",
    "emoji": "🧋",
    "description": "Trà Thái đỏ thơm nồng vị quế hồi sữa đặc béo ngậy ngọt ngào",
    "tag": "Béo bùi"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sinh Tố Bơ Sáp Dừa Non Sữa Đặc",
    "emoji": "🥑",
    "description": "Bơ sáp Đắk Lắk xay nhuyễn béo ngậy thơm lừng nước cốt dừa dẻo quánh",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sinh Tố Xoài Cát Hòa Lộc Cốt Dừa",
    "emoji": "🥭",
    "description": "Xoài chín vàng ngọt lịm xay cùng sữa tươi và đá bào mát lạnh",
    "tag": "Thơm ngọt"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Cà Phê Trứng Hà Nội Nóng Hổi",
    "emoji": "☕",
    "description": "Lòng đỏ trứng gà đánh bông mịn màng béo ngậy trên ly cà phê phin đen",
    "tag": "Phố cổ"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Nước Ép Dưa Hấu Bạc Hà Tươi Mát",
    "emoji": "🍉",
    "description": "Dưa hấu ngọt lịm ép lấy nước cốt lá bạc hà tươi thơm mát sảng khoái",
    "tag": "Giải khát"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Nước Ép Cà Rốt Táo Gừng Thải Độc",
    "emoji": "🥕",
    "description": "Cà rốt ngọt mát táo xanh chua dịu chút gừng ấm bổ dưỡng đẹp da",
    "tag": "Detox"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Khoai Môn Tím Thơm Bùi",
    "emoji": "🧋",
    "description": "Vị khoai môn bùi béo ngọt dịu màu tím pastel mộng mơ trân châu trắng",
    "tag": "Dễ thương"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Lạc Đào Sốt Kem Trứng Nướng",
    "emoji": "🍑",
    "description": "Trà đào thơm nức lớp kem trứng nướng cháy xém thơm lừng caramel",
    "tag": "Gây nghiện"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Hạt Sen Long Nhãn Thanh Ngọt",
    "emoji": "🧋",
    "description": "Hạt sen bùi béo long nhãn giòn ngọt hòa cùng sữa tươi trà olong",
    "tag": "Thanh tao"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Nước Chanh Leo Tuyết Đá Bào Chua Ngọt",
    "emoji": "🍹",
    "description": "Nước cốt chanh dây vàng óng chua thanh thơm lừng đá tuyết mịn",
    "tag": "Sảng khoái"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Socola Đậm Đà Thạch Cà Phê",
    "emoji": "🧋",
    "description": "Socola đắng nhẹ ngọt ngào thạch cà phê giòn dai nhai vui miệng",
    "tag": "Đậm đà"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Cà Phê Sữa Đá Sài Gòn Đậm Chất",
    "emoji": "☕",
    "description": "Cà phê phin đậm đặc hòa sữa đặc ngọt béo đá viên mát lạnh tỉnh táo",
    "tag": "Sài Gòn"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Bạc Xỉu Sữa Nóng Ba Tầng Thơm Ngon",
    "emoji": "☕",
    "description": "Nhiều sữa ít cà phê béo ngậy ngọt ngào thích hợp cho các nàng",
    "tag": "Ngọt ngào"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Ổi Hồng Muối Ớt Lạ Miệng",
    "emoji": "🍹",
    "description": "Trà ổi hồng thơm ngát màu hồng xinh xắn thêm chút muối ớt mặn ngọt",
    "tag": "Độc lạ"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Nước Dừa Tươi Trân Châu Cốt Dừa Đá",
    "emoji": "🥥",
    "description": "Nước dừa xiêm ngọt lịm trân châu trắng giòn cơm dừa nạo sợi",
    "tag": "Mát rượi"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sữa Chua Đánh Đá Cà Phê Cốt Dừa",
    "emoji": "🥛",
    "description": "Sữa chua lên men chua dịu rưới cà phê đen thơm nức cốt dừa béo",
    "tag": "Kinh điển"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Hoa Cúc Mật Ong Táo Đỏ Ấm Áp",
    "emoji": "🌼",
    "description": "Hoa cúc thơm dịu mật ong rừng ngọt ngào táo đỏ bồi bổ an thần",
    "tag": "Thư giãn"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Nướng Trân Châu Sợi Dài",
    "emoji": "🧋",
    "description": "Trà nướng thơm caramel trân châu sợi dai mềm hút rột rột cực đã",
    "tag": "Hot hit"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Nước Ép Dứa Thơm Cam Tươi Bổ Sung C",
    "emoji": "🍍",
    "description": "Vị chua ngọt rực rỡ của dứa mật và cam tươi bổ sung năng lượng",
    "tag": "Tươi tắn"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Tắc Xí Muội Đường Phèn Giải Khát",
    "emoji": "🍋",
    "description": "Quả tắc thơm chua xí muội mặn ngọt đường phèn mát họng",
    "tag": "Vỉa hè"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sữa Tươi Sương Sáo Thảo Mộc Đường Đen",
    "emoji": "🥛",
    "description": "Sữa tươi mát lạnh thạch sương sáo mềm mướt trân châu đường đen",
    "tag": "Thanh mát"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Bạc Hà Thơm Mát Lạnh Lưỡi",
    "emoji": "🧋",
    "description": "Vị bạc hà the mát kết hợp trà sữa béo ngậy the the sảng khoái",
    "tag": "Mát lạnh"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sinh Tố Dâu Tây Sữa Chua Kem Tươi",
    "emoji": "🍓",
    "description": "Dâu tây Đà Lạt đỏ mọng xay sữa chua sánh mịn phủ lớp kem bông",
    "tag": "Lãng mạn"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Nước Mía Trân Châu Nước Cốt Dừa",
    "emoji": "🥤",
    "description": "Nước mía ngọt mát thêm trân châu giòn dừa nạo và nước cốt dừa béo",
    "tag": "Sài Gòn"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sâm Dứa Hạt É Mát Gan",
    "emoji": "🍹",
    "description": "Trà sâm dứa thơm lừng lá dứa hạt é nở bung xốp giải nhiệt tức thì",
    "tag": "Bình dân"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sen Vàng Hạt Sen Củ Năng Highland",
    "emoji": "🪷",
    "description": "Trà ô long thơm ngát hạt sen bùi bở củ năng giòn sần sật kem béo",
    "tag": "Nổi tiếng"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Thanh Đào Sả Tươi Mát Lịm",
    "emoji": "🍑",
    "description": "Miếng đào vàng giòn ngọt ngào nước trà thanh dịu mùi thơm của sả tươi",
    "tag": "Thanh tao"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Cacao Dầm Trân Châu Bánh Flan",
    "emoji": "🍫",
    "description": "Cacao đá bào đậm đà sốt milo đặc kẹo trân châu đen bánh flan mềm",
    "tag": "Béo ngậy"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sữa Chua Uống Dâu Tằm Hạt Chia",
    "emoji": "🥛",
    "description": "Sữa chua uống thanh nhẹ sốt dâu tằm chua ngọt hạt chia bổ dưỡng",
    "tag": "Healthy"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Bưởi Mật Ong Chống Lão Hóa",
    "emoji": "🍊",
    "description": "Tép bưởi tươi mọng nước trà xanh mật ong ngọt thơm thanh lọc cơ thể",
    "tag": "Đẹp da"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Sinh Tố Mãng Cầu Gai Béo Chua Ngọt",
    "emoji": "🍹",
    "description": "Thịt mãng cầu dai chua ngọt xay sữa đặc béo ngậy đá tuyết mịn",
    "tag": "Khoái khẩu"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Sữa Hạnh Nhân Đậu Đỏ Bùi Bùi",
    "emoji": "🧋",
    "description": "Vị hạnh nhân thơm nồng đậu đỏ hầm mềm bùi ngọt ngào đưa miệng",
    "tag": "Ấm áp"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Nước Rau Má Đậu Xanh Nước Cốt Dừa",
    "emoji": "🥬",
    "description": "Rau má thanh mát đậu xanh bùi béo cốt dừa thơm lừng giải độc gan",
    "tag": "Thanh nhiệt"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Trà Lựu Đỏ Trân Châu Tuyết Trắng",
    "emoji": "🍷",
    "description": "Nước ép lựu đỏ au chua ngọt thanh mát trân châu ngọc trai giòn dai",
    "tag": "Sang chảnh"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Matcha Đá Xay Kem Tươi Phủ Đậu Đỏ",
    "emoji": "🍵",
    "description": "Trà xanh đá xay mát lạnh ngọn núi kem bông trắng đậu đỏ ngọt bùi",
    "tag": "Ngọt ngào"
  },
  {
    "category": "Trà Sữa & Đồ Uống Trái Cây",
    "name": "Cà Phê Cốt Dừa Hải Phòng Đá Xay",
    "emoji": "🥥",
    "description": "Cốt dừa đá xay sánh mịn rưới cà phê đen phin thơm nức mũi",
    "tag": "Hải Phòng"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Ức Gà Áp Chảo Sốt Mè Rang",
    "emoji": "🥗",
    "description": "Ức gà mềm không khô xà lách giòn ngọt cà chua bi sốt mè rang béo bùi",
    "tag": "Eat clean"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Poke Bowl Cá Hồi Tươi Bơ Sáp Quinoa",
    "emoji": "🥑",
    "description": "Cá hồi Nauy tươi cắt hạt lựu hạt quinoa quả bơ rong biển sốt shoyu",
    "tag": "Healthy"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Bún Chả Giò Chay Nấm Mộc Nhĩ",
    "emoji": "🥢",
    "description": "Chả giò khoai môn nấm chiên giòn rụm bún tươi rau sống nước mắm chay",
    "tag": "Thuần chay"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Lẩu Nấm Chay Thiên Nhiên Thanh Khiết",
    "emoji": "🍄",
    "description": "Nước dùng ninh từ củ quả thanh ngọt nấm đùi gà nấm linh chi đậu hũ",
    "tag": "Thanh tịnh"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Gạo Lứt Bò Áp Chảo Rau Củ Luộc",
    "emoji": "🍚",
    "description": "Hạt gạo lứt dẻo bùi thăn bò áp chảo bông cải xanh cà rốt luộc ngọt",
    "tag": "Tập gym"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Đậu Hũ Non Sốt Nấm Đông Cô Dầu Hào Chay",
    "emoji": "🧈",
    "description": "Đậu hũ non mềm mịn ngập sốt nấm đông cô thơm lừng sóng sánh bóng bẩy",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Cá Ngừ Quả Bơ Trứng Luộc",
    "emoji": "🥗",
    "description": "Cá ngừ đại dương bơ sáp béo ngậy trứng gà lòng đào sốt giấm balsamic",
    "tag": "Giàu đạm"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Cuộn Kimbap Chay Nấm Rau Củ",
    "emoji": "🍙",
    "description": "Cơm gạo lứt rong biển nấm kim châm xào cà rốt dưa leo đậu phụ chiên",
    "tag": "Thuần chay"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Phở Chay Nước Dùng Rau Củ Thanh Ngọt",
    "emoji": "🍜",
    "description": "Nước dùng ninh từ củ sen lê bắp ngọt bánh phở mềm nấm hương chả chay",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Ức Gà Nướng Mật Ong Mù Tạt Vàng",
    "emoji": "🍗",
    "description": "Ức gà ướp sốt mật ong mù tạt vàng nướng thơm mềm ăn cùng măng tây",
    "tag": "Ăn kiêng"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Cầu Vồng Tôm Luộc Sốt Sữa Chua",
    "emoji": "🥗",
    "description": "Tôm sú ngọt thịt ớt chuông bắp ngọt xà lách sốt sữa chua Hy Lạp nhẹ dịu",
    "tag": "Mát lành"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Miến Xào Chay Thập Cẩm Nấm Hương",
    "emoji": "🥢",
    "description": "Miến dong tơi mềm xào mộc nhĩ nấm đùi gà cà rốt đậu cô ve hạt tiêu",
    "tag": "Dân dã"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Chiên Gạo Lứt Hạt Sen Bùi Béo",
    "emoji": "🍛",
    "description": "Gạo lứt chiên tơi hạt cùng hạt sen bùi béo đậu Hà Lan cà rốt ngọt",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Đậu Phụ Nhồi Nấm Sốt Cà Chua Chay",
    "emoji": "🍅",
    "description": "Đậu phụ rán vàng nhồi nấm hương mộc nhĩ sốt cà chua tươi hành hoa",
    "tag": "Mộc mạc"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Canh Rong Biển Đậu Hũ Non Hạt Sen Chay",
    "emoji": "🥣",
    "description": "Rong biển wakame thanh mát đậu hũ non mềm tan hạt sen bùi béo ngọt",
    "tag": "Giải nhiệt"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Bánh Mì Đen Kẹp Quả Bơ Trứng Ốp La",
    "emoji": "🥪",
    "description": "Bánh mì hoa cúc đen nguyên cám phết bơ sáp trứng ốp la tiêu đen",
    "tag": "Bữa sáng"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Gỏi Cuốn Chay Nấm Rơm Đậu Hũ",
    "emoji": "🥗",
    "description": "Nấm rơm xào thơm đậu hũ chiên bún rau sống cuốn bánh tráng chấm tương",
    "tag": "Thanh mát"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Súp Yến Mạch Thịt Gà Xé Nấm Mỡ",
    "emoji": "🥣",
    "description": "Yến mạch sánh mịn nấu ức gà xé nấm mỡ hạt tiêu ngò tây thơm ngát",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Bò Lát Chay Xào Sả Ớt Cay Nồng",
    "emoji": "🥩",
    "description": "Bò lát chay ngâm nở xào sả ớt giòn thơm đậm đà tốn cơm vô cùng",
    "tag": "Đậm đà"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Rau Mầm Thịt Bò Áp Chảo",
    "emoji": "🥗",
    "description": "Rau mầm cay nhẹ giòn mát thịt bò thăn áp chảo sốt dầu giấm chua ngọt",
    "tag": "Tươi ngon"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cá Hồi Hấp Măng Tây Giấy Bạc Eat Clean",
    "emoji": "🐟",
    "description": "Cá hồi hấp nguyên vị ngọt mềm cùng măng tây rắc tiêu chanh vàng",
    "tag": "Sang sạch"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Nấm Đùi Gà Kho Tiêu Chay Đậm Vị",
    "emoji": "🍄",
    "description": "Nấm đùi gà cắt khoanh tròn kho nước tương tiêu đen kẹo quánh đưa cơm",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Bún Riêu Chay Đậu Hũ Sữa Đậu Nành",
    "emoji": "🍜",
    "description": "Riêu cua làm từ đậu hũ non và sữa đậu nành cà chua nấm rơm chua thanh",
    "tag": "Độc đáo"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Chả Lụa Chay Kho Nước Tương Nồi Đất",
    "emoji": "🥢",
    "description": "Chả lụa chay làm từ tàu hũ ky kho kẹo nước tương tiêu ớt hiểm cay",
    "tag": "Đậm vị"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Gà Xé Phay Gạo Lứt Rau Thơm",
    "emoji": "🍚",
    "description": "Gạo lứt đỏ dẻo thơm thịt ức gà ta xé phay bóp hành tây rau răm tiêu",
    "tag": "Khoẻ đẹp"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Trái Cây Tươi Sốt Sữa Chua Hy Lạp",
    "emoji": "🍓",
    "description": "Dâu tây việt quất táo giòn kiwi nho đen trộn sốt sữa chua hạt chia",
    "tag": "Tươi mát"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Đậu Hũ Tẩm Hành Chiên Giòn Chay",
    "emoji": "🧈",
    "description": "Đậu phụ rán vàng nhúng ngập mỡ hành thơm nức mũi chấm nước tương tỏi",
    "tag": "Dân dã"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Canh Chua Chay Bắp Ngọt Bạc Hà",
    "emoji": "🍲",
    "description": "Cà chua dứa bắp ngọt đậu bắp nấm rơm nước canh chua me thanh mát",
    "tag": "Mát lòng"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Khoai Lang Hấp Trứng Luộc Bữa Phụ",
    "emoji": "🍠",
    "description": "Khoai lang mật vàng ươm ngọt bùi ăn kèm quả trứng gà ta luộc lòng đào",
    "tag": "Nhanh gọn"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Tấm Sườn Chay Tàu Hũ Ky Giòn",
    "emoji": "🍛",
    "description": "Sườn non chay chiên giòn rim mặn ngọt bì chay chả trứng chay mỡ hành",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Smoothie Bowl Xoài Chuối Hạt Granola",
    "emoji": "🥭",
    "description": "Sinh tố xoài chuối xay sánh mịn rắc hạt ngũ cốc granola dừa sấy giòn",
    "tag": "Đẹp da"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Trứng Cút Bơ Sáp Cà Chua Bi",
    "emoji": "🥗",
    "description": "Trứng cút luộc bùi béo bơ tươi cà chua bi xà lách giòn sốt mè rang",
    "tag": "Đơn giản"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Bánh Bao Chay Nhân Nấm Hạt Sen",
    "emoji": "🥟",
    "description": "Vỏ bánh bao mềm xốp nhân nấm hương mộc nhĩ hạt sen đậu xanh bùi",
    "tag": "Thanh tao"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Gà Áp Chảo Sốt Chanh Dây Mật Ong",
    "emoji": "🍗",
    "description": "Ức gà mềm ngọt áp chảo sốt chanh leo vàng óng chua ngọt đậm đà",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Gạo Lứt Cuộn Rong Biển Cá Ngừ",
    "emoji": "🍙",
    "description": "Cơm gạo lứt dẻo cuộn cá ngừ sốt mè rong biển bùi béo no lâu",
    "tag": "Tiện ích"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Nấm Bào Ngư Chiên Giòn Lắc Muối Tiêu",
    "emoji": "🍄",
    "description": "Nấm bào ngư tẩm bột chiên vàng giòn rụm rắc muối tiêu lá chanh",
    "tag": "Ăn chơi"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Hủ Tiếu Chay Thập Cẩm Rau Củ Nấm",
    "emoji": "🍜",
    "description": "Sợi hủ tiếu dai nước lèo ninh củ cải cà rốt ngọt lịm đậu hũ nấm chả",
    "tag": "Ấm áp"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Ức Gà Nướng Sốt Pesto Húng Tây",
    "emoji": "🥗",
    "description": "Ức gà ướp thảo mộc nướng sốt pesto xanh mướt hạt thông bùi ngậy",
    "tag": "Âu sạch"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Chiên Trái Thơm Chay Hạt Điều",
    "emoji": "🍍",
    "description": "Cơm chiên trong trái dứa nấm hạt sen đậu Hà Lan hạt điều bùi béo",
    "tag": "Bắt mắt"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Canh Khổ Qua Nhồi Đậu Hũ Chay",
    "emoji": "🥒",
    "description": "Khổ qua thanh mát nhồi đậu hũ nấm mèo ninh nước súp trong veo ngọt mát",
    "tag": "Giải nhiệt"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Đậu Hũ Non Hấp Lá Chuối Nước Tương",
    "emoji": "🧈",
    "description": "Đậu hũ non hấp nóng thơm mùi lá chuối rưới xì dầu tỏi ớt gừng sợi",
    "tag": "Mộc mạc"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Bánh Mì Ngũ Cốc Bơ Đậu Phộng Chuối",
    "emoji": "🍌",
    "description": "Bánh mì đen nướng giòn phết bơ đậu phộng chuối chín thái lát mật ong",
    "tag": "Năng lượng"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Tôm Bưởi Hồng Giấm Táo",
    "emoji": "🥗",
    "description": "Tôm sú luộc mọng tép bưởi da xanh chua thanh sốt giấm táo thơm mát",
    "tag": "Thanh lọc"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Bún Trộn Chay Nấm Đùi Gà Nướng",
    "emoji": "🍜",
    "description": "Bún tươi nấm đùi gà nướng sốt tương đậu phộng rau sống dưa chuột",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cơm Gạo Lứt Xào Nấm Kim Châm Tỏi",
    "emoji": "🍚",
    "description": "Gạo lứt dẻo bùi xào nấm kim châm giòn ngọt tỏi phi thơm nức ngò gai",
    "tag": "Đưa cơm"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Chả Nấm Chiên Giòn Chấm Tương Ớt",
    "emoji": "🍄",
    "description": "Nấm hương nấm tuyết băm nhuyễn chiên vàng giòn rụm thơm ngát",
    "tag": "Món ngon"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Canh Nấm Hạt Sen Bí Đỏ Bổ Dưỡng",
    "emoji": "🥣",
    "description": "Bí đỏ ngọt bùi hạt sen nấm đông cô ninh mềm nước súp vàng óng",
    "tag": "Bồi bổ"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Salad Đậu Gà Tươi Xà Lách Dầu Oliu",
    "emoji": "🥗",
    "description": "Hạt đậu gà bùi béo dưa leo cà chua ngò tây rưới dầu oliu nguyên chất",
    "tag": "Địa Trung Hải"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Cá Hồi Nướng Mè Áp Chảo Bông Cải",
    "emoji": "🐟",
    "description": "Cá hồi phủ mè rang áp chảo giòn da ăn cùng bông cải xanh luộc sốt tỏi",
    "tag": "Chuẩn Gym"
  },
  {
    "category": "Món Chay & Eat Clean Healthy",
    "name": "Yến Mạch Ngâm Sữa Chua Trái Cây Đêm",
    "emoji": "🥣",
    "description": "Overnight oats yến mạch sữa hạt hạt chia dâu tây việt quất ngọt dịu",
    "tag": "Khoẻ mạnh"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Khúc Bạch Hạnh Nhân Trái Vải",
    "emoji": "🍮",
    "description": "Viên khúc bạch phô mai mềm dẻo thanh mát hạnh nhân lát nước đường phèn",
    "tag": "Mát lịm"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Thái Sầu Riêng Ngập Tràn Thạch",
    "emoji": "🥥",
    "description": "Múi sầu riêng thơm nức mít thái nhãn thạch củ năng nước cốt dừa béo",
    "tag": "Đệ nhất"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Bưởi An Giang Giòn Sần Sật",
    "emoji": "🥣",
    "description": "Cùi bưởi giòn sần sật khử đắng đỗ xanh bùi bở nước cốt dừa ngậy",
    "tag": "Miền Tây"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bingsu Xoài Phô Mai Tuyết Hoa Tuyết",
    "emoji": "🍧",
    "description": "Tuyết sữa mịn như nhung ngập tràn xoài tươi sốt xoài viên kem vani",
    "tag": "Hàn Quốc"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Dừa Côn Đảo Gáo Dừa Béo Ngậy",
    "emoji": "🍨",
    "description": "Viên kem dừa dẻo thơm trong gáo dừa rắc dừa sấy lạc rang xôi nếp",
    "tag": "Côn Đảo"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Tàu Hũ Trân Châu Cốt Dừa Singapore",
    "emoji": "🍮",
    "description": "Tàu hũ mềm mướt núng nính tan trong miệng ngập cốt dừa thơm béo",
    "tag": "Núng nính"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bánh Flan Caramen Cà Phê Sữa Đá",
    "emoji": "🍮",
    "description": "Bánh flan mềm mịn thơm ngậy trứng sữa đắng dịu caramen cà phê đá bào",
    "tag": "Kinh điển"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Sầu Riêng Dầm Thốt Nốt Nước Cốt Dừa",
    "emoji": "🥥",
    "description": "Thịt sầu riêng béo ngậy thốt nốt dẻo mềm thạch hạt lựu béo bùi",
    "tag": "Béo ngậy"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Đậu Đỏ Bánh Lọt Nước Cốt Dừa",
    "emoji": "🥣",
    "description": "Đậu đỏ hầm mềm nhừ sợi bánh lọt xanh mát nước cốt dừa béo ngọt",
    "tag": "May mắn"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Cung Đình Huế Mười Mấy Món",
    "emoji": "🥣",
    "description": "Mâm chè Huế hạt sen đậu ngự bột lọc bọc heo quay khoai tía thanh tao",
    "tag": "Xứ Huế"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bingsu Dâu Tây Tuyết Sữa Phô Mai",
    "emoji": "🍧",
    "description": "Đá bào tuyết sữa ngập tràn dâu tây đỏ mọng sốt dâu ngọt ngào kem tươi",
    "tag": "Lãng mạn"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Khoai Dẻo Đài Loan Nước Đường Gừng",
    "emoji": "🍠",
    "description": "Viên khoai lang khoai môn dẻo dai thảo mộc cao quy linh đá bào",
    "tag": "Đài Loan"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Bơ Sáp Đà Lạt Sầu Riêng Béo Ngậy",
    "emoji": "🥑",
    "description": "Bơ sáp xay sánh mịn viên kem dừa béo ngậy rắc dừa khô giòn rụm",
    "tag": "Đà Lạt"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Hạt Sen Long Nhãn Đường Phèn",
    "emoji": "🪷",
    "description": "Hạt sen bùi lồng trong cùi nhãn ngọt giòn nước đường phèn thanh khiết",
    "tag": "Thanh tao"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Sữa Chua Dẻo Xắt Miếng Cacao Trái Cây",
    "emoji": "🥛",
    "description": "Sữa chua dẻo chua dịu xắt miếng vuông rắc bột cacao sốt việt quất",
    "tag": "Thanh mát"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Dừa Dầm Hải Phòng Thạch Dừa Non",
    "emoji": "🥥",
    "description": "Thạch dừa non giòn sần sật dừa nạo sợi cốt dừa sữa đặc béo ngậy",
    "tag": "Hải Phòng"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bingsu Trà Xanh Matcha Đậu Đỏ Mochi",
    "emoji": "🍧",
    "description": "Bingsu tuyết vị trà xanh Uji đậu đỏ bùi ngọt viên bánh mochi dẻo",
    "tag": "Chuẩn Nhật"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Bột Lọc Heo Quay Độc Lạ Xứ Huế",
    "emoji": "🥣",
    "description": "Vỏ bột lọc dai trong bọc thịt heo quay mặn mà nước đường gừng thơm",
    "tag": "Độc đáo"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Rau Câu Dừa Trái Cây Tươi Mát Lạnh",
    "emoji": "🍮",
    "description": "Thạch rau câu giòn ngọt nấu nước dừa tươi thanh mát lấp lánh trái cây",
    "tag": "Giải nhiệt"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Trôi Nước Nhân Đậu Xanh Nước Đường Gừng",
    "emoji": "🥣",
    "description": "Viên nếp dẻo quánh nhân đỗ xanh bùi ngậy chan nước đường gừng ấm nồng",
    "tag": "Ấm áp"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Chiên Giòn Nóng Ngoài Lạnh Trong",
    "emoji": "🍨",
    "description": "Lớp vỏ bánh mì chiên vàng giòn rụm cắn ngập viên kem vani lạnh buốt",
    "tag": "Độc lạ"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Ba Màu Đậu Xanh Đậu Đỏ Thạch Xanh",
    "emoji": "🌈",
    "description": "Ly chè ba màu rực rỡ đậu đỏ đậu xanh hạt lựu nước cốt dừa đá bào",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Xôi Dừa Thái Lan Xôi Nếp Dẻo",
    "emoji": "🍨",
    "description": "Viên kem dừa thơm béo đặt trên xôi nếp lá dứa dẻo rắc đậu phộng bùi",
    "tag": "Thái Lan"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Sương Sa Hạt Lựu Bánh Lọt Nước Cốt Dừa",
    "emoji": "🥣",
    "description": "Hạt lựu củ năng giòn sần sật sương sa thanh mát chan nước cốt dừa",
    "tag": "Mát ngọt"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Thưng Nam Bộ Đậu Phộng Khoai Môn",
    "emoji": "🍠",
    "description": "Đậu xanh khoai môn nấm mèo bột báng nước cốt dừa thơm ngát béo bùi",
    "tag": "Nam Bộ"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Panna Cotta Sốt Dâu Tây Mềm Mịn",
    "emoji": "🍮",
    "description": "Panna Cotta kem tươi dẻo mịn tan trên đầu lưỡi sốt dâu chua ngọt",
    "tag": "Ý"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Mè Đen Chí Mà Phù Nóng Hổi",
    "emoji": "🥣",
    "description": "Chè mè đen ấm nóng sánh mịn thơm lừng mùi gừng và vỏ quýt thơm",
    "tag": "Gốc Hoa"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bingsu Socola Chuối Hạnh Nhân Lát",
    "emoji": "🍧",
    "description": "Tuyết sữa ngập bột socola đắng ngọt chuối tiêu chín hạnh nhân giòn",
    "tag": "Đậm đà"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Bắp Ngọt Nước Cốt Dừa Hội An",
    "emoji": "🌽",
    "description": "Bắp non Cẩm Nam ngọt lịm nấu sánh dẻo thơm lừng cốt dừa béo",
    "tag": "Hội An"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Tàu Hũ Nóng Nước Đường Gừng Lá Dứa",
    "emoji": "🍮",
    "description": "Tàu hũ non ấm nóng mềm mượt chan nước đường thốt nốt cay nồng gừng",
    "tag": "Mùa đông"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Cuộn Thái Lan Trái Cây Chảo Băng",
    "emoji": "🍨",
    "description": "Kem sữa tươi dầm trái cây cuộn tròn xinh xắn trên chảo băng lạnh",
    "tag": "Thái Lan"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Củ Năng Hạt Sen Nước Đường Phèn",
    "emoji": "🥣",
    "description": "Củ năng giòn ngọt hạt sen bùi bở nước dùng thanh ngọt giải nhiệt",
    "tag": "Thanh mát"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Đậu Ngự Cung Đình Huế Hạt To",
    "emoji": "🥣",
    "description": "Hạt đậu ngự to bở bùi nấu đường phèn thanh ngọt ướp hoa lài thơm",
    "tag": "Cung đình"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Gelato Ý Đủ Vị Socola Hạt Dẻ",
    "emoji": "🍨",
    "description": "Kem Ý dẻo quánh đặc sánh đậm vị socola hạt dẻ cười pistachio béo ngậy",
    "tag": "Chuẩn Ý"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Cốm Xanh Hạt Sen Hà Nội Mùa Thu",
    "emoji": "🥣",
    "description": "Hạt cốm non dẻo quánh thơm hương lúa mới nấu hạt sen bùi nước đường",
    "tag": "Mùa thu"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Chuối Nướng Nước Cốt Dừa Miền Tây",
    "emoji": "🍌",
    "description": "Chuối bọc nếp nướng than vàng giòn chan ngập nước cốt dừa đậu phộng",
    "tag": "Miền Tây"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Sữa Chua Nếp Cẩm Mộc Châu Dẻo Bùi",
    "emoji": "🍚",
    "description": "Nếp cẩm lên men chua ngọt dẻo thơm hòa sữa chua sánh mịn đá bào",
    "tag": "Tây Bắc"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Khoai Môn Bột Báng Nước Cốt Dừa",
    "emoji": "🍠",
    "description": "Khoai môn dẻo bùi bở tơi hạt bột báng dai trong nước cốt dừa béo ngậy",
    "tag": "Ấm cúng"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Trái Dừa Xiêm Sầu Riêng Béo Ngậy",
    "emoji": "🥥",
    "description": "Trái dừa tươi đựng viên kem sầu riêng thơm nức đậu phộng dừa sấy",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Nhãn Nhục Hạt Sen Táo Đỏ",
    "emoji": "🥣",
    "description": "Nhãn nhục thơm ngọt táo đỏ hạt sen thạch củ năng mát gan bổ dưỡng",
    "tag": "Bổ dưỡng"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bingsu Dưa Lưới Khổng Lồ Kem Tươi",
    "emoji": "🍈",
    "description": "Nửa trái dưa lưới tròn xếp từng viên dưa ngọt lịm đá tuyết kem vani",
    "tag": "Đẹp mắt"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Trứng Gà Trà Đen Hong Kong",
    "emoji": "🥚",
    "description": "Trứng gà luộc ninh trong nước hồng trà thơm dịu đường phèn ngọt nhẹ",
    "tag": "Hong Kong"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Thạch Rau Câu Phô Mai Cà Phê Viên Nhỏ",
    "emoji": "🍮",
    "description": "Viên thạch cà phê giòn dai cắn trúng viên phô mai béo ngậy tan chảy",
    "tag": "Ăn vặt"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Đậu Xanh Đánh Béo Ngậy Nước Cốt Dừa",
    "emoji": "🥣",
    "description": "Đậu xanh đánh nhuyễn mịn như kem chan nước cốt dừa béo bùi ăn nóng lạnh",
    "tag": "Quen thuộc"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Sâm Bổ Lượng Thảo Mộc Giải Nhiệt",
    "emoji": "🥣",
    "description": "Bo bo rong biển nhãn nhục táo đỏ hạt sen củ sen thanh mát giải nhiệt",
    "tag": "Thanh mát"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Kem Tươi Ốc Quế Vani Socola Xoắn",
    "emoji": "🍦",
    "description": "Cây kem ốc quế giòn rụm kem xoắn hai màu vani socola ngọt ngào mát lạnh",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Đậu Trắng Nước Cốt Dừa Béo Bùi",
    "emoji": "🥣",
    "description": "Hạt đậu trắng to bở bùi hạt nếp dẻo sánh nước cốt dừa mặn ngọt",
    "tag": "Nam Bộ"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bánh Flan Trái Dừa Rau Câu Lá Dứa",
    "emoji": "🥥",
    "description": "Trái dừa nguyên quả bên trong đổ lớp flan béo ngậy và rau câu lá dứa",
    "tag": "Độc đáo"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Chè Khoai Mì Nước Cốt Dừa Dẻo Quánh",
    "emoji": "🍠",
    "description": "Khoai mì mài viên tròn dẻo dai bọc nước cốt dừa mè rang thơm phức",
    "tag": "Dân dã"
  },
  {
    "category": "Chè & Tráng Miệng Ngọt Ngào",
    "name": "Bingsu Phô Mai Sợi Sốt Caramel Béo",
    "emoji": "🍧",
    "description": "Bingsu tuyết sữa phủ lớp phô mai sợi mặn mặn béo ngậy sốt caramel ngọt",
    "tag": "Hiện đại"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Croissant Trứng Muối Phô Mai Chảy",
    "emoji": "🥐",
    "description": "Vỏ bánh sừng trâu ngàn lớp giòn xốp thơm lừng bơ nhân trứng muối chảy",
    "tag": "Cực phẩm"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Tiramisu Cà Phê Rượu Rum Ý",
    "emoji": "🍰",
    "description": "Lớp bánh ladyfinger đẫm cà phê rượu rum kem phô mai mascarpone bột cacao",
    "tag": "Chuẩn Ý"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Su Kem Hokkaido Nhân Kem Vani Mát Lạnh",
    "emoji": "🧁",
    "description": "Vỏ giòn rụm nhân kem tươi Hokkaido thơm ngậy ngọt dịu mát lạnh",
    "tag": "Tan chảy"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bông Lan Trứng Muối Chà Bông Sốt Bơ",
    "emoji": "🎂",
    "description": "Bánh bông lan mềm ẩm xốp ngập sốt bơ dầu trứng phô mai mặn mà",
    "tag": "Quốc dân"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mousse Chanh Dây Chua Ngọt Thanh Mát",
    "emoji": "🍰",
    "description": "Lớp mousse mịn màng như mây vị chua thanh của chanh dây đế bánh xốp",
    "tag": "Thanh dịu"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Phô Mai Nướng Cháy Basque Burnt Cheesecake",
    "emoji": "🧀",
    "description": "Bánh cheesecake nướng cháy xém bề mặt bên trong kem phô mai béo ngậy mềm tan",
    "tag": "Hot trend"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Donut Phủ Socola Hạnh Nhân Cầu Vồng",
    "emoji": "🍩",
    "description": "Bánh rán donut mềm xốp áo lớp socola đen bóng bẩy rắc cốm hạnh nhân",
    "tag": "Dễ thương"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Waffle Nướng Giòn Dâu Tây Kem Tươi",
    "emoji": "🧇",
    "description": "Bánh tổ ong nướng nóng hổi giòn rụm dâu tây tươi mọng viên kem lạnh",
    "tag": "Lãng mạn"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Red Velvet Đỏ Nhung Phô Mai Kem",
    "emoji": "🍰",
    "description": "Cốt bánh đỏ nhung kiêu kỳ mềm ẩm xen kẽ lớp kem phô mai chua béo",
    "tag": "Quý phái"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mì Bơ Tỏi Phô Mai Hàn Quốc Sốt Kem",
    "emoji": "🥖",
    "description": "Ổ bánh mì tròn khía múi ngập sốt bơ tỏi thơm nức và phô mai cream cheese",
    "tag": "Cơn sốt"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Macaron Pháp Đủ Màu Sắc Ngọt Ngào",
    "emoji": "🍪",
    "description": "Vỏ bánh hạnh nhân giòn tan nhân kem socola việt quất dâu tây xinh xắn",
    "tag": "Nước Pháp"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Tart Trứng Bồ Đào Nha Nướng Cháy",
    "emoji": "🥧",
    "description": "Lớp vỏ ngàn lớp giòn rụm nhân kem sữa trứng nướng xém vàng thơm ngát",
    "tag": "Béo ngậy"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mì Hoa Cúc Thơm Lừng Bơ Pháp",
    "emoji": "🍞",
    "description": "Bánh mì hoa cúc thớ bánh dài dai mềm thơm nồng hương hoa cam và bơ Pháp",
    "tag": "Thơm nức"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mousse Dâu Tây Trái Tim Ngọt Ngào",
    "emoji": "🍰",
    "description": "Bánh kem mousse dâu tây màu hồng pastel mềm mịn trang trí quả dâu tây",
    "tag": "Tình yêu"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Su Giòn Craquelin Nhân Kem Socola",
    "emoji": "🧁",
    "description": "Lớp vỏ nứt craquelin giòn tan ngập kem socola đen đắng ngọt ngào",
    "tag": "Hấp dẫn"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Bông Lan Cuộn Trà Xanh Matcha Kem",
    "emoji": "🍰",
    "description": "Cốt bánh matcha thơm đắng dịu cuộn kem tươi mềm mịn thanh mát",
    "tag": "Nhật Bản"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Cheesecake New York Truyền Thống",
    "emoji": "🧀",
    "description": "Bánh phô mai nướng đậm đặc béo ngậy đế bánh quy giòn rụm thơm bơ",
    "tag": "New York"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mì Baguette Nướng Bơ Mật Ong",
    "emoji": "🥖",
    "description": "Bánh mì Pháp giòn tan xắt lát nướng bơ lạt mật ong ngọt thơm rắc mè",
    "tag": "Giòn rụm"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Bông Lan Phô Mai Nhật Bản Núng Nính",
    "emoji": "🧀",
    "description": "Bánh Japanese Cotton Cheesecake xốp nhẹ như mây núng nính mềm tan",
    "tag": "Núng nính"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Crepe Ngàn Lớp Mille Crepe Vani",
    "emoji": "🥞",
    "description": "Hàng chục lớp bánh crepe mỏng tang xen kẽ kem tươi vani mát lạnh",
    "tag": "Tinh tế"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Cupcake Socola Kem Bơ Bắt Hoa",
    "emoji": "🧁",
    "description": "Chiếc bánh nhỏ xinh cốt socola đậm vị bắt hoa kem bơ màu sắc rực rỡ",
    "tag": "Xinh xắn"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Tart Trái Cây Tươi Mâm Xôi Việt Quất",
    "emoji": "🥧",
    "description": "Đế tart giòn rụm nhân kem trứng custard xếp đầy quả mâm xôi việt quất",
    "tag": "Tươi mát"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Muffin Việt Quất Xốp Mềm Thơm Ngát",
    "emoji": "🧁",
    "description": "Bánh muffin nướng phồng xốp mọng nước từng quả việt quất tươi chua ngọt",
    "tag": "Bữa sáng"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Donut Nhân Kem Trứng Tan Chảy",
    "emoji": "🍩",
    "description": "Bánh donut phủ đường bột cắn ngập miệng nhân kem trứng sữa béo ngậy",
    "tag": "Tan chảy"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Chiffon Cam Tươi Xốp Mềm Như Mây",
    "emoji": "🍊",
    "description": "Cốt bánh chiffon nhẹ tênh thơm ngát tinh dầu vỏ cam vàng mọng nước",
    "tag": "Thanh nhẹ"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Sừng Trâu Cuộn Hạnh Nhân Pain Au Chocolat",
    "emoji": "🥐",
    "description": "Vỏ bánh ngàn lớp bọc nhân thanh socola đen nướng giòn rụm thơm bơ",
    "tag": "Paris"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Brownie Socola Hạt Óc Chó Đậm Vị",
    "emoji": "🍫",
    "description": "Bánh socola fudge ẩm mềm đậm đặc hạt óc chó bùi béo ăn kèm kem vani",
    "tag": "Đậm đà"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Éclair Pháp Nhân Kem Cà Phê Phủ Socola",
    "emoji": "🥖",
    "description": "Bánh su dài kiểu Pháp giòn vỏ nhân kem cà phê thơm ngát phủ socola",
    "tag": "Thanh lịch"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Bông Lan Chuối Nướng Yến Mạch",
    "emoji": "🍌",
    "description": "Chuối chín thơm lừng nướng cùng yến mạch và hạt hạnh nhân ít ngọt",
    "tag": "Healthy"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Phô Mai Trái Bơ Mousse Thanh Mát",
    "emoji": "🥑",
    "description": "Bơ sáp tươi béo ngậy hòa cùng kem phô mai mịn màng màu xanh ngọc bích",
    "tag": "Mới lạ"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Quy Bơ Đan Mạch Hộp Thiếc Giòn Rụm",
    "emoji": "🍪",
    "description": "Bánh quy bơ giòn tan thơm lừng rắc hạt đường cát lấp lánh tuổi thơ",
    "tag": "Kỷ niệm"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mì Gối Brioche Bơ Pháp Vàng Óng",
    "emoji": "🍞",
    "description": "Bánh mì gối vàng ươm thớ bánh mềm dai béo ngậy hương vị bơ thượng hạng",
    "tag": "Pháp"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Tart Táo Nướng Quế Thơm Nồng Apple Pie",
    "emoji": "🥧",
    "description": "Vỏ bánh tart giòn rụm nhân táo xào bơ quế thơm nức mũi ăn cùng kem",
    "tag": "Ấm áp"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Kem Bắp Phô Mai Hạnh Nhân Bùi Béo",
    "emoji": "🎂",
    "description": "Cốt bánh mềm xốp phủ kem bắp ngọt thanh hạt bắp giòn rắc hạnh nhân",
    "tag": "Dễ ăn"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Crepe Sầu Riêng Ngập Tràn Kem Tươi",
    "emoji": "🥞",
    "description": "Lớp vỏ crepe mỏng bọc múi sầu riêng béo ngậy và kem tươi thơm lừng",
    "tag": "Béo ngậy"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mousse Xoài Chanh Leo Đế Bánh Quy",
    "emoji": "🥭",
    "description": "Mousse xoài vàng tươi chua ngọt thanh mát đế bánh quy bơ giòn tan",
    "tag": "Mùa hè"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Bông Lan Trứng Cuộn Mứt Dâu",
    "emoji": "🍰",
    "description": "Bánh cuộn vàng óng cuộn mứt dâu tây ngọt ngào dẻo thơm rắc đường bột",
    "tag": "Tuổi thơ"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Scones Anh Quốc Nho Khô Ăn Cùng Mứt",
    "emoji": "🥮",
    "description": "Bánh nướng kiểu Anh giòn xốp thơm bơ ăn kèm mứt dâu và kem clotted cream",
    "tag": "Trà chiều"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mì Nướng Phô Mai Tỏi Đút Lò",
    "emoji": "🥖",
    "description": "Bánh mì baguette phết bơ tỏi ngập phô mai nướng xém cạnh kéo sợi",
    "tag": "Thơm nức"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Su Kem Thiên Nga Trang Trí Nghệ Thuật",
    "emoji": "🦢",
    "description": "Chiếc bánh su tạo hình thiên nga kiêu kỳ nhân kem tươi vani ngọt ngào",
    "tag": "Đẹp mắt"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Cookie Socola Chip Mềm Đậm Vị",
    "emoji": "🍪",
    "description": "Bánh quy nướng mềm dẻo ngập tràn viên socola chip cắn chảy thơm bơ",
    "tag": "Mỹ"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Bông Lan Nướng Than Hoa Phô Mai",
    "emoji": "🧀",
    "description": "Bông lan nướng mềm xốp xém cạnh phô mai cheddar tan chảy mặn ngọt",
    "tag": "Đường phố"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mousse Socola Đen 70% Cacao",
    "emoji": "🍫",
    "description": "Mousse socola đen nguyên chất đắng dịu ngọt ngào mịn màng như nhung",
    "tag": "Sang trọng"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Croissant Bơ Hạnh Nhân Nướng Giòn",
    "emoji": "🥐",
    "description": "Bánh sừng trâu phết kem hạnh nhân rắc ngập hạt hạnh nhân nướng vàng ruộm",
    "tag": "Giòn tan"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Gato Sinh Nhật Dâu Tây Kem Tươi",
    "emoji": "🎂",
    "description": "Bánh sinh nhật cốt vani mềm xốp phủ kem tươi thanh nhẹ ngập dâu tây",
    "tag": "Chúc mừng"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Tart Socola Đen Ganache Bóng Bẩy",
    "emoji": "🥧",
    "description": "Đế tart giòn rụm ngập sốt socola ganache đen bóng mịn màng tan chảy",
    "tag": "Đẳng cấp"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mì Gối Men Tự Nhiên Sourdough",
    "emoji": "🍞",
    "description": "Bánh mì men chua vỏ giòn cứng ruột dai xốp thơm hương men tự nhiên",
    "tag": "Thủ công"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Panna Cotta Chanh Leo Cốt Dừa",
    "emoji": "🍮",
    "description": "Kem sữa panna cotta béo ngậy sốt chanh leo chua thanh giải ngấy",
    "tag": "Thanh mát"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Mousse Trà Sữa Trân Châu Đen",
    "emoji": "🧋",
    "description": "Bánh mousse vị hồng trà sữa thơm lừng phủ hạt trân châu đen dẻo dai",
    "tag": "Độc đáo"
  },
  {
    "category": "Bánh Ngọt & Tiệm Bánh Bakery",
    "name": "Bánh Bông Lan Kem Trứng Nướng Cháy",
    "emoji": "🧁",
    "description": "Bánh bông lan mini mềm ẩm phủ lớp sốt kem trứng khò lửa thơm lừng caramel",
    "tag": "Gây sốt"
  }
];
