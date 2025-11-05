from django.urls import path
from .views import (
    CategoryListView, ProductListView, ProductDetailView, FeaturedProductsView,
    AdminProductListView, AdminProductCreateView, AdminProductUpdateView, AdminProductDeleteView
)
from .auth_views import LoginView, LogoutView, CheckAuthView, CSRFTokenView

urlpatterns = [
    # Public endpoints
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', ProductListView.as_view(), name='product-list'),
    path('featured/', FeaturedProductsView.as_view(), name='featured-products'),

    # Auth endpoints
    path('auth/login/', LoginView.as_view(), name='admin-login'),
    path('auth/logout/', LogoutView.as_view(), name='admin-logout'),
    path('auth/check/', CheckAuthView.as_view(), name='admin-check-auth'),
    path('auth/csrf/', CSRFTokenView.as_view(), name='csrf-token'),

    # Admin endpoints
    path('admin/products/', AdminProductListView.as_view(), name='admin-product-list'),
    path('admin/products/create/', AdminProductCreateView.as_view(), name='admin-product-create'),
    path('admin/products/<int:id>/update/', AdminProductUpdateView.as_view(), name='admin-product-update'),
    path('admin/products/<int:id>/delete/', AdminProductDeleteView.as_view(), name='admin-product-delete'),

    # Product detail (slug bo'yicha, oxirida turishi kerak)
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]
