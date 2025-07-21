from django.contrib import admin
from .models import OrderDetail, Order_Item, Product, Categorie, Checkout, Contact

admin.site.register(Order_Item)

class checkoutDetails(admin.ModelAdmin):
    list_display = ['order_id', 'name', 'phone', 'email', 'address', 'city', 'zipcode', 'payment_method', 'products', 'sub_total', 'shipping_charges', 'total_amount', 'order_status']
    readonly_fields = ['order_id', 'name', 'phone', 'email', 'address', 'city', 'zipcode', 'payment_method', 'products', 'sub_total', 'shipping_charges', 'total_amount']
    
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_add_permission(self, request):
        return False
admin.site.register(Checkout, checkoutDetails)  

class orderItemsDetail(admin.ModelAdmin):
    list_display = ['id', 'order_status', 'sub_total', 'shipping_charges', 'total_amount']
    readonly_fields = ['sub_total', 'shipping_charges', 'total_amount']
    
admin.site.register(OrderDetail, orderItemsDetail)    

class AdminCategory(admin.ModelAdmin):
    search_fields = ['Category_name']
admin.site.register(Categorie, AdminCategory)    

class AdminProduct(admin.ModelAdmin):
    search_fields = ['Product_Name']
admin.site.register(Product, AdminProduct)    

class ContactForm(admin.ModelAdmin):
    list_display = ['Name', 'Email', 'Subject', 'Message']
    readonly_fields = ['Name', 'Email', 'Subject', 'Message']

    def has_change_permission(self, request, obj=None):
        return False
    
    def has_add_permission(self, request):
        return False
admin.site.register(Contact, ContactForm)    