from rest_framework import serializers 
from django.contrib.auth.models import User
from .models import Mascota, PerfilUsuario

class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para mostrar información básica del usuario, incluyendo su rol.
    """
    rol = serializers.CharField(source='perfilusuario.rol', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'rol']
        read_only_fields = ['id']

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializador para el registro de nuevos usuarios.
    Maneja la validación de contraseñas y la creación del perfil asociado con el rol seleccionado.
    """
    password = serializers.CharField(write_only=True, min_length=6, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, style={'input_type': 'password'})
    rol = serializers.ChoiceField(choices=PerfilUsuario.ROLES, write_only=True, default='adoptante')
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'rol']
        
    def validate(self, data):
        """
        Verifica que las contraseñas coincidan.
        """
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden"})
        return data
    
    def validate_email(self, value):
        """
        Verifica que el email sea único en el sistema.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está registrado")
        return value
    
    def validate_username(self, value):
        """
        Verifica que el nombre de usuario sea único.
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso")
        return value
    
    def create(self, validated_data):
        """
        Crea el usuario y su perfil asociado con el rol seleccionado.
        """
        validated_data.pop('password_confirm')
        rol = validated_data.pop('rol', 'adoptante')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        # Crear perfil automáticamente
        PerfilUsuario.objects.create(user=user, rol=rol)
        
        return user

class MascotaSerializer(serializers.ModelSerializer):
    """
    Serializador completo para el modelo Mascota.
    Incluye campos relacionados aplanados para facilitar su uso en el frontend
    (ej. publicador_username en lugar de un objeto anidado).
    """
    publicador_username = serializers.CharField(source='publicador.username', read_only=True)
    especie_nombre = serializers.CharField(source='especie.nombre', read_only=True)
    ubicacion_estado = serializers.CharField(source='ubicacion.estado', read_only=True)
    ubicacion_abreviatura = serializers.CharField(source='ubicacion.abreviatura', read_only=True)
    edad_formateada = serializers.ReadOnlyField()
    
    class Meta:
        model = Mascota
        fields = '__all__'
        read_only_fields = ['publicador', 'fecha_reporte']
