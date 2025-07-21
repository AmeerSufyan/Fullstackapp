from django.shortcuts import render
from django.contrib.auth import authenticate, login ,logout
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import OrderDetail, Order_Item, Product, Categorie, Checkout, Contact
from django.core.mail import EmailMessage, send_mail

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        email = data['email']
        password = data['password']
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'This Email already regsitered'}, status=400)
        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'message': 'Registeration Successfull'})
    
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user  = authenticate(request, username=data['username'], password=data['password'])
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login Successfully'})
        else:
            return JsonResponse({'error': 'Invalid Credentials'}, status=400)

def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout Successfully'})

def update_order_total(order):
    items = Order_Item.objects.filter(Order_id=order)
    sub_total = sum(item.Product.Product_Price * item.Quantity for item in items)
    order.SubTotal = sub_total
    shipping_charges = 250
    order.shipping_charges = shipping_charges
    order.Total_Amount = sub_total + shipping_charges
    order.save()

# Get or create an Order object for the current session
def get_session_order(request):
    order_id = request.session.get('order_id')
    order = None
    if order_id:
        try:
            order = OrderDetail.objects.get(id=order_id, order_status='PENDING')
        except OrderDetail.DoesNotExist:
            order = None
    if order is None:
        order = OrderDetail.objects.create(order_status='PENDING')
        request.session['order_id'] = order.id
    return order
@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Product not found'}, status=404)

        order = get_session_order(request)

        order_item_exists = Order_Item.objects.filter(Order_id=order, Product=product).exists()
        if order_item_exists:
            return JsonResponse({'success': False, 'message': 'Product already in cart'}, status=200)

        Order_Item.objects.create(Order_id=order, Product=product, Quantity=quantity)
        update_order_total(order)
        return JsonResponse({'success': True, 'message': 'Item added to cart'})
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)

def get_cart_items(request):
    order = None
    order_id = request.session.get('order_id')
    if order_id:
        try:
            order = OrderDetail.objects.get(id=order_id, order_status='PENDING')
        except OrderDetail.DoesNotExist:
            order = None

    if order is None:
        return JsonResponse({'cart': []})

    items = Order_Item.objects.filter(Order_id=order)
    data = []
    for item in items:
        data.append({
            'id': item.Product.id,
            'name': item.Product.Product_Name,
            'price': float(item.Product.Product_Price),
            'quantity': item.Quantity,
            'subtotal': float(item.Product.Product_Price) * item.Quantity,
            'image': item.Product.Product_image.url if item.Product.Product_image else ''
        })
    return JsonResponse({'cart': data})

def update_cart_item(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_id = data.get('product_id')
        quantity = data.get('quantity')

        order = None
        order_id = request.session.get('order_id')
        if order_id:
            try:
                order = OrderDetail.objects.get(id=order_id, order_status='PENDING')
            except OrderDetail.DoesNotExist:
                order = None

        if order is None:
            return JsonResponse({'error': 'Order not found'}, status=404)

        try:
            order_item = Order_Item.objects.get(Order_id=order, Product_id=product_id)

            if quantity > 0:
                order_item.Quantity = quantity
                order_item.save()
            else:
                order_item.delete()
            update_order_total(order)

            items = Order_Item.objects.filter(Order_id=order)
            cart_data = []
            for item in items:
                cart_data.append({
                    'id': item.Product.id,
                    'name': item.Product.Product_Name,
                    'price': float(item.Product.Product_Price),
                    'quantity': item.Quantity,
                    'subtotal': float(item.Product.Product_Price) * item.Quantity,
                    'image': item.Product.Product_image.url if item.Product.Product_image else ''
                })
            return JsonResponse({'cart': cart_data})
        except Order_Item.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def remove_cart_item(request, item_id):
    if request.method == 'DELETE':
        order = None
        order_id = request.session.get('order_id')
        if order_id:
            try:
                order = OrderDetail.objects.get(id=order_id, order_status='PENDING')
            except OrderDetail.DoesNotExist:
                order = None

        if order is None:
            return JsonResponse({'error': 'Order not found'}, status=404)

        try:
            order_item = Order_Item.objects.get(Order_id=order, Product_id=item_id)
            order_item.delete()
            update_order_total(order)

            items = Order_Item.objects.filter(Order_id=order)
            cart_data = []
            for item in items:
                cart_data.append({
                    'id': item.Product.id,
                    'name': item.Product.Product_Name,
                    'price': float(item.Product.Product_Price),
                    'quantity': item.Quantity,
                    'subtotal': float(item.Product.Product_Price) * item.Quantity,
                    'image': item.Product.Product_image.url if item.Product.Product_image else ''
                })
            return JsonResponse({'cart': cart_data})
        except Order_Item.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def clear_cart(request):
    if request.method == 'POST':
        order = None
        order_id = request.session.get('order_id')
        if order_id:
            try:
                order = OrderDetail.objects.get(id=order_id, order_status='PENDING')
            except OrderDetail.DoesNotExist:
                order = None

        if order is None:
            return JsonResponse({'cart': []})

        Order_Item.objects.filter(Order_id=order).delete()
        update_order_total(order)
        if 'order_id' in request.session:
           del request.session['order_id']
        return JsonResponse({'cart': []})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def checkout_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        order = None
        order_id = request.session.get('order_id')
        if order_id:
            try:
                order = OrderDetail.objects.get(id=order_id, order_status='PENDING')
            except OrderDetail.DoesNotExist:
                return JsonResponse({'error': 'Order not found'}, status=400)
        else:
            return JsonResponse({'error': 'Order not found'}, status=400)
        session_key = get_session_key(request)
            
        ordered_products = data.get('products', '')   

        Checkout.objects.create(
            order_id=order,
            session_key=session_key,
            name=data['name'],
            phone=data['phone'],
            email=data['email'],
            address=data['address'],
            city=data['city'],
            zipcode=data['zipcode'],
            payment_method=data['payment_method'],
            sub_total=data['sub_total'],
            shipping_charges=data['shipping_charges'],
            total_amount=data['total_amount'],
            order_status=data.get('order_status', 'PENDING'),
            products = ordered_products,
        )
       
        Order_Item.objects.filter(Order_id=order).delete()
        update_order_total(order)
        order.save()
        
        if 'order_id' in request.session:
             del request.session['order_id']  
         #send email to admin
        subject = f"New Order"
        html_content = f"""
           <strong>FreshCart</strong><br>     
           Order ID: {order.id}<br>
           From: {data['name']}<br>
           Phone: {data['phone']}<br>
           Email: {data['email']}<br>
           Address: {data['address']}<br>
           City: {data['city']}<br>
           Zipcode: {data['zipcode']}<br>
           Payment Method: {data['payment_method']}<br>
           Subtotal: {data['sub_total']}<br>
           Shipping Charges: {data['shipping_charges']}<br>
           Total Amount: {data['total_amount']}<br>
           Order Status: {data.get('order_status', 'PENDING')}<br>
           Products: {ordered_products}"
           """
        email = EmailMessage(
            subject,
            html_content,
            "no-reply@example.com",
            ["solarwebsite123@gmail.com"],
        ) 
        email.content_subtype = "html"  
        email.send()
         
        return JsonResponse({'message': 'Checkout Successful'})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def get_latest_order(request):
    order = None
    order_id = request.session.get('order_id')
    if order_id:
        try:
            order = OrderDetail.objects.get(id=order_id, order_status='PENDING')
        except OrderDetail.DoesNotExist:
            return JsonResponse({'error': 'No pending order found'}, status=404)
    else:
        return JsonResponse({'error': 'No pending order found'}, status=404)

    items = Order_Item.objects.filter(Order_id=order)
    product_list = []
    for item in items:
        product_list.append({
            'product_name': item.Product.Product_Name,
            'quantity': item.Quantity,
        })
    total = sum(item.Product.Product_Price * item.Quantity for item in items)
    order.sub_total = total
    shipping = 250
    order.shipping_charges = shipping
    order.total_amount = total + shipping
    order.save()
    return JsonResponse({
    
        'sub_total': float(order.sub_total or 0),
        'shipping_charges': float(order.shipping_charges or 0),
        'total_amount': float(order.total_amount or 0),
         'products': product_list
    })

def check_login_status(request):
    return JsonResponse({'isAuthenticated': request.user.is_authenticated})

# Get products from database
def get_products(request, category_slug):
    try: 
        category = Categorie.objects.get(Category_slug=category_slug)
    except Categorie.DoesNotExist:
        return JsonResponse({'error': 'Category not found'},status=404)    
    products = Product.objects.filter(Category_slug=category)
    data = {
        'category_name': category.Category_name,
        'products': []
    }
    for product in products:
        data['products'].append({
            'id': product.id,
            'image': product.Product_image.url,
            'name': product.Product_Name,
            'price': float(product.Product_Price) # Convert decimal  into float for json compatability 
        })
    return JsonResponse(data, safe=False)    

# Get Categories
def get_categories(request):
    categories = Categorie.objects.all()
    data = []
    for categ in categories:
        data.append({
            'id': categ.id,
            'slug': categ.Category_slug,
            'image': categ.Category_image.url,
            'name': categ.Category_name
        })
    return JsonResponse(data, safe=False)    

def prev_checkoutData(request):
    session_key = get_session_key(request)
    last_checkout = Checkout.objects.filter(session_key=session_key).order_by('-id').first()

    if not last_checkout:
        return JsonResponse({'message': 'No previous checkout found'}, status=404)
    
    data = {
        'Name': last_checkout.name,
        'Phone': last_checkout.phone,
        'Email': last_checkout.email,
        'Address': last_checkout.address,
        'City': last_checkout.city,
        'Zipcode': last_checkout.zipcode,
        'Payment_method': last_checkout.payment_method,
        'Sub_total': str(last_checkout.sub_total),
        'Shipping_charges': str(last_checkout.shipping_charges),
        'Total_amount': str(last_checkout.total_amount),
        'Order_status': last_checkout.order_status,
    
    }
    return JsonResponse(data)
def get_session_key(request):
    if not request.session.session_key:
        request.session.create()
    return request.session.session_key

# view to show checkout detail in front page
def checkout_lists(request):
    if request.method == 'GET':
        latest_checkout = Checkout.objects.order_by('-id').first()
 
        if latest_checkout:
            data = {
                'name': latest_checkout.name,
                'phone': latest_checkout.phone,
                'email': latest_checkout.email,
                'address': latest_checkout.address,
                'city': latest_checkout.city,
                'zipcode': latest_checkout.zipcode,
                'payment_method': latest_checkout.payment_method,
                'subtotal': latest_checkout.sub_total,
                'shippingcharges': latest_checkout.shipping_charges,
                'totalamount': latest_checkout.total_amount,
                'products': latest_checkout.products
            }
            return JsonResponse(data)
        else: 
            return JsonResponse({'error': 'No checkout data found'}, status=404)
    return JsonResponse({'error', 'Invalid request'}, status=400)

# Contact Form
def contactData(request):
    if request.method == 'POST':
        contact_data = json.loads(request.body)
        name = contact_data.get('username')
        email = contact_data.get('email')
        subject = contact_data.get('subject')
        message = contact_data.get('message')
         
        if Contact.objects.filter(Email=email).exists():
            return JsonResponse({'error': 'This email already registered'}) 
        Contact.objects.create(
            Name = name,
            Email = email,
            Subject = subject,
            Message = message
        )

        send_mail(
            subject = f"New Contact",
            message = f" Name: {name} \n Email: {email} \n Subject: {subject} \n Message: {message}",
            from_email = "noreply@example.com",
            recipient_list = ["solarwebsite123@gmail.com"],
            fail_silently = False
        )
        return JsonResponse({'success': 'Message sent successfully'})
    return JsonResponse({'error': 'Invalid request'})
