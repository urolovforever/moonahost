from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Kategoriya nomi")
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, verbose_name="Tavsif")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Kategoriya"
        verbose_name_plural = "Kategoriyalar"
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name="Mahsulot nomi")
    slug = models.SlugField(unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', verbose_name="Kategoriya")
    description = models.TextField(verbose_name="Tavsif")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Narx (so'm)")
    image = models.ImageField(upload_to='products/', verbose_name="Asosiy rasm")
    image_2 = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name="Rasm 2")
    image_3 = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name="Rasm 3")
    uzum_link = models.URLField(verbose_name="Uzum Market havola")
    yandex_market_link = models.URLField(blank=True, null=True, verbose_name="Yandex Market havola")
    discount_percentage = models.IntegerField(default=0, verbose_name="Chegirma foizi (0-100)")
    is_featured = models.BooleanField(default=False, verbose_name="Mashhur")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Mahsulot"
        verbose_name_plural = "Mahsulotlar"
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
