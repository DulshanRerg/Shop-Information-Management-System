from django.contrib import admin
from django.contrib.admin.decorators import register
from .models import Category, Product, StockEntry

# Register your models here.

@register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    list_filter = ('name',)
    ordering = ('name',)
    list_per_page = 10

@register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'cost_price', 'selling_price', 'quantity_in_stock')
    search_fields = ('name',)
    list_filter = ('category',)
    ordering = ('name',)
    list_per_page = 10

@register(StockEntry)
class StockEntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'quantity_added', 'date_added')
    search_fields = ('product__name',)
    list_filter = ('product',)
    ordering = ('-date_added',)
    list_per_page = 10