from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'product_count', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    list_per_page = 20

    def product_count(self, obj):
        count = obj.products.count()
        return format_html('<b style="color: green;">{}</b>', count)

    product_count.short_description = 'Mahsulotlar Soni'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'name', 'category', 'formatted_price', 'discount_badge', 'is_featured', 'is_active', 'created_at']
    list_filter = ['category', 'is_featured', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_featured', 'is_active']
    list_per_page = 20
    date_hierarchy = 'created_at'

    fieldsets = (
        ('📦 Asosiy Ma\'lumotlar', {
            'fields': ('name', 'slug', 'category', 'description'),
            'classes': ('wide',)
        }),
        ('💰 Narx', {
            'fields': ('price',),
            'classes': ('wide',)
        }),
        ('🏷️ Chegirma', {
            'fields': ('discount_percentage',),
            'classes': ('wide',),
            'description': 'Chegirma foizini kiriting (0-100 oralig\'ida)'
        }),
        ('🖼️ Rasmlar', {
            'fields': ('image', 'image_2', 'image_3'),
            'classes': ('wide',)
        }),
        ('🛒 Savdo Maydonchalari', {
            'fields': ('uzum_link', 'yandex_market_link'),
            'classes': ('wide',)
        }),
        ('⚙️ Status', {
            'fields': ('is_featured', 'is_active'),
            'classes': ('wide',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="border-radius: 5px; object-fit: cover;" />',
                obj.image.url
            )
        return '-'

    image_preview.short_description = 'Rasm'

    def formatted_price(self, obj):
        # TUZATILDI: Avval format qilib, keyin format_html'ga yuboramiz
        price_str = '{:,.0f}'.format(float(obj.price))
        return format_html(
            '<b style="color: #2e7d32;">{} so\'m</b>',
            price_str
        )

    formatted_price.short_description = 'Narx'
    formatted_price.admin_order_field = 'price'

    def discount_badge(self, obj):
        if obj.discount_percentage > 0:
            return format_html(
                '<span style="background: #ff3b3f; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">-{}%</span>',
                obj.discount_percentage
            )
        return format_html('<span style="color: #999;">-</span>')

    discount_badge.short_description = 'Chegirma'
    discount_badge.admin_order_field = 'discount_percentage'

    # Rasm yuklanganda avtomatik preview
    readonly_fields = ['image_preview_large']

    def image_preview_large(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 300px; border-radius: 10px;" />',
                obj.image.url
            )
        return 'Rasm yuklanmagan'

    image_preview_large.short_description = 'Rasm Preview'