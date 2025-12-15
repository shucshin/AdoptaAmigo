from django.contrib import admin
from .models import Especie, Ubicacion, Mascota, PerfilUsuario


@admin.register(Especie)
class EspecieAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre")


@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ("id", "estado", "abreviatura")


@admin.register(Mascota)
class MascotaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "nombre",
        "especie",
        "sexo",
        "ubicacion",
        "vacunado",
        "edad_meses",
        "edad_formateada",
        "fecha_reporte",
        "publicador",
    )

  
    list_filter = ("especie", "sexo", "vacunado", "ubicacion")

    search_fields = ("nombre", "descripcion")


@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "bio")
    search_fields = ("user__username",)