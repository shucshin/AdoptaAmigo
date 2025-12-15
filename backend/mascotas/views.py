from django.contrib.auth import authenticate, login
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import MascotaSerializer, UserSerializer, UserRegistrationSerializer
from .models import Mascota


class MascotaViewSet(viewsets.ModelViewSet):
    queryset = Mascota.objects.all()
    serializer_class = MascotaSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            publicador = user
        else:
            publicador = User.objects.last()  #pendiende cambiar esto por el usuario definido"
        serializer.save(publicador=publicador)


# Vistas de Autenticación

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'detail': 'CSRF cookie set'})


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Por favor proporciona usuario y contraseña'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response({
            'message': 'Inicio de sesión exitoso',
            'user': serializer.data
        }, status=status.HTTP_200_OK)
    else:
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)
        user_data = UserSerializer(user).data
        return Response({
            'message': 'Usuario registrado exitosamente',
            'user': user_data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response({
            'isAuthenticated': True,
            'user': serializer.data
        })
    else:
        return Response({
            'isAuthenticated': False,
            'user': None
        })
    