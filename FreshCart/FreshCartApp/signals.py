from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import OrderDetail, Checkout

@receiver(post_save, sender=OrderDetail)
def update_checkout_order_status(sender, instance, **kwargs):
    try:
        checkout = Checkout.objects.get(order_id=instance.id)
        if checkout.order_status != instance.order_status:
            checkout.order_status = instance.order_status
            checkout.save()
    except Checkout.DoesNotExist:
        pass
