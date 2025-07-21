from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register),
    path('api/login/', views.login_view),
    path('api/logout/', views.logout_view),
    path('add-to-cart/', views.add_to_cart),
    path('check-login-status', views.check_login_status),
    path('api/categories/', views.get_categories),
    path('api/products/<slug:category_slug>/', views.get_products),
    path('show-cart/', views.get_cart_items),
    path('api/cart/update/', views.update_cart_item),
    path('api/cart/remove/<int:item_id>/', views.remove_cart_item),
    path('api/cart/clear/', views.clear_cart),
    path('api/checkout/', views.checkout_data),
    path('api/checkout_list/', views.checkout_lists),
    path('api/get-latest-order/', views.get_latest_order),
    path('api/previousCheckoutData/', views.prev_checkoutData),
    path('contact/', views.contactData)
]