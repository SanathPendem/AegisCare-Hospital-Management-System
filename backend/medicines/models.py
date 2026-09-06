from django.db import models
from django.utils import timezone


class Medicine(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    code = models.CharField(max_length=50, unique=True, db_index=True)
    category = models.CharField(max_length=100, db_index=True)
    dosage_form = models.CharField(max_length=50) # Tablet, Syrup, Injection, Capsule
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    reorder_level = models.IntegerField(default=10)
    manufacturer = models.CharField(max_length=150, blank=True, null=True)
    batch_number = models.CharField(max_length=100, blank=True, null=True)
    expiry_date = models.DateField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.code}) - Stock: {self.stock_quantity}"

    @property
    def is_low_stock(self):
        return self.stock_quantity <= self.reorder_level

    @property
    def is_expired(self):
        return self.expiry_date <= timezone.now().date() if self.expiry_date else False
