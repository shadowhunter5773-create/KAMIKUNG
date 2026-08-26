/* ============================================================
   CONFIGURATION FILE
   แก้ไขข้อมูลทั้งหมดของเว็บไซต์ได้จากไฟล์นี้ไฟล์เดียว
   ไม่ต้องแตะ HTML / CSS / JS ไฟล์อื่นเลย
   ============================================================ */

const SITE_CONFIG = {

  /* -------------------- BRAND / NAVBAR -------------------- */
  brand: {
    name: "KAMIKUNG",                    // โลโก้มุมซ้ายบน
    navLinks: [
      { label: "Profile", href: "#profile" },
      { label: "Server",  href: "#discord" },
      { label: "Social",  href: "#social" },
      { label: "About",   href: "#about" }
    ]
  },

  /* -------------------- PROFILE -------------------- */
  profile: {
    username: "KAMIKUNG",
    avatar: "https://i.ibb.co/DPx8GHVd/image.jpg",  // ใส่ path รูปโปรไฟล์ของคุณ (วางไฟล์ที่ assets/images/)
    rankBadge: "KING",             // ป้ายยศ/แรงค์ข้างชื่อ (ว่างได้ = "")
    verified: true,
    statusLine: "BIRTHDAY TO KAMIKUNG",       // ข้อความสถานะพร้อมลูกศร »
    joinDate: "03/05/2007",
    online: true,
    decorativeText: "サイバー",         // ตัวอักษรแนวตั้งข้างกรอบรูป (ตกแต่งอย่างเดียว)
    stats: {
      views: 590,                     // ค่าเริ่มต้น — จะถูกบวกเพิ่มอัตโนมัติทุกครั้งที่มีคนเปิดหน้า (เก็บผ่าน localStorage)
      followers: 1610,
      following: 27
    }
  },

  /* -------------------- BACKGROUND -------------------- */
  background: {
    videoSrc: "https://www.image2url.com/r2/default/videos/1786684195970-6b1125bb-f5e3-45ba-808b-c9b8658d4017.mp4", // ใส่ path วิดีโอ .mp4 ของคุณ (วางไฟล์ที่ assets/video/)
    fallbackImage: "assets/images/fallback-bg.svg",
    overlayOpacity: 0.6
  },

  /* -------------------- DISCORD -------------------- */
  discord: {
    profile: {
      username: "KAMIKUNG",
      avatar: "https://i.ibb.co/KjwFv0F4/db9c1cad-20d3-44a6-8516-f46c63cf0c60.jpg",
      badgeLabel: "PEAM",              // ป้ายเล็กข้างชื่อ
      status: "online",                // online | idle | dnd | offline
      customStatus: "จบแล้ว"           // ข้อความสถานะบรรทัดล่าง
    },
    server: {
      name: "KAMIKUNG FOFICIAL SERVER",
      icon: "https://i.ibb.co/N6B2VvGz/20260502-184522.jpg",
      badgeLabel: "SERVER",
      memberCount: 121,
      onlineCount: 36,
      inviteUrl: "https://discord.gg/hnu7GVUR9x"
    }
  },

  /* -------------------- SOCIAL LINKS -------------------- */
  /* ทุกช่องใช้ "รูปภาพ" แสดงแทนไอคอน/ตัวหนังสือ
     ใส่ path/URL รูปโลโก้ของแพลตฟอร์มนั้นๆ ที่ image: "..."
     (ค่าเริ่มต้นด้านล่างดึงโลโก้จาก simpleicons.org แบบสีขาว ใช้งานได้ทันที
     ถ้าอยากใช้รูปของตัวเอง ให้แทนที่ path เป็นไฟล์ใน assets/images/ ได้เลย) */
  socials: [
    { platform: "Roblox",    image: "https://cdn.simpleicons.org/roblox/ffffff",    url: "https://www.roblox.com/share?code=cdab7a2d91dbfe44aa7d75c635626f86&type=Profile&source=ProfileShare&stamp=1786295129855" },
    { platform: "Instagram", image: "https://cdn.simpleicons.org/instagram/ffffff", url: "https://www.instagram.com/pimakornsk/" },
    { platform: "Discord",   image: "https://cdn.simpleicons.org/discord/ffffff",   url: "https://discord.gg/hnu7GVUR9x" },
    { platform: "Facebook",  image: "https://cdn.simpleicons.org/facebook/ffffff",  url: "https://www.facebook.com/share/19Jyp9mg3p/" },
    { platform: "TikTok",    image: "https://cdn.simpleicons.org/tiktok/ffffff",    url: "https://www.tiktok.com/@kami.kung?_r=1&_t=ZS-98jU7xuWtkX" },
    { platform: "HIWDO",     image: "https://cdn.simpleicons.org/paypal/ffffff", url: "https://hiwdo.com/kamikung" },
    { platform: "ENDEXSHOP",     image: "https://cdn.simpleicons.org/shopify/ffffff", url: "https://endexshop.xezw.xyz/categories/fpbknE0HON9f" }
  ],

  /* -------------------- MUSIC PLAYLIST -------------------- */
  playlist: [
    {
      title: "RUN IT BACK",
      artist: "LOVE",
      cover: "https://i.ibb.co/CKZHppsW/2026-08-09-235638.png",
      src: "https://www.image2url.com/r2/default/audio/1786294901446-6b98e4c4-9ec2-4a5e-9733-c3d4dfa8e7a9.mp3"
    },
  ],

  /* -------------------- FOOTER -------------------- */
  footer: {
    copyright: "© 2024 KAMIKUNG. All rights reserved.",
    tagline: "ไลฟ์สดตามใจฉัน — ไม่ต้องรอใครอนุมัติ",
  },

  /* -------------------- VIEW COUNTER -------------------- */
  viewCounter: {
    storageKey: "kamikung_profile_views"
  }

};
