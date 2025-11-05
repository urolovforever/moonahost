# MoonGift - Render.com'ga Deploy Qilish

## PostgreSQL bilan Render'ga joylash bo'yicha qo'llanma

### 1. Tayyorgarlik

Loyiha Render'ning PostgreSQL database xizmatidan foydalanadi:
- Development: SQLite3 (local ishlab chiqish uchun)
- Production: PostgreSQL (Render'da)

### 2. Render.com'da yangi Blueprint yaratish

**VARIANT 1: Blueprint (Tavsiya etiladi - hamma narsa avtomatik)**

1. [Render.com](https://render.com) saytiga kiring
2. "New +" → "Blueprint" tanlang
3. GitHub repositoryingizni ulang
4. `render.yaml` fayli avtomatik topiladi va database hamda web service yaratiladi

**VARIANT 2: Qo'lda yaratish**

Agar blueprint ishlamasa:

#### 2a. PostgreSQL Database yaratish
1. "New +" → "PostgreSQL" tanlang
2. Settings:
   - **Name**: `moongift-db`
   - **Database**: `moongift`
   - **Region**: Frankfurt (yoki Oregon)
   - **Plan**: Free
3. "Create Database" bosing

#### 2b. Web Service yaratish
1. "New +" → "Web Service" tanlang
2. GitHub repositoryingizni ulang
3. Settings:
   - **Name**: `moongift-backend`
   - **Region**: Frankfurt (database bilan bir xil!)
   - **Branch**: `main`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `cd backend && gunicorn core.wsgi:application`

### 3. Environment Variables sozlash

Web Service'ning "Environment" bo'limida:

```
SECRET_KEY = [Auto Generate qiling]
DEBUG = False
ALLOWED_HOSTS = your-app-name.onrender.com
CORS_ALLOWED_ORIGINS = https://your-frontend-domain.com
DATABASE_URL = [PostgreSQL internal URL'ni ko'chirib qo'ying]
PYTHON_VERSION = 3.11.0
```

**DATABASE_URL olish:**
- PostgreSQL database'ingizni oching
- "Connections" → "Internal Database URL" ni ko'chirib oling
- Web Service'da `DATABASE_URL` environment variable sifatida qo'shing

### 4. Deploy

- "Create Web Service" tugmasini bosing
- Render avtomatik ravishda loyihani build qiladi va deploy qiladi
- Build jarayoni:
  - Dependencies o'rnatiladi
  - Static fayllar to'planadi
  - Database migratsiyalari bajariladi

### 5. Admin Panel

**Avtomatik yaratilgan superuser:**
- Username: `admin`
- Password: `admin123`
- Email: `admin@example.com`

**Admin Panel URL'lar:**
- Django Admin: `https://moongift-backend.onrender.com/admin/`
- Custom Admin Panel: `https://moongift-frontend.onrender.com/admin/login`

**Yangi superuser yaratish:**

Deploy tugagach, o'zingizning superuser'ingizni yaratish uchun:

1. Render dashboard'da Web Service'ingizni oching
2. "Shell" tab'ini bosing
3. Quyidagi buyruqlarni bajaring:
```bash
cd backend
python manage.py createsuperuser
```

### 6. Frontend CORS sozlash

Frontend'ni deploy qilganingizdan keyin, Render'da `CORS_ALLOWED_ORIGINS` environment variable'ni yangilang:

```
CORS_ALLOWED_ORIGINS = https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### 7. Database haqida

- **PostgreSQL** Render'ning o'z xizmatidan foydalaniladi
- Free plan'da: 90 kundan keyin o'chiriladi (lekin bir marta "keep alive" qilsa davom etadi)
- Ma'lumotlar saqlanadi - service qayta ishga tushsa ham yo'qolmaydi
- Render free PostgreSQL: 256MB storage, 97 soatlik uptime/oy

**Local development:**
- Local'da SQLite3 ishlatiladi
- `DATABASE_URL` environment variable bo'lmasa avtomatik SQLite3 ishlatiladi

### 8. Static Files

Static fayllar WhiteNoise orqali serve qilinadi. Qo'shimcha sozlash kerak emas.

### 9. Media Files

Agar foydalanuvchilar rasm yuklasalar, Render Disk yoki S3 kabi cloud storage kerak bo'ladi.

---

## Muammolarni hal qilish

### Build muvaffaqiyatsiz bo'lsa:
1. Build log'larni tekshiring Render dashboard'dan
2. `psycopg2-binary` o'rnatilayotganligini tasdiqlang
3. `build.sh` faylga execute huquqi borligini tekshiring
4. Python versiyasi to'g'riligini tasdiqlang (3.11.0)

### Database connection xatosi:
1. `DATABASE_URL` environment variable to'g'ri sozlanganligini tekshiring
2. PostgreSQL database ishga tushganligini tasdiqlang
3. Region bir xil ekanligini tekshiring (database va web service)

### Static fayllar yuklanmasa:
```bash
cd backend
python manage.py collectstatic --no-input
```

### Database migrationlari xatosi:
```bash
cd backend
python manage.py migrate
```

### PostgreSQL connection testi:
Render Shell'da:
```bash
cd backend
python manage.py dbshell
```

---

## Afzalliklar

✅ **PostgreSQL ishlatilganda:**
- Ma'lumotlar saqlanadi (service restart bo'lsa ham)
- Production-ready database
- Backup va restore qulayliklari
- Concurrent connections qo'llab-quvvatlaydi

✅ **Local development:**
- SQLite3 - tez va oson
- O'rnatish kerak emas
- Local test uchun juda yaxshi

---

**Yordam kerak bo'lsa:**
- Render Documentation: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/
- PostgreSQL on Render: https://render.com/docs/databases
