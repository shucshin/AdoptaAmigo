from django.db import models
from django.contrib.auth.models import User 

class Especie(models.Model):
    """
    Modelo que representa las especies de animales disponibles en el sistema.
    Ejemplos: Perro, Gato, Hamster, etc.
    """
    nombre = models.CharField(max_length=50, verbose_name="Nombre de la Especie") 
    
    def __str__(self):
        return self.nombre
    
class Ubicacion(models.Model):
    """
    Modelo para gestionar las ubicaciones geográficas (Estados).
    Incluye el nombre completo y su abreviatura estándar.
    """
    estado = models.CharField(max_length=30, verbose_name="Nombre del Estado")
    abreviatura = models.CharField(max_length=10, verbose_name="Abreviatura")

    class Meta:
        verbose_name = "Ubicación"
        verbose_name_plural = "Ubicaciones"
    
    def __str__(self):
        return self.estado
    
class Mascota(models.Model):
    """
    Modelo principal que representa a una mascota disponible para adopción.
    Almacena información detallada, multimedia y relaciones con su publicador.
    """
    nombre = models.CharField(max_length=100, verbose_name="Nombre de la Mascota") 
    descripcion = models.TextField(verbose_name="Descripción Detallada")

    # Almacenamos la edad total en meses para facilitar cálculos y filtrado
    edad_meses = models.PositiveSmallIntegerField(default=0, verbose_name="Edad en Meses")

    @property
    def edad_formateada(self):
        """
        Propiedad calculada que devuelve una representación legible de la edad.
        Ejemplo: '2 años, 3 meses' o '5 meses'.
        """
        años = self.edad_meses // 12 
        meses = self.edad_meses % 12
        partes_edad = []

        if años > 0:
            partes_edad.append(f"{años} año" + ("s" if años != 1 else ""))
        if meses > 0:
            partes_edad.append(f"{meses} mes" + ("es" if meses != 1 else ""))

        return ", ".join(partes_edad) if partes_edad else "0 meses"

    vacunado = models.BooleanField(default=False, verbose_name="¿Está Vacunado?")
    fecha_reporte = models.DateField(auto_now_add=True, verbose_name="Fecha de Publicación")
    imagen = models.ImageField(upload_to='mascotas/', verbose_name="Fotografía")
    
    # Relaciones
    especie = models.ForeignKey(Especie, on_delete=models.CASCADE, verbose_name="Especie")
    publicador = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Publicado por")

    sexo = models.CharField(
        max_length=10,
        choices=[('macho', 'Macho'), ('hembra', 'Hembra')],
        default='macho',
        verbose_name="Género"
    )
    
    # Relación con Ubicación (PROTECT evita borrar estados si hay mascotas ahí)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.PROTECT, verbose_name="Ubicación")
    
    def __str__(self):
        return self.nombre
    
class PerfilUsuario(models.Model):
    """
    Extensión del modelo User de Django para almacenar información adicional del perfil.
    Gestiona roles específicos (Admin, Publicador, Adoptante) y datos biográficos.
    """
    ROLES = [
        ('admin', 'Administrador'),
        ('publicador', 'Publicador'),
        ('adoptante', 'Adoptante'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfilusuario')
    bio = models.TextField(blank=True, verbose_name="Biografía")
    avatar = models.ImageField(upload_to='perfiles/', null=True, blank=True, verbose_name="Avatar")
    rol = models.CharField(max_length=20, choices=ROLES, default='adoptante', verbose_name="Rol del Usuario")
        
    def __str__(self):
        return self.user.username
