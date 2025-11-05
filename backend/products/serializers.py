from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'product_count']

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'category_name', 'description', 'price', 'image', 'image_2', 'image_3', 'uzum_link', 'yandex_market_link', 'discount_percentage', 'is_featured']


class ProductDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'category_name', 'description', 'price',
                  'image', 'image_2', 'image_3', 'uzum_link', 'yandex_market_link',
                  'discount_percentage', 'is_featured', 'created_at', 'similar_products']

    def get_similar_products(self, obj):
        similar = Product.objects.filter(category=obj.category, is_active=True).exclude(id=obj.id)[:4]
        return ProductListSerializer(similar, many=True, context=self.context).data


class ProductAdminSerializer(serializers.ModelSerializer):
    """Admin uchun mahsulot yaratish va tahrirlash serializer"""
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'category_name', 'description', 'price',
                  'image', 'image_2', 'image_3', 'uzum_link', 'yandex_market_link',
                  'discount_percentage', 'is_featured', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def validate_discount_percentage(self, value):
        """Chegirma foizi 0-100 oralig'ida bo'lishi kerak"""
        if value < 0 or value > 100:
            raise serializers.ValidationError("Chegirma foizi 0 va 100 orasida bo'lishi kerak")
        return value

    def validate_price(self, value):
        """Narx musbat bo'lishi kerak"""
        if value <= 0:
            raise serializers.ValidationError("Narx musbat son bo'lishi kerak")
        return value
