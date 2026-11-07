/**
 * HÔM NAY EM MUỐN ĂN GÌ? 💕
 * CS:GO Style Roulette Food Decider for Couples
 */

// Embedded fallback data in case of file:// CORS restriction
const DEFAULT_CSV_DATA = `category,name,emoji,description,tag
Món Nướng,Bò Nầm Nướng Bơ Tỏi,🥩,Nầm giòn sần sật đẫm sốt me bơ tỏi thơm nức mũi,Đậm đà
Món Nướng,Thịt Nướng Hàn Quốc (KBBQ),🥓,Ba chỉ cuộn nấm kim châm cuốn xà lách chấm ssamjang,No căng bụng
Món Nướng,Sườn Cây Nướng Mật Ong,🍖,Dẻ sườn ướp đẫm mật ong rừng nướng xém cạnh,Ngọt mềm
Món Nướng,Gà Nướng Cơm Lam,🍗,Gà ta da giòn rụm chấm muối ớt xanh ăn cùng cơm lam dẻo,Đặc sản
Món Nướng,Nầm Bò Sốt Trứng Muối,🧀,Nầm bò sốt phô mai béo ngậy kèm bánh mì nướng bơ,Béo ngậy
Món Nướng,Hải Sản Nướng Mỡ Hành,🦪,Hàu nướng phô mai mỡ hành sò điệp nướng trứng cút,Hải sản tươi
Món Nướng,Bò Tơ Nướng Tảng,🥩,Bò tơ mềm ngọt cuốn rau rừng chấm mắm nêm,Ngon khó cưỡng
Món Nướng,Chân Gà Nướng Mật Ong,🍗,Chân gà nướng mật ong sả ớt nhâm nhi cùng trà chanh,Lai rai
Món Nướng,Nem Nướng Nha Trang,🥢,Nem nướng thơm phức cuốn bánh tráng ram giòn sốt đậu,Thơm lừng
Món Nướng,Bạch Tuộc Sa Tế Nướng,🐙,Bạch tuộc cay cay giòn sần sật thơm lừng xì xụp,Cay nồng
Món Lẩu,Lẩu Thái Tomyum Chua Cay,🍲,Nước lẩu cốt dừa chua cay đẫm tôm mực bò Mỹ,Chua cay tê tái
Món Lẩu,Lẩu Riêu Cua Bắp Bò Sườn Sụn,🦀,Rau sống xanh mướt riêu cua béo ngọt ngào,Ấm bụng
Món Lẩu,Lẩu Ếch Măng Cay,🐸,Thịt ếch xào măng cay giòn sần sật thơm nồng,Đậm đà cay tê
Món Lẩu,Lẩu Nấm Thiên Nhiên,🍄,Nước dùng thanh ngọt từ xương và các loại nấm quý,Thanh đạm
Món Lẩu,Lẩu Bò Nhúng Giấm,🥩,Thịt bò mềm nhúng nước giấm chua thanh cuốn bánh tráng,Chua ngọt
Món Lẩu,Lẩu Gà Lá É Phú Yên,🍗,Thịt gà đồi dai ngọt nấu cùng lá é thơm the the ấm lòng,Ấm áp
Món Lẩu,Lẩu Kim Chi Hải Sản Hàn Quốc,🥘,Nước lẩu chua cay kim chi đậu hũ non nấm kim châm,Hàn Quốc
Món Lẩu,Lẩu Cá Kèo Lá Giang,🐟,Cá kèo tươi ngọt vị chua thanh mát đặc trưng Nam Bộ,Dân dã
Món Xào,Mì Xào Giòn Hải Sản,🦑,Sợi mì chiên vàng giòn rụm ngập sốt tôm mực rau củ,Giòn rụm
Món Xào,Cơm Rang Dưa Bò,🍛,Hạt cơm vàng tơi xào thịt bò mềm và dưa chua giòn rụm,Kinh điển
Món Xào,Sườn Xào Chua Ngọt,🍖,Sườn non chiên sốt cà chua dứa đậm đà đưa cơm cực kỳ,Đưa cơm
Món Xào,Mực Xào Sa Tế Cần Tỏi,🐙,Mực tươi xào cay nồng thơm lừng mùi cần tây tỏi tây,Cay cay
Món Xào,Phở Xào Bắp Bò Rau Cải,🍜,Phở xào cháy cạnh mềm dẻo sốt bò bắp thơm nức,Bổ dưỡng
Món Xào,Bò Lúc Lắc Khoai Tây Chiên,🥩,Thịt bò vuông mềm ngọt ăn kèm khoai tây chiên sốt tiêu,Sang chảnh
Món Xào,Ốc Móng Tay Xào Bơ Tỏi,🐚,Ốc móng tay giòn ngọt tắm đẫm sốt bơ tỏi thơm ngát,Thơm nức mũi
Món Hấp & Luộc,Dimsum Há Cảo Xửng Hấp,🥟,Xửng há cảo tôm thịt nóng hổi vỏ mỏng trong veo,Thanh lịch
Món Hấp & Luộc,Gà Hấp Lá Chanh / Muối Ớt,🍗,Thịt gà vàng ươm da giòn thịt ngọt chấm muối tiêu chanh,Truyền thống
Món Hấp & Luộc,Ngao Hấp Xả Ớt Dứa,🥣,Ngao béo múp ngập nước ngọt thơm mùi sả ớt the cay,Húp nước xì xụp
Món Hấp & Luộc,Bánh Bao Kim Sa & Xá Xíu,🥟,Bánh bao nóng hổi nhân kim sa tan chảy béo ngọt,Ấm lòng
Món Hấp & Luộc,Cuốn Bánh Tráng Thịt Heo Luộc,🥓,Thịt ba chỉ luộc hai đầu mỡ cuốn bánh tráng chấm mắm nêm,Ngon chuẩn vị
Món Hấp & Luộc,Gỏi Cuốn Tôm Thịt Thanh Mát,🥗,Tôm thịt tươi ngon cuốn bún rau sống chấm tương đen bơ đậu phộng,Healthy
Món Hấp & Luộc,Mực Hấp Gừng Hành,🦑,Mực trứng tươi rói hấp gừng thơm nồng chấm mắm gừng cay,Ngọt thịt
Món Nước & Sợi,Bún Bò Huế Đầy Đủ Giò Chả,🍜,Nước dùng thơm mùi sả mắm ruốc đẫm thịt bò gân chả cua,Đậm đà cố đô
Món Nước & Sợi,Phở Bò Tái Lăn Hà Nội,🍲,Nước dùng ninh xương ngọt thanh thịt bò xào lăn thơm phức hành hoa,Quốc hồn quốc túy
Món Nước & Sợi,Bún Đậu Mắm Tôm Thập Cẩm,🥢,Đậu rán giòn chả cốm nem rán dồi sụn mắm tôm đánh bông bọt,Chuẩn vị phố cổ
Món Nước & Sợi,Mì Cay 7 Cấp Độ Hàn Quốc,🌶️,Thách thức vị giác với bát mì cay xì xụp hải sản bò Mỹ,Thử thách
Món Nước & Sợi,Bún Chả Nướng Hà Nội,🥓,Chả miếng chả băm nướng than hoa đẫm nước chấm chua ngọt tỏi ớt,Thơm nức
Món Nước & Sợi,Hủ Tiếu Nam Vang,🍜,Nước lèo sườn tôm thơm ngọt sợi hủ tiếu dai dai ăn khô hay nước đều mê,Đậm vị
Món Nước & Sợi,Bánh Canh Ghẹ / Cua Đồng,🦀,Nước dùng sánh đậm thịt ghẹ thơm ngọt sợi bánh canh dai mềm,Sánh béo
Món Nước & Sợi,Mì Ramen Nhật Bản,🍜,Nước hầm xương Tonkotsu béo ngậy thịt xá xíu trứng lòng đào lòng đỏ tan chảy,Chuẩn vị Nhật
Món Chiên & Rán,Gà Rán Sốt Cay Phô Mai,🍗,Miếng gà ngoài giòn trong mọng ngập sốt cay phô mai kéo sợi,Béo ngậy
Món Chiên & Rán,Bánh Xèo Miền Tây Giòn Rụm,🥞,Vỏ bánh vàng ươm giòn tan nhân tôm thịt giá đỗ cuốn rau rừng,Giòn rụm
Món Chiên & Rán,Cơm Gà Xối Mỡ Da Giòn,🍛,Cơm đỏ hạt dẻo đùi gà xối mỡ vàng ươm da giòn tan,Chắc dạ
Món Chiên & Rán,Nem Chua Rán & Phô Mai Que,🧀,Đĩa nem chua rán nóng hổi chấm tương ớt cay ngọt kèm phô mai kéo sợi,Mê tít
Món Chiên & Rán,Phở Chiên Phồng Sốt Bò Cải,🥟,Bánh phở phồng rộp giòn tan rưới đẫm nước sốt bò mềm rau cải,Ngon lạ miệng
Món Chiên & Rán,Bột Chiên Trứng Giòn Giòn,🍳,Bột chiên xém vàng giòn trứng gà thơm lừng chấm nước tương chua ngọt,Kỷ niệm
Món Chiên & Rán,Khoai Tây Lắc Phô Mai Trứng Muối,🍟,Khoai tây chiên vàng giòn phủ đẫm bột phô mai béo thơm lừng,Ăn là ghiền
Món Ăn Vặt,Bánh Tráng Trộn / Bánh Tráng Nướng,🍕,Bánh tráng nướng Đà Lạt giòn rụm trứng cút bò khô hành phi,Pizza Việt Nam
Món Ăn Vặt,Ốc Hương Sốt Trứng Muối,🐚,Ốc hương béo ngậy đẫm sốt trứng muối chấm bánh mì giòn tan,Cực phẩm
Món Ăn Vặt,Tokbokki Phô Mai Chả Cá,🍢,Bánh gạo dẻo quánh sốt tương ớt Gochujang phô mai béo kéo sợi,Hàn xẻng
Món Ăn Vặt,Chân Gà Sả Tắc Cóc Non,🍗,Chân gà giòn sần sật vị chua ngọt thơm nồng của sả tắc cóc non,Chua chua ngọt ngọt
Món Ăn Vặt,Xiên Que Cổng Trường,🍡,Cá viên bò viên tôm viên hồ lô chiên vàng chấm tương đen tương ớt,Tuổi thơ
Món Ăn Vặt,Bánh Tráng Cuốn Bơ Sốt Trứng,🌯,Vị béo ngậy của sốt trứng bơ hòa cùng ruốc bò khô hành phi,Gây nghiện
Món Fastfood & Đồ Tây,Pizza Phô Mai Ngập Tràn,🍕,Đế bánh giòn thơm ngập phô mai mozzarella kéo sợi dẻo mịn,Tây tây béo ngậy
Món Fastfood & Đồ Tây,Burger Bò Nướng Đẫm Sốt,🍔,Bánh burger mềm kẹp bò nướng than hoa phô mai cheddar tan chảy,Cắn ngập răng
Món Fastfood & Đồ Tây,Mì Ý Sốt Bò Băm Bolognese,🍝,Sợi mì spaghetti dai ngon quyện sốt cà chua bò băm phô mai bột,Lãng mạn
Món Fastfood & Đồ Tây,Steak Bò Sốt Tiêu Đen,🥩,Bò bít tết áp chảo mềm mọng chín vừa sốt tiêu đen kèm khoai nghiền,Hẹn hò lãng mạn
Món Fastfood & Đồ Tây,Tacos / Burrito Mexico,🌮,Vỏ bánh giòn rụm kẹp thịt ướp gia vị sốt salsa guacamole chua thanh,Mới lạ
Tráng Miệng & Trà Sữa,Trà Sữa Trân Châu Đường Đen,🧋,Trà sữa thơm béo trân châu dẻo quánh ngọt ngào giải nhiệt,Nạp đường hạnh phúc
Tráng Miệng & Trà Sữa,Bingsu Xoài Phô Mai Tuyết Hoa,🍧,Tuyết sữa tuyết bào mịn màng ngập sốt xoài ngọt thanh viên kem vani,Mát rượi
Tráng Miệng & Trà Sữa,Chè Sầu Riêng Dầm Thốt Nốt,🥥,Múi sầu riêng béo ngậy thơm lừng nước cốt dừa hạt đác thốt nốt dẻo,Béo ngậy ngây ngất
Tráng Miệng & Trà Sữa,Kem Dừa Côn Đảo Béo Ngậy,🍨,Viên kem dừa béo thơm đựng trong gáo dừa rắc lạc rang dừa khô,Thơm mát
Tráng Miệng & Trà Sữa,Tàu Hũ Trân Châu Cốt Dừa,🍮,Tàu hũ mềm mịn núng nính tan ngay trong miệng ngập cốt dừa thơm,Núng nính
Tráng Miệng & Trà Sữa,Trà Đào Cam Sả / Trà Mãng Cầu,🍹,Vị trà thanh mát chua ngọt của trái cây tươi giòn sảng khoái,Thanh mát
Tráng Miệng & Trà Sữa,Bánh Waffle Kem Dâu Tây,🧇,Bánh waffle nướng nóng hổi giòn xốp kèm dâu tây tươi và viên kem lạnh,Cực kỳ ngọt ngào
Món Cơm & Gia Đình,Cơm Niêu Cá Kho Tộ Sốt Dẻo,🍲,Cơm đập cháy giòn rụm quẹt cá kho tộ đậm đà thơm mùi tiêu ớt,Cơm nhà ấm cúng
Món Cơm & Gia Đình,Cơm Tấm Sườn Bì Chả Trứng,🍛,Sườn nướng mật ong thơm phức miếng chả trứng béo ngậy mỡ hành tóp mỡ,Đặc sản Sài Gòn
Món Cơm & Gia Đình,Cơm Thố Xá Xíu Phô Mai Bò,🍚,Cơm thố nóng xèo xèo thịt xá xíu thơm lừng đậm vị sốt đặc biệt,Nóng hổi vừa thổi vừa ăn
Món Cơm & Gia Đình,Thịt Ba Chỉ Luộc Cà Pháo Mắm Tôm,🥓,Bữa cơm giản dị với cà giòn tan mắm tôm bọt trắng canh rau muống luộc,Mộc mạc ấm lòng`;

// App State
let dishesData = [];
let categoriesList = [];
let currentCategory = null;
let currentDish = null;
let isSpinning = false;
let soundEnabled = true;

// Couple info
let coupleNames = {
  p1: 'Gấu Đực',
  p2: 'Bé Mèo'
};

// Fun quotes
const COUPLE_QUOTES = [
  "Kèo này chốt hạ! Không được bảo 'ăn gì cũng được' nữa nhé! 🥰",
  "Người yêu duyệt món này chưa? Mau dắt công chúa đi ăn thui! 🛵💨",
  "Vòng quay định đoạt rồi, cấm cãi nha bạn ơi! 😋",
  "Ăn món này xong là hết dỗi nhau ngay! 💖",
  "Hôm nay bạn nam đèo, bạn nữ chọn topping nhé! 👩‍❤️‍👨",
  "Món này ngon nhức nách, không đi là tiếc hùi hụi! ✨"
];

// Color variations for CS:GO cute cards
const COLOR_CLASSES = ['color-pink', 'color-yellow', 'color-mint', 'color-purple', 'color-coral'];

// Web Audio API for CS:GO Ticks & Fanfare
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTick() {
    if (!soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch variation for CS:GO realistic click
      const freq = 1200 + Math.random() * 250;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.035);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {
      // Audio error catch
    }
  }

  playVictory() {
    if (!soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      const t = this.ctx.currentTime;

      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = t + i * 0.1;
        const noteEnd = noteStart + 0.35;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteEnd);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteEnd + 0.05);
      });
    } catch (e) {
      // Audio error catch
    }
  }
}

const sounds = new SoundManager();

// ==========================================
// CSV PARSING & DATA HANDLING
// ==========================================

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  // Parse header
  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  const catIdx = headers.indexOf('category');
  const nameIdx = headers.indexOf('name');
  const emojiIdx = headers.indexOf('emoji');
  const descIdx = headers.indexOf('description');
  const tagIdx = headers.indexOf('tag');

  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;
    const cols = parseCSVLine(rawLine);
    if (cols.length >= 2) {
      result.push({
        category: (cols[catIdx] || 'Món Ngon').trim(),
        name: (cols[nameIdx] || 'Món Ăn').trim(),
        emoji: (cols[emojiIdx] || '🍱').trim(),
        description: (cols[descIdx] || 'Món ăn siêu ngon dành cho đôi mình').trim(),
        tag: (cols[tagIdx] || 'Hấp dẫn').trim()
      });
    }
  }
  return result;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function dishesToCSV(dishes) {
  let csv = 'category,name,emoji,description,tag\n';
  dishes.forEach(d => {
    const cleanDesc = `"${d.description.replace(/"/g, '""')}"`;
    const cleanName = `"${d.name.replace(/"/g, '""')}"`;
    csv += `${d.category},${cleanName},${d.emoji},${cleanDesc},${d.tag}\n`;
  });
  return csv;
}

// Load dishes from local storage or file/default
async function loadDishesData() {
  const saved = localStorage.getItem('hom_nay_an_gi_dishes_v1');
  if (saved) {
    try {
      dishesData = JSON.parse(saved);
      refreshCategories();
      return;
    } catch (e) {
      console.warn('Error parsing localStorage dishes, fetching foods.csv');
    }
  }

  // Try to fetch foods.csv
  try {
    const response = await fetch('foods.csv');
    if (response.ok) {
      const text = await response.text();
      const parsed = parseCSV(text);
      if (parsed.length > 0) {
        dishesData = parsed;
        saveDishesToStorage();
        refreshCategories();
        return;
      }
    }
  } catch (err) {
    console.info('CORS or file protocol active, using embedded default dishes data.');
  }

  // Fallback to embedded data
  dishesData = parseCSV(DEFAULT_CSV_DATA);
  saveDishesToStorage();
  refreshCategories();
}

function saveDishesToStorage() {
  localStorage.setItem('hom_nay_an_gi_dishes_v1', JSON.stringify(dishesData));
  refreshCategories();
}

function refreshCategories() {
  const catMap = new Map();
  dishesData.forEach(d => {
    if (!catMap.has(d.category)) {
      catMap.set(d.category, {
        name: d.category,
        emoji: d.emoji || '🍽️',
        count: 0
      });
    }
    catMap.get(d.category).count++;
  });
  categoriesList = Array.from(catMap.values());
  updateUIBadges();
}

// ==========================================
// ROULETTE REEL RENDERING & ANIMATION (CS:GO)
// ==========================================

function getCardMetrics() {
  const isMobile = window.innerWidth <= 600;
  const cardWidth = isMobile ? 145 : 180;
  const cardGap = isMobile ? 10 : 14;
  return { cardWidth, cardGap, totalWidth: cardWidth + cardGap };
}

// Render initial visual preview track
function setupInitialRoulette(trackEl, items, isCategoryMode = false) {
  trackEl.innerHTML = '';
  trackEl.style.transition = 'none';
  trackEl.style.transform = 'translateX(0px)';

  if (!items || items.length === 0) return;

  // Render 15 repeating items to fill the view pleasantly
  const count = Math.max(15, items.length);
  for (let i = 0; i < count; i++) {
    const item = items[i % items.length];
    const cardEl = createCardElement(item, i, isCategoryMode);
    trackEl.appendChild(cardEl);
  }
}

function createCardElement(item, index, isCategoryMode = false) {
  const card = document.createElement('div');
  const colorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
  card.className = `item-card ${colorClass}`;
  
  const rarityText = isCategoryMode 
    ? `${item.count || 1} món ngon 🌸` 
    : (item.tag || 'Món Tủ ✨');
  
  const title = item.name;
  const emoji = item.emoji || '🍲';
  const subtitle = isCategoryMode ? 'Thể loại ẩm thực' : item.category;

  card.innerHTML = `
    <span class="card-rarity">${rarityText}</span>
    <div class="card-emoji-wrap">${emoji}</div>
    <div class="card-title" title="${title}">${title}</div>
    <span class="card-tag">${subtitle}</span>
    <div class="card-stripe"></div>
  `;
  return card;
}

/**
 * CS:GO Spin Engine
 * Generates an extended strip of items, picks the winner at WINNER_INDEX,
 * moves the track with custom CS:GO deceleration curve, tracks tick collision.
 */
function spinRoulette({
  viewportEl,
  trackEl,
  itemsPool,
  onComplete,
  isCategoryMode = false
}) {
  if (isSpinning || itemsPool.length === 0) return;
  isSpinning = true;

  sounds.init();

  // Reset track position
  trackEl.style.transition = 'none';
  trackEl.style.transform = 'translateX(0px)';
  void trackEl.offsetWidth; // Force reflow

  // Setup strip: 55 cards total, winner at index 45
  const TOTAL_CARDS = 55;
  const WINNER_INDEX = 45;

  // Pick predetermined winner
  const winnerIndexInPool = Math.floor(Math.random() * itemsPool.length);
  const winningItem = itemsPool[winnerIndexInPool];

  // Populate strip
  trackEl.innerHTML = '';
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let item;
    if (i === WINNER_INDEX) {
      item = winningItem;
    } else {
      // Pick random item from pool
      item = itemsPool[Math.floor(Math.random() * itemsPool.length)];
    }
    const cardEl = createCardElement(item, i, isCategoryMode);
    if (i === WINNER_INDEX) {
      cardEl.setAttribute('data-winner', 'true');
    }
    trackEl.appendChild(cardEl);
  }

  // Calculate target translation
  const { cardWidth, cardGap, totalWidth } = getCardMetrics();
  const viewportWidth = viewportEl.clientWidth;
  const centerNeedleX = viewportWidth / 2;

  // Jitter slightly so it doesn't always land dead on the center pixel (CS:GO feel)
  const maxJitter = (cardWidth * 0.5) - 10;
  const jitter = (Math.random() - 0.5) * (maxJitter * 2);

  // Exact target X coordinate
  const cardCenterX = (WINNER_INDEX * totalWidth) + 20 + (cardWidth / 2);
  const targetTranslateX = -(cardCenterX + jitter - centerNeedleX);

  // Duration: 5.4 seconds
  const spinDuration = 5400;

  // Real CS:GO deceleration bezier curve
  trackEl.style.transition = `transform ${spinDuration}ms cubic-bezier(0.12, 0.8, 0.15, 1.0)`;
  trackEl.style.transform = `translateX(${targetTranslateX}px)`;

  // Tick detection using requestAnimationFrame
  let lastCardIndex = -1;
  let animFrameId = null;
  const startTime = performance.now();

  function trackCollision() {
    const elapsed = performance.now() - startTime;
    if (elapsed < spinDuration) {
      // Get current position of track
      const trackRect = trackEl.getBoundingClientRect();
      const viewportRect = viewportEl.getBoundingClientRect();
      const needleViewportX = viewportRect.left + (viewportRect.width / 2);
      
      const currentScrollX = needleViewportX - trackRect.left - 20;
      const currentCardIndex = Math.floor(currentScrollX / totalWidth);

      if (currentCardIndex !== lastCardIndex && currentCardIndex >= 0 && currentCardIndex < TOTAL_CARDS) {
        lastCardIndex = currentCardIndex;
        sounds.playTick();
      }

      animFrameId = requestAnimationFrame(trackCollision);
    } else {
      cancelAnimationFrame(animFrameId);
    }
  }

  animFrameId = requestAnimationFrame(trackCollision);

  // When spin finishes
  setTimeout(() => {
    cancelAnimationFrame(animFrameId);
    isSpinning = false;

    // Highlight winner card
    const winnerCard = trackEl.querySelector('[data-winner="true"]');
    if (winnerCard) {
      winnerCard.style.transform = 'scale(1.05)';
      winnerCard.style.borderColor = '#FF3366';
      winnerCard.style.boxShadow = '0 0 25px rgba(255, 51, 102, 0.4)';
    }

    sounds.playVictory();
    if (onComplete) onComplete(winningItem);
  }, spinDuration + 150);
}

// ==========================================
// UI STAGES & EVENT CONTROLLERS
// ==========================================

const stage1Section = document.getElementById('stage1Section');
const stage2Section = document.getElementById('stage2Section');
const stepPill1 = document.getElementById('stepPill1');
const stepPill2 = document.getElementById('stepPill2');

const categoryTrack = document.getElementById('categoryTrack');
const categoryRoulette = document.getElementById('categoryRoulette');
const dishTrack = document.getElementById('dishTrack');
const dishRoulette = document.getElementById('dishRoulette');

const rollCategoryBtn = document.getElementById('rollCategoryBtn');
const rollDishBtn = document.getElementById('rollDishBtn');

// Modals
const categoryResultModal = document.getElementById('categoryResultModal');
const resultModal = document.getElementById('resultModal');
const manageModal = document.getElementById('manageModal');
const coupleNameModal = document.getElementById('coupleNameModal');

function initApp() {
  loadCoupleNames();
  setupEventListeners();
  loadDishesData().then(() => {
    setupInitialRoulette(categoryTrack, categoriesList, true);
    renderDishesManagementList();
  });
}

function setupEventListeners() {
  // Roll Stage 1: Category
  rollCategoryBtn.addEventListener('click', () => {
    if (isSpinning) return;
    rollCategoryBtn.disabled = true;

    spinRoulette({
      viewportEl: categoryRoulette,
      trackEl: categoryTrack,
      itemsPool: categoriesList,
      isCategoryMode: true,
      onComplete: (wonCategory) => {
        currentCategory = wonCategory;
        rollCategoryBtn.disabled = false;
        showCategoryWonModal(wonCategory);
      }
    });
  });

  // Category Won Modal Actions
  document.getElementById('proceedToStage2Btn').addEventListener('click', () => {
    hideModal(categoryResultModal);
    goToStage2();
  });

  document.getElementById('rerollCategoryBtn').addEventListener('click', () => {
    hideModal(categoryResultModal);
    rollCategoryBtn.click();
  });

  // Roll Stage 2: Dish
  rollDishBtn.addEventListener('click', () => {
    if (isSpinning || !currentCategory) return;
    rollDishBtn.disabled = true;

    const dishesInCategory = dishesData.filter(d => d.category === currentCategory.name);
    if (dishesInCategory.length === 0) {
      alert('Thể loại này chưa có món nào! Hãy vào phần quản lý để thêm nhé.');
      rollDishBtn.disabled = false;
      return;
    }

    spinRoulette({
      viewportEl: dishRoulette,
      trackEl: dishTrack,
      itemsPool: dishesInCategory,
      isCategoryMode: false,
      onComplete: (wonDish) => {
        currentDish = wonDish;
        rollDishBtn.disabled = false;
        showFinalDishModal(wonDish);
      }
    });
  });

  // Stage 2 Back to Stage 1
  document.getElementById('backToStage1Btn').addEventListener('click', () => {
    if (isSpinning) return;
    goToStage1();
  });

  // Result Modal actions
  document.getElementById('rerollDishBtn').addEventListener('click', () => {
    hideModal(resultModal);
    rollDishBtn.click();
  });

  document.getElementById('resetAllBtn').addEventListener('click', () => {
    hideModal(resultModal);
    goToStage1();
  });

  document.getElementById('acceptMealBtn').addEventListener('click', () => {
    if (currentDish) {
      saveMealHistory(currentDish);
      hideModal(resultModal);
      alert(`Đã chốt đơn "${currentDish.name}"! Chúc hai bạn có bữa ăn thật ngon miệng và lãng mạn nhé 💕`);
    }
  });

  // Sound Toggle
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    localStorage.setItem('hom_nay_an_gi_sound', soundEnabled ? '1' : '0');
  });
  if (localStorage.getItem('hom_nay_an_gi_sound') === '0') {
    soundEnabled = false;
    soundIcon.textContent = '🔇';
  }

  // Modals Open / Close
  document.getElementById('menuManageBtn').addEventListener('click', () => {
    openManageModal();
  });
  document.getElementById('closeManageBtn').addEventListener('click', () => {
    hideModal(manageModal);
  });

  document.getElementById('coupleBadgeBtn').addEventListener('click', () => {
    showModal(coupleNameModal);
  });
  document.getElementById('closeCoupleModalBtn').addEventListener('click', () => {
    hideModal(coupleNameModal);
  });

  // Couple Name Form
  document.getElementById('coupleNameForm').addEventListener('submit', (e) => {
    e.preventDefault();
    coupleNames.p1 = document.getElementById('name1Input').value.trim() || 'Gấu Đực';
    coupleNames.p2 = document.getElementById('name2Input').value.trim() || 'Bé Mèo';
    saveCoupleNames();
    hideModal(coupleNameModal);
  });

  // Manage Modal Tabs
  document.querySelectorAll('.modal-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.remove('hidden');

      if (tabId === 'tab-csv') {
        updateCSVPreview();
      }
    });
  });

  // Dishes Filter & Search
  document.getElementById('categoryFilter').addEventListener('change', renderDishesManagementList);
  document.getElementById('dishSearchInput').addEventListener('input', renderDishesManagementList);

  // Add Dish Form
  setupAddDishForm();

  // CSV Actions
  setupCSVActions();

  // Close modals on clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (!isSpinning) hideModal(modal);
      }
    });
  });

  // Window resize handler to maintain card visuals
  window.addEventListener('resize', () => {
    if (!isSpinning) {
      if (stage1Section.classList.contains('active')) {
        setupInitialRoulette(categoryTrack, categoriesList, true);
      } else if (currentCategory) {
        const dishesInCategory = dishesData.filter(d => d.category === currentCategory.name);
        setupInitialRoulette(dishTrack, dishesInCategory, false);
      }
    }
  });
}

// Stage Navigation
function goToStage1() {
  stage2Section.classList.remove('active');
  stage2Section.classList.add('hidden');
  stage1Section.classList.remove('hidden');
  stage1Section.classList.add('active');

  stepPill1.classList.add('active');
  stepPill1.classList.remove('completed');
  stepPill2.classList.remove('active');

  setupInitialRoulette(categoryTrack, categoriesList, true);
}

function goToStage2() {
  if (!currentCategory) return;

  stage1Section.classList.remove('active');
  stage1Section.classList.add('hidden');
  stage2Section.classList.remove('hidden');
  stage2Section.classList.add('active');

  stepPill1.classList.remove('active');
  stepPill1.classList.add('completed');
  stepPill2.classList.add('active');

  // Update Stage 2 titles
  document.getElementById('stage2CategoryEmoji').textContent = currentCategory.emoji || '🍽️';
  document.getElementById('stage2CategoryTitle').textContent = `Hòm ${currentCategory.name}`;

  // Populate Stage 2 Roulette with dishes of that category
  const dishesInCategory = dishesData.filter(d => d.category === currentCategory.name);
  setupInitialRoulette(dishTrack, dishesInCategory, false);
}

// Modal Displays
function showCategoryWonModal(category) {
  const dishesCount = dishesData.filter(d => d.category === category.name).length;
  document.getElementById('catWinEmoji').textContent = category.emoji || '🍽️';
  document.getElementById('catWinName').textContent = category.name;
  document.getElementById('catWinCount').textContent = `Đang có ${dishesCount} món siêu ngon đang chờ mở hòm...`;
  showModal(categoryResultModal);
}

function showFinalDishModal(dish) {
  document.getElementById('resultEmoji').textContent = dish.emoji || '🍲';
  document.getElementById('resultCategoryTag').textContent = dish.category;
  document.getElementById('resultDishName').textContent = dish.name;
  document.getElementById('resultDishDesc').textContent = dish.description;

  // Google Maps Search link
  const query = encodeURIComponent(`${dish.name} gần đây`);
  document.getElementById('findMapBtn').href = `https://www.google.com/maps/search/?api=1&query=${query}`;

  // Random cute couple quote
  const quote = COUPLE_QUOTES[Math.floor(Math.random() * COUPLE_QUOTES.length)];
  document.getElementById('coupleQuoteText').textContent = quote;

  // Trigger Confetti
  triggerConfetti();

  showModal(resultModal);
}

function showModal(modalEl) {
  modalEl.classList.remove('hidden');
}

function hideModal(modalEl) {
  modalEl.classList.add('hidden');
}

// Confetti Effect
function triggerConfetti() {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  const colors = ['#FF5E8E', '#FFB300', '#2EC4B6', '#9D4EDD', '#FF3366', '#FFEAA7'];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    piece.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    container.appendChild(piece);
  }
}

// Couple Names Management
function loadCoupleNames() {
  const saved = localStorage.getItem('hom_nay_an_gi_couple');
  if (saved) {
    try {
      coupleNames = JSON.parse(saved);
    } catch (e) {}
  }
  updateCoupleNamesUI();
}

function saveCoupleNames() {
  localStorage.setItem('hom_nay_an_gi_couple', JSON.stringify(coupleNames));
  updateCoupleNamesUI();
}

function updateCoupleNamesUI() {
  document.getElementById('coupleNamesDisplay').textContent = `${coupleNames.p1} & ${coupleNames.p2}`;
  document.getElementById('heroDialogue').textContent = `"${coupleNames.p2} ơi, hôm nay ăn gì cũng được..." 🥹👉👈`;
  document.getElementById('name1Input').value = coupleNames.p1;
  document.getElementById('name2Input').value = coupleNames.p2;
}

// Meal History
function saveMealHistory(dish) {
  const lastMealText = `${dish.name} (${dish.category}) ✨`;
  localStorage.setItem('hom_nay_an_gi_last_meal', lastMealText);
  document.getElementById('lastMealText').textContent = lastMealText;
}

const savedMeal = localStorage.getItem('hom_nay_an_gi_last_meal');
if (savedMeal) {
  document.getElementById('lastMealText').textContent = savedMeal;
}

// ==========================================
// DISHES & CSV MANAGEMENT TAB
// ==========================================

function openManageModal() {
  updateCategoryDropdowns();
  renderDishesManagementList();
  updateCSVPreview();
  showModal(manageModal);
}

function updateUIBadges() {
  const badge = document.getElementById('catCountBadge');
  if (badge) badge.textContent = `${categoriesList.length} Thể loại`;

  const totalCountEl = document.getElementById('totalDishesCount');
  if (totalCountEl) totalCountEl.textContent = dishesData.length;

  updateCategoryDropdowns();
}

function updateCategoryDropdowns() {
  const filterSelect = document.getElementById('categoryFilter');
  const addCategorySelect = document.getElementById('newDishCategory');

  if (!filterSelect || !addCategorySelect) return;

  const currentFilterVal = filterSelect.value;

  // Filter Select
  filterSelect.innerHTML = '<option value="all">Tất cả thể loại</option>';
  categoriesList.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = `${c.emoji} ${c.name} (${c.count})`;
    filterSelect.appendChild(opt);
  });
  filterSelect.value = currentFilterVal || 'all';

  // Add Select
  addCategorySelect.innerHTML = '';
  categoriesList.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = `${c.emoji} ${c.name}`;
    addCategorySelect.appendChild(opt);
  });
}

function renderDishesManagementList() {
  const container = document.getElementById('dishesListContainer');
  const catFilter = document.getElementById('categoryFilter').value;
  const keyword = document.getElementById('dishSearchInput').value.trim().toLowerCase();

  let filtered = dishesData;
  if (catFilter !== 'all') {
    filtered = filtered.filter(d => d.category === catFilter);
  }
  if (keyword) {
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(keyword) || 
      d.description.toLowerCase().includes(keyword) ||
      d.tag.toLowerCase().includes(keyword)
    );
  }

  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 30px;">Không tìm thấy món nào phù hợp 🥺</p>`;
    return;
  }

  filtered.forEach((dish, idx) => {
    const row = document.createElement('div');
    row.className = 'dish-row-item';
    row.innerHTML = `
      <div class="dish-row-left">
        <span class="dish-row-emoji">${dish.emoji || '🍲'}</span>
        <div class="dish-row-info">
          <h4>${dish.name} <span class="dish-row-cat">${dish.category}</span></h4>
          <p>${dish.description}</p>
        </div>
      </div>
      <button class="dish-delete-btn" title="Xóa món này" data-index="${idx}">🗑️</button>
    `;

    // Delete handler
    row.querySelector('.dish-delete-btn').addEventListener('click', () => {
      if (confirm(`Bạn có chắc muốn xóa món "${dish.name}" khỏi thực đơn không?`)) {
        const originalIndex = dishesData.indexOf(dish);
        if (originalIndex > -1) {
          dishesData.splice(originalIndex, 1);
          saveDishesToStorage();
          renderDishesManagementList();
          setupInitialRoulette(categoryTrack, categoriesList, true);
        }
      }
    });

    container.appendChild(row);
  });
}

function setupAddDishForm() {
  const form = document.getElementById('addDishForm');
  const toggleNewCategoryBtn = document.getElementById('toggleNewCategoryBtn');
  const newDishCategory = document.getElementById('newDishCategory');
  const newCategoryInput = document.getElementById('newCategoryInput');

  let isCustomCategoryMode = false;

  toggleNewCategoryBtn.addEventListener('click', () => {
    isCustomCategoryMode = !isCustomCategoryMode;
    if (isCustomCategoryMode) {
      newDishCategory.classList.add('hidden');
      newCategoryInput.classList.remove('hidden');
      newCategoryInput.required = true;
      toggleNewCategoryBtn.textContent = '📋 Chọn có sẵn';
      newCategoryInput.focus();
    } else {
      newDishCategory.classList.remove('hidden');
      newCategoryInput.classList.add('hidden');
      newCategoryInput.required = false;
      toggleNewCategoryBtn.textContent = '➕ Thể loại mới';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const categoryName = isCustomCategoryMode 
      ? newCategoryInput.value.trim() 
      : newDishCategory.value;
    const name = document.getElementById('newDishName').value.trim();
    const emoji = document.getElementById('newDishEmoji').value.trim() || '🍲';
    const description = document.getElementById('newDishDesc').value.trim() || 'Món ăn do hai bạn thêm vào';
    const tag = document.getElementById('newDishTag').value.trim() || 'Món mới';

    if (!categoryName || !name) return;

    dishesData.unshift({
      category: categoryName,
      name,
      emoji,
      description,
      tag
    });

    saveDishesToStorage();
    form.reset();
    document.getElementById('newDishEmoji').value = '🍲';

    // Switch back to select mode if was in custom mode
    if (isCustomCategoryMode) {
      toggleNewCategoryBtn.click();
    }

    alert(`Đã thêm món "${name}" vào ${categoryName}! ✨`);

    // Switch to list tab
    document.querySelector('.tab-btn[data-tab="tab-list"]').click();
    setupInitialRoulette(categoryTrack, categoriesList, true);
  });
}

function setupCSVActions() {
  // Reload CSV from file
  document.getElementById('reloadCsvBtn').addEventListener('click', async () => {
    try {
      const res = await fetch('foods.csv?t=' + Date.now());
      if (res.ok) {
        const text = await res.text();
        const parsed = parseCSV(text);
        if (parsed.length > 0) {
          dishesData = parsed;
          saveDishesToStorage();
          updateCSVPreview();
          renderDishesManagementList();
          setupInitialRoulette(categoryTrack, categoriesList, true);
          alert('Đã tải lại dữ liệu mới nhất từ foods.csv! 🎉');
          return;
        }
      }
    } catch (e) {}
    alert('Không thể kết nối trực tiếp đến foods.csv (có thể do mở file trực tiếp). Hãy dùng nút "Tải File CSV Mới Lên" nhé!');
  });

  // Export CSV
  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    const csvContent = dishesToCSV(dishesData);
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' }); // UTF-8 BOM
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'foods.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Import CSV
  document.getElementById('importCsvInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const parsed = parseCSV(text);
      if (parsed.length > 0) {
        dishesData = parsed;
        saveDishesToStorage();
        updateCSVPreview();
        renderDishesManagementList();
        setupInitialRoulette(categoryTrack, categoriesList, true);
        alert(`Đã tải thành công ${parsed.length} món ăn từ file CSV! 🎉`);
      } else {
        alert('File CSV không đúng định dạng hoặc không có dữ liệu hợp lệ.');
      }
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  });

  // Reset to default
  document.getElementById('resetDefaultBtn').addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn khôi phục toàn bộ danh sách món ăn về mặc định gốc ban đầu không?')) {
      dishesData = parseCSV(DEFAULT_CSV_DATA);
      saveDishesToStorage();
      updateCSVPreview();
      renderDishesManagementList();
      setupInitialRoulette(categoryTrack, categoriesList, true);
      alert('Đã khôi phục thực đơn gốc mặc định! ✨');
    }
  });
}

function updateCSVPreview() {
  const previewArea = document.getElementById('csvPreviewArea');
  if (previewArea) {
    previewArea.value = dishesToCSV(dishesData);
  }
}

// Start app on DOM ready
document.addEventListener('DOMContentLoaded', initApp);