#!/usr/bin/env bash
# exit on error
set -o errexit

# Backend setup
cd backend

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py makemigrations --no-input
python manage.py migrate --no-input

# Create superuser automatically (agar yo‘q bo‘lsa)
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser("admin", "admin@example.com", "admin123")
    print("✅ Superuser yaratildi: admin / admin123")
else:
    print("ℹ️ Superuser allaqachon mavjud.")
EOF
