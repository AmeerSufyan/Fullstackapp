from django.db import models
from django.contrib.auth.models  import User


class OrderDetail(models.Model):
    order_status_choices = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled')
    ] 

    order_data = models.DateTimeField(auto_now_add=True)
    order_status = models.CharField(max_length=30, choices=order_status_choices, default='PENDING')
    sub_total = models.DecimalField(max_digits=10,  decimal_places=2, default=0,  null=True)
    shipping_charges = models.DecimalField(max_digits=10,  decimal_places=2, default=0,  null=True)
    total_amount = models.DecimalField(max_digits=10,  decimal_places=2,  null=True)
    
    def __str__(self):
        return f" Order  {self.id}"

class Categorie(models.Model):
    Category_slug = models.SlugField(unique=True)
    Category_image = models.ImageField(upload_to='images/', blank=False)
    Category_name = models.CharField(max_length=100)    
    def __str__(self):
        return self.Category_name
    
class Product(models.Model):
    Product_image = models.ImageField(upload_to='images/', blank=True, null=True)
    Product_Name = models.CharField(max_length=60, blank=True, null=True)
    Product_Price = models.DecimalField(max_digits=10, decimal_places=2,  null=True)
    Category_slug = models.ForeignKey(Categorie, on_delete=models.CASCADE)

    def __str__(self):
        return self.Product_Name

class Order_Item(models.Model):
    Order_id = models.ForeignKey(OrderDetail, on_delete=models.CASCADE, null=False, blank=False)
    Product = models.ForeignKey(Product, on_delete=models.CASCADE)
    Quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f" Ordered Item: {self.Product}"
    
class Checkout(models.Model):
    payment_method_choices = [
        ('COD', 'Cash on Delivery'),
        ('Bank Transfer', "Bank Transfer")      
    ]
    order_status_choices = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled')
        
    ] 
    order_id = models.ForeignKey(OrderDetail, on_delete=models.CASCADE)
    session_key = models.CharField(max_length=40)
    name = models.CharField(max_length=60, null=False)
    phone = models.CharField(max_length=11, null=False, blank=False)
    email = models.EmailField(max_length=50)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=40)
    zipcode = models.IntegerField()
    payment_method = models.CharField(max_length=20, choices=payment_method_choices, default='COD')
    sub_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_charges = models.DecimalField(max_digits=8, decimal_places=2,  default=0)
    total_amount =models.DecimalField(max_digits=10,  decimal_places=2,)
    order_status = models.CharField(max_length=30, choices=order_status_choices, default='PENDING')
    products = models.TextField(max_length=400)
    
class Contact(models.Model):
    Name = models.CharField(max_length=60, null=False)
    Email = models.EmailField(max_length=40, unique=True)
    Subject = models.CharField(max_length=100)
    Message = models.TextField(max_length=500)    
   
    def __str__(self):
        return self.Name
