# MoonGift - aHost Shared Hosting'ga Deploy Qilish

## aHost shared hosting (moongift.uz) uchun deployment qo'llanma

### 1. Tayyorgarlik

Loyiha aHost shared hosting uchun tayyorlangan:
- **Backend**: Django (Python 3.9+)
- **Frontend**: React + Vite (Static build)
- **Database**: PostgreSQL (aHost tomonidan taqdim etiladi)
- **Hosting**: 500 MB shared hosting
- **Domain**: moongift.uz

### 2. Backend Deployment (Django)

#### 2.1. Hosting'da kerakli kataloglar yaratish

cPanel File Manager orqali:
```
public_html/
├── api/                    # Backend fayllar bu yerga
│   ├── manage.py
│   ├── requirements.txt
│   ├── core/
│   ├── products/
│   ├── contact/
│   └── ...
├── index.html              # Frontend build fayllar (dist papkadan)
├── assets/                 # Frontend assets
├── .htaccess               # Frontend routing uchun
└── ...
```

#### 2.2. Backend fayllarni yuklash

1. **Backend papkasini ZIP qiling** (local kompyuterda):
```bash
cd backend
zip -r backend.zip . -x "*.pyc" -x "__pycache__/*" -x "db.sqlite3" -x "staticfiles/*"
```

2. **cPanel File Manager orqali yuklash**:
   - cPanel → File Manager
   - `public_html/api/` papkaga o'ting
   - Backend.zip faylni yuklang
   - ZIP faylni extract qiling
   - ZIP faylni o'chirib tashlang

#### 2.3. PostgreSQL Database yaratish

1. **cPanel → PostgreSQL Databases** (yoki support'dan so'rang):
   - Database name: `moongift_db` (yoki boshqa nom)
   - Database user: `moongift_user`
   - Password: kuchli parol yarating
   - User'ni database'ga qo'shing (All Privileges)

2. **Database ma'lumotlarini yozib qo'ying**:
   ```
   DB Name: username_moongift_db
   DB User: username_moongift_user
   DB Password: your_password
   DB Host: localhost
   DB Port: 5432
   ```

**MUHIM**: Agar aHost PostgreSQL qo'llab-quvvatlamasa:
- SQLite ishlatishingiz mumkin (development uchun yetarli)
- Yoki support'dan PostgreSQL yoqishni so'rang
- Yoki VPS/Cloud hosting'ga o'tishni o'ylab ko'ring

#### 2.4. Backend .env faylni sozlash

cPanel File Manager'da `public_html/api/.env` fayl yarating:

```bash
# Django Settings
SECRET_KEY=your-very-secret-key-here-change-this
DEBUG=False
ALLOWED_HOSTS=moongift.uz,www.moongift.uz,api.moongift.uz

# Database - PostgreSQL
DATABASE_URL=postgresql://username_moongift_user:your_password@localhost:5432/username_moongift_db

# CORS Settings
CORS_ALLOWED_ORIGINS=https://moongift.uz,https://www.moongift.uz

# Telegram Bot Settings (media fayllar uchun)
TELEGRAM_BOT_TOKEN=8586781954:AAHfm5_GIaJekEeZNiE_YbL1HLBXyrbtx7I
TELEGRAM_CHAT_ID=1920079641
```

**MUHIM**:
- `SECRET_KEY` ni o'zgartiring! Random string ishlatish kerak.
- Database ma'lumotlarini to'g'ri kiriting (cPanel'dagi username prefix bilan)

#### 2.5. Python Environment va Dependencies

**Agar SSH access bo'lsa** (Terminal orqali):

```bash
# Virtual environment yaratish
cd ~/public_html/api
python3 -m venv venv
source venv/bin/activate

# Dependencies o'rnatish
pip install -r requirements.txt

# Database migration
python manage.py migrate

# Static files to'plash
python manage.py collectstatic --no-input

# Superuser yaratish
python manage.py createsuperuser
```

**Agar SSH yo'q bo'lsa**, aHost support'dan:
- Python virtualenv yaratishni
- Dependencies o'rnatishni
- Django migration'larni ishga tushirishni so'rang

#### 2.6. WSGI konfiguratsiyasi (.htaccess)

`public_html/api/.htaccess` fayl yarating:

```apache
RewriteEngine On
RewriteBase /api/
RewriteRule ^$ core/wsgi.py [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ core/wsgi.py/$1 [L]
```

**Yoki Passenger konfiguratsiyasi** (agar aHost Passenger qo'llab-quvvatlasa):

`public_html/api/passenger_wsgi.py` yarating:
```python
import os
import sys

# Add your project directory to the sys.path
project_home = '/home/username/public_html/api'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Activate virtual environment
activate_this = os.path.join(project_home, 'venv/bin/activate_this.py')
exec(open(activate_this).read(), dict(__file__=activate_this))

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### 3. Frontend Deployment (React)

#### 3.1. Production build yaratish (local kompyuterda)

```bash
cd frontend

# .env faylni yaratish
echo "VITE_API_URL=https://moongift.uz/api" > .env

# Dependencies o'rnatish (agar kerak bo'lsa)
npm install

# Production build
npm run build
```

Bu `frontend/dist/` papkasini yaratadi.

#### 3.2. Frontend fayllarni yuklash

1. **dist papkasidagi barcha fayllarni ZIP qiling**:
```bash
cd frontend/dist
zip -r frontend.zip .
```

2. **cPanel File Manager orqali yuklash**:
   - `public_html/` ga o'ting
   - `frontend.zip` ni yuklang
   - Extract qiling
   - ZIP faylni o'chirib tashlang

3. **.htaccess faylini ko'chirish**:
   - `frontend/.htaccess` faylini `public_html/` ga ko'chirib qo'ying
   - Bu React routing'ni to'g'ri ishlashini ta'minlaydi

#### 3.3. .htaccess tekshirish

`public_html/.htaccess` fayl ichida:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # React Router uchun - barcha so'rovlarni index.html ga yo'naltirish
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

### 4. Domain sozlamalari

#### 4.1. Subdomain yaratish (ixtiyoriy)

Agar `api.moongift.uz` subdomain'ini yaratmoqchi bo'lsangiz:

1. **cPanel → Subdomains**
2. Subdomain: `api`
3. Document Root: `/public_html/api`
4. Create

Keyin frontend `.env` ni yangilang:
```
VITE_API_URL=https://api.moongift.uz
```

#### 4.2. SSL sertifikat

1. **cPanel → SSL/TLS**
2. Let's Encrypt bepul SSL o'rnatish
3. Barcha domenlar uchun SSL enable qiling:
   - moongift.uz
   - www.moongift.uz
   - api.moongift.uz (agar yaratgan bo'lsangiz)

### 5. Admin Panel

#### 5.1. Superuser yaratish

SSH orqali:
```bash
cd ~/public_html/api
source venv/bin/activate
python manage.py createsuperuser
```

Yoki cPanel Shell/Terminal'dan (agar mavjud bo'lsa)

#### 5.2. Admin URL'lar

- **Django Admin**: `https://moongift.uz/api/admin/`
- **API Endpoints**: `https://moongift.uz/api/`

### 6. Muammolarni hal qilish

#### Backend ishlamasa:

1. **Error log'larni tekshirish**:
   - cPanel → Error Log
   - `~/public_html/api/error.log` faylni ko'ring

2. **Database ulanish xatosi**:
   - `.env` faylda database ma'lumotlari to'g'riligini tekshiring
   - Database user'ga to'liq huquq berilganligini tasdiqlang

3. **Permission xatolari**:
```bash
chmod 644 .env
chmod 755 ~/public_html/api
```

4. **500 Internal Server Error**:
   - DEBUG=True qilib vaqtinchalik xatoni ko'ring
   - Keyin DEBUG=False ga qaytaring

#### Frontend ishlamasa:

1. **API bilan bog'lanish muammosi**:
   - Browser console'ni oching (F12)
   - CORS xatolarini tekshiring
   - Backend `.env` da `CORS_ALLOWED_ORIGINS` to'g'riligini tasdiqlang

2. **React routing ishlamasa**:
   - `.htaccess` fayl mavjudligini tekshiring
   - `mod_rewrite` yoqilganligini tasdiqlang

3. **Static fayllar yuklanmasa**:
   - `frontend/dist/assets/` papka to'g'ri ko'chirilganligini tekshiring
   - File permissions'ni tekshiring: `chmod 644` barcha fayllarga

### 7. Yangilash (Update) jarayoni

#### Backend yangilash:

1. Git'dan pull qiling (local'da)
2. Backend papkani ZIP qiling
3. cPanel'ga yuklang va extract qiling
4. SSH orqali migration bajaring:
```bash
source venv/bin/activate
python manage.py migrate
python manage.py collectstatic --no-input
```

#### Frontend yangilash:

1. Git'dan pull qiling (local'da)
2. `npm run build` bajaring
3. `dist/` papkani ZIP qilib cPanel'ga yuklang
4. Extract qiling

### 8. Sayt tezligini oshirish

1. **Gzip compression**: .htaccess'da allaqachon sozlangan
2. **Browser caching**: .htaccess'da allaqachon sozlangan
3. **CDN**: Cloudflare bepul CDN ishlatishingiz mumkin
4. **Image optimization**: Telegram storage ishlatish (backend allaqachon sozlangan)

### 9. Backup

1. **Database backup**:
   - cPanel → phpMyAdmin → Export

2. **Files backup**:
   - cPanel → Backup → Download a Home Directory Backup

**Tavsiya**: Haftasiga bir marta backup oling!

---

## Checkliste (Tekshirish ro'yxati)

### Backend:
- [ ] Backend fayllar `public_html/api/` ga yuklangan
- [ ] PostgreSQL database yaratilgan (yoki SQLite ishlatiladi)
- [ ] .env fayl sozlangan (SECRET_KEY, DATABASE_URL, ALLOWED_HOSTS)
- [ ] Virtual environment yaratilgan
- [ ] Dependencies o'rnatilgan (`pip install -r requirements.txt`)
- [ ] Migration bajarilgan (`python manage.py migrate`)
- [ ] Static files to'plangan (`python manage.py collectstatic`)
- [ ] Superuser yaratilgan
- [ ] WSGI/Passenger sozlangan

### Frontend:
- [ ] Production build yaratilgan (`npm run build`)
- [ ] .env fayl sozlangan (VITE_API_URL)
- [ ] `dist/` papka `public_html/` ga yuklangan
- [ ] .htaccess fayl ko'chirilgan
- [ ] SSL sertifikat o'rnatilgan

### Testing:
- [ ] Frontend ochiladi: https://moongift.uz
- [ ] API ishlaydi: https://moongift.uz/api/
- [ ] Admin panel ochiladi: https://moongift.uz/api/admin/
- [ ] Products ro'yxati ko'rsatiladi
- [ ] Rasm yuklash ishlaydi (Telegram storage orqali)

---

**Yordam kerak bo'lsa:**
- aHost Support: https://ahost.uz/support
- Django Documentation: https://docs.djangoproject.com/
- React + Vite: https://vitejs.dev/guide/

**Success!** 🎉 MoonGift endi moongift.uz da ishlaydi!
