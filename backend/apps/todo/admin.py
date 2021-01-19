from django.contrib import admin

from .models import Todo 

class TodoAdmin(admin.ModelAdmin):  
  list_display = ( 'description', 'completed', 'timestamp') 


admin.site.register(Todo, TodoAdmin) 