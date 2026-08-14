# BOVIZZ — Cyberpunk HUD Profile Page

เว็บ Personal Profile / Bio Page สไตล์ Cyberpunk HUD (ตามภาพอ้างอิงของผู้ใช้)
พร้อมใช้งานทันที เปิดด้วย VS Code + Live Server ได้เลย

## โครงสร้างไฟล์

```
profile-page/
├── index.html          ← โครงสร้างหน้าเว็บ
├── style.css            ← ดีไซน์ทั้งหมด (สี ฟอนต์ อนิเมชัน responsive)
├── script.js             ← ลอจิกทั้งหมด (โหลดข้อมูลจาก config.js มาแสดงผล)
├── config.js  ⭐         ← แก้ตรงนี้ที่เดียว! ทุกข้อความ/ลิงก์/รูปของเว็บ
└── assets/
    ├── images/          ← รูปโปรไฟล์ / avatar / ปกอัลบั้ม / ภาพพื้นหลังสำรอง
    ├── video/           ← วิดีโอพื้นหลัง (.mp4)
    └── music/           ← ไฟล์เพลง (.mp3)
```

## วิธีเริ่มใช้งาน

1. เปิดโฟลเดอร์นี้ใน VS Code
2. ติดตั้ง extension **Live Server**
3. คลิกขวาที่ `index.html` → **Open with Live Server**

## วิธีแก้ไขข้อมูล — เปิดไฟล์ `config.js` เท่านั้น

| ต้องการแก้ | แก้ตรงไหนใน config.js |
|---|---|
| โลโก้/เมนู navbar | `brand: { name, navLinks }` |
| ชื่อ, rank badge, bio, วันที่เข้าร่วม, สถิติ (views/followers/following) | `profile: { ... }` |
| วิดีโอ/ภาพพื้นหลัง | `background: { videoSrc, fallbackImage }` |
| Discord โปรไฟล์และเซิร์ฟเวอร์ | `discord: { ... }` |
| ลิงก์โซเชียล | `socials: [ ... ]` — ชื่อไอคอนจาก [lucide.dev](https://lucide.dev/icons) |
| เพลย์ลิสต์เพลง | `playlist: [ ... ]` |
| ข้อความ footer | `footer: { ... }` |

**ไม่ต้องแตะไฟล์ HTML / CSS / JS อื่นเลย** ทุกอย่างอ่านค่าจาก `config.js` แบบไดนามิก

## ดีไซน์ที่ทำตามภาพอ้างอิง

- **Navbar** ลอยด้านบนแบบ glass, มีนาฬิกาเวลาจริง (auto-update), สถานะออนไลน์, เมนูมือถือแบบ hamburger
- **HUD cut-corner panels**: ทุกการ์ดตัดมุมด้วย `clip-path` แบบ sci-fi terminal พร้อมเส้น corner-tick เรืองแสงที่การ์ดโปรไฟล์
- **Avatar frame**: วงแหวนไล่สีหมุน + ตัวอักษรแนวตั้งตกแต่ง + dot-grid มุมบน
- **Stats row**: Total Views (นับจริงผ่าน localStorage เพิ่มทุกครั้งที่เปิดหน้า) / Followers / Following
- **Discord**: แยก 2 การ์ดตามภาพ — โปรไฟล์ผู้ใช้ (ปุ่ม Open Discord) และเซิร์ฟเวอร์ (ปุ่ม Join Server)
- **Connect grid**: กรอบไอคอนตัดมุมพร้อม label ใต้ไอคอนตลอดเวลา
- **Music player**: ปุ่ม shuffle/repeat/prev/play/next + volume + progress bar, มี "notch" ปุ่มลูกศรตกแต่งด้านล่าง, บันทึกเพลง/โหมดล่าสุดด้วย localStorage
- **ฟอนต์**: Permanent Marker (โลโก้/ชื่อผู้ใช้ สไตล์ brush เหมือนภาพ), Orbitron (label เทคนิค), Rajdhani (หัวข้อ), Inter (เนื้อหา)
- **Responsive**: navbar ยุบเป็นเมนูมือถือ, การ์ดโปรไฟล์/Discord จัดเรียงใหม่เป็นแนวตั้ง, connect grid ปรับเป็น 4 คอลัมน์บนจอเล็ก

## หมายเหตุเรื่องรูป/วิดีโอ/เสียงตัวอย่าง

ไฟล์ `.svg` ใน `assets/images/` เป็น placeholder สีไล่เฉด (โทนม่วง) ให้หน้าเว็บแสดงผลได้ทันที
แนะนำให้แทนที่ด้วยรูปจริงของคุณ และวางวิดีโอพื้นหลังจริงไว้ที่ `assets/video/background.mp4`
ไฟล์เพลงใน `playlist` ยังไม่มีไฟล์ `.mp3` จริงแนบมาให้ — วางไฟล์เพลงของคุณไว้ที่ `assets/music/` แล้วแก้ path ใน `config.js`

## เพลย์เลิสต์ mp3 + วิดเจ็ตเพลงวงกลม (อัปเดตล่าสุด)

หน้าเว็บเปลี่ยนจาก music player แบบแถบยาวด้านล่าง มาเป็น **วิดเจ็ตเพลงวงกลมลอยมุมซ้ายล่าง** แทน:

- แผ่นเสียงวงกลมหมุนตามจังหวะเพลง พร้อมคลื่นเสียง (equalizer) เต้นที่ขอบล่างตอนกำลังเล่น
- เพลงเล่นอัตโนมัติและ **วนเล่นทั้งเพลย์ลิสต์ไปเรื่อย ๆ ไม่มีวันหยุด** (เพลงจบ → เล่นเพลงถัดไปเอง วนกลับเพลงแรกเมื่อจบเพลงสุดท้าย)
- คลิกที่วงกลม เพื่อเปิด/ปิดกล่องควบคุมเพลง (ปก, ชื่อเพลง, progress bar, ปุ่มย้อน/เล่น-หยุด/ถัดไป, ปรับเสียง)
- เพลงทั้งหมดอ่านจากไฟล์ `.mp3` ในเครื่อง (`assets/music/`) ตาม `playlist` ใน `config.js` — **ไม่ใช้ลิงก์จากเว็บนอกแล้ว** วางไฟล์เพลงของคุณไว้ที่โฟลเดอร์นี้แล้วแก้ path ให้ตรงชื่อไฟล์
