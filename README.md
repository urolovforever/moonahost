# 🌙 MoonGift - Lazer Yog'och Ishlov Berish Do'koni

Full-stack web application for a laser wood processing shop with Django REST Framework backend and React frontend.

---

## 📋 Talablar

### Backend
- Python 3.9+
- pip
- virtualenv

### Frontend
- Node.js 16+
- npm yoki yarn

---

## 🚀 Tezkor Ishga Tushirish

### 1️⃣ Loyihani Yuklab Olish

Birinchi qadam - barcha fayllarni yaratish uchun setup scriptni ishga tushiring:

```bash
# Setup scriptni yuklab oling va ishga tushiring
chmod +x full_setup_script.sh
./full_setup_script.sh
```

---

## 🔧 Backend Sozlash

### 1. Virtual Environmentni Yaratish

```bash
cd moongift/backend
python -m venv venv

# Linux/Mac
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 2. Kerakli Paketlarni O'rnatish

```bash
pip install -r requirements.txt
```

### 3. Ma'lumotlar Bazasini Sozlash

```bash
# Migrationlarni yaratish
python manage.py makemigrations
python manage.py migrate

# Superuser yaratish (admin panel uchun)
python manage.py createsuperuser
# Username: admin
# Email: admin@moongift.uz
# Password: (o'zingizni parolingizni kiriting)
```

### 4. Backend Serverini Ishga Tushirish

```bash
python manage.py runserver
```

✅ Backend endi **http://localhost:8000** da ishlaydi!

#### API Endpoints:
- `GET /api/products/` - Barcha mahsulotlar (filter, search, ordering)
- `GET /api/products/featured/` - Mashhur mahsulotlar
- `GET /api/products/{slug}/` - Bitta mahsulot
- `GET /api/categories/` - Kategoriyalar
- `POST /api/contact/` - Murojat yuborish

#### Admin Panel:
- URL: **http://localhost:8000/admin**
- Login: `admin` (yaratgan superuser)

---

## 🎨 Frontend Sozlash

**Yangi terminal oynasini oching** (backend ishlayotgan bo'lishi kerak!)

### 1. Frontend Papkasiga O'tish

```bash
cd moongift/frontend
```

### 2. Kerakli Paketlarni O'rnatish

```bash
npm install
```

### 3. Frontend Serverini Ishga Tushirish

```bash
npm run dev
```

✅ Frontend endi **http://localhost:5173** da ishlaydi!

---

## 📝 Loyihaning Tuzilishi

```
moongift/
├── backend/
│   ├── core/                    # Django asosiy sozlamalar
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── products/                # Mahsulotlar app
│   │   ├── models.py           # Category, Product modellari
│   │   ├── serializers.py      # API serializers
│   │   ├── views.py            # API views
│   │   ├── urls.py
│   │   └── admin.py
│   ├── contact/                 # Murojatlar app
│   │   ├── models.py           # ContactMessage modeli
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── admin.py
│   ├── media/                   # Rasm fayllari
│   ├── requirements.txt
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js          # Axios API konfiguratsiyasi
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── CategoryFilter.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   └── NotFound.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

---

## 👨‍💼 Admin Panel Ishlatish

### Admin Panel Turlari

**1. Django Admin (Backend):**
- URL: http://localhost:8000/admin
- Login: `admin` / `admin123` (default)
- To'liq CRUD funksiyalari

**2. Custom Admin Panel (Frontend - Yangi!):**
- URL: http://localhost:5173/admin/login
- Login: `admin` / `admin123` (default)
- Zamonaviy interfeys
- Mahsulotlarni tahrirlash va o'chirish

### 1. Admin Panelga Kirish

**Custom Admin Panel:**
1. Brauzerda `http://localhost:5173/admin/login` ga o'ting
2. Login: `admin`
3. Parol: `admin123`
4. "Kirish" tugmasini bosing

### 2. Mahsulotlarni Boshqarish

**Mahsulotni Tahrirlash:**
1. Admin dashboard'da mahsulotlar jadvalini ko'rasiz
2. Kerakli mahsulot qatorida "Tahrirlash" tugmasini bosing
3. Modal oynada barcha maydonlarni o'zgartiring:
   - Mahsulot nomi
   - Kategoriya
   - Tavsif
   - Narx (so'm)
   - Chegirma foizi (0-100%)
   - Uzum link
   - Yandex Market link
   - Rasmlar (3 tagacha)
   - Mashhur mahsulot belgisi
   - Faol/Nofaol holati
4. "Saqlash" tugmasini bosing

**Mahsulotni O'chirish:**
1. Mahsulot qatorida "O'chirish" tugmasini bosing
2. Tasdiqlash dialogida "O'chirish" ni bosing
3. Mahsulot darhol o'chiriladi

### 3. Django Admin'da Mahsulot Qo'shish
1. `http://localhost:8000/admin` ga o'ting
2. **Mahsulotlar** bo'limini oching
3. "Add Product" tugmasini bosing
4. Barcha maydonlarni to'ldiring va "Save" bosing

---

## 🎯 Frontend Sahifalar

| Sahifa | URL | Tavsif |
|--------|-----|--------|
| Bosh sahifa | `/` | Hero section, mashhur mahsulotlar |
| Mahsulotlar | `/products` | Barcha mahsulotlar, filter, qidiruv |
| Mahsulot tafsiloti | `/products/:slug` | To'liq ma'lumot, o'xshash mahsulotlar |
| Biz haqimizda | `/about` | Kompaniya haqida ma'lumot |
| Bog'lanish | `/contact` | Kontakt forma |

---

## 🔌 API Misollari

### Barcha mahsulotlarni olish
```bash
curl http://localhost:8000/api/products/
```

### Kategoriya bo'yicha filter
```bash
curl "http://localhost:8000/api/products/?category=stol-bezaklari"
```

### Qidiruv
```bash
curl "http://localhost:8000/api/products/?search=choy"
```

### Murojat yuborish
```bash
curl -X POST http://localhost:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ali Valiyev",
    "email": "ali@example.com",
    "phone": "+998901234567",
    "message": "Sizning mahsulotlaringiz juda yoqimli!"
  }'
```

---

## 🎨 Dizayn

- **Rang palitrasi:**
  - Primary (Ko'k): #2C5BA5
  - Accent (Qizil): #DC3545
  - Gold (Oltin): #DAA520
  - Surface ranglar va soft shadows
- **Font:** System fonts (optimizatsiya uchun)
- **UI Framework:** TailwindCSS
- **Responsive:** Mobil, Planshet, Desktop
- **Features:**
  - Logo support (navbar va footer)
  - Hero background image
  - Discount badges
  - Cart icons on marketplace buttons
  - Mobile-first design
  - Back navigation button

---

## 🐞 Muammolarni Hal Qilish

### Backend ishlamayapti?
```bash
# Virtual environmentni tekshiring
which python  # venv ichida python ko'rsatilishi kerak

# Paketlar o'rnatilganmi?
pip list

# Migrationlar amalga oshirilganmi?
python manage.py showmigrations
```

### Frontend ishlamayapti?
```bash
# Node.js versiyasini tekshiring
node -v  # 16+ bo'lishi kerak

# Paketlarni qayta o'rnatish
rm -rf node_modules package-lock.json
npm install

# Backendni tekshiring
curl http://localhost:8000/api/products/
```

### Rasmlar ko'rinmayapti?
1. `backend/media/products/` papkasi mavjudligini tekshiring
2. Django `MEDIA_ROOT` sozlamalarini tekshiring
3. Vite proxy sozlamalarini tekshiring

---

## 📦 Production Deploy

### aHost Shared Hosting (moongift.uz)

Bu loyiha aHost shared hosting uchun tayyorlangan.

**To'liq deployment qo'llanma**: [DEPLOYMENT.md](./DEPLOYMENT.md)

#### Qisqa ko'rsatma:

**Backend** (Django + PostgreSQL):
- Backend fayllarni `public_html/api/` ga yuklang
- PostgreSQL database yarating (cPanel yoki support orqali)
- `.env` faylni sozlang
- Virtual environment o'rnating va dependencies install qiling

**Frontend** (React + Vite):
- `npm run build` bajaring
- `dist/` papka ichidagi fayllarni `public_html/` ga yuklang
- `.htaccess` faylni ko'chirib qo'ying (React routing uchun)

**Domain**: moongift.uz
**Database**: PostgreSQL (aHost taqdim etadi, yoki SQLite)
**SSL**: Let's Encrypt (cPanel orqali)

---

## 📞 Yordam

Muammoga duch kelsangiz:
1. Django errorlarni `manage.py runserver` outputida ko'ring
2. Browser console'ni tekshiring (F12)
3. Network tabni tekshiring (API so'rovlar)

---

## 🎉 Tayyor!

Endi sizda to'liq ishlaydigan MoonGift loyihasi bor!

1. ✅ Backend API ishga tushdi
2. ✅ Frontend UI ishlayapti
3. ✅ Admin panel orqali mahsulot qo'shishingiz mumkin
4. ✅ Uzum Market'ga havola qilishingiz mumkin

**Omad tilaymiz! 🌙**