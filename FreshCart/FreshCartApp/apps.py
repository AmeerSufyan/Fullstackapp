from django.apps import AppConfig

class FreshcartappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'FreshCartApp'
    
    def ready(self):
        import FreshCartApp.signals