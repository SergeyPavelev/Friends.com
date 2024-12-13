from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib import auth
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .forms import LoginUserForm, RegisterUserForm


User = auth.get_user_model()

def register_user(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse(f'messenger:messenger'))
    
    elif request.method == "POST":
        form = RegisterUserForm(data=request.POST)
        
        if form.is_valid():
            phone = request.POST['phone']
            username = request.POST['username']
            # birthday = request.POST['birthday']
            password1 = request.POST['password1']
            password2 = request.POST['password2']
                        
            if confirmation_phone_and_username(phone=phone, username=username):
                if password1 == password2:
                    User(phone=phone, username=username, password=make_password(password=password1)).save()
                    
                    user = auth.authenticate(request=request, username=username, password=password1)
                    if user is not None:
                        auth.login(request, user)
                        return HttpResponseRedirect(reverse(f'messenger:messenger'))
                    else:
                        return HttpResponseRedirect(reverse('auth:login'))
                else:
                    return HttpResponse('Пароли не совпадают')
            else:
                return HttpResponse('Данные уже используются')
    else:
        form = RegisterUserForm()
    
    data = {
        'title': "Sigin",
        'form' : form,
    }
    
    return render(request, "register/register.html", context=data)


def confirmation_phone_and_username(phone, username):
    """This is a function to confirm the uniqueness of phone numbers and username

    Args:
        phone (string): user number phone
        username (string): user name

    Returns:
        bool: True or False
    """
    
    list_phone = User.objects.values_list('phone', flat=True)
    list_username = User.objects.values_list('username', flat=True)
    
    if phone not in list_phone and username not in list_username:
        return True
    return False


class LoginUser(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        form = LoginUserForm()
        
        data = {
            'title': "Login",
            'form' : form,
        }
        
        return render(request, "register/login.html", context=data)
    
    def post(self, request):
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse(f'messenger:messenger'))

        username = request.data.get('username')
        password = request.data.get('password')
        user = auth.authenticate(request=request, username=username, password=password)
                    
        if user is not None:
            auth.login(request, user)
            return Response(data={'detail': 'Login successful'}, status=200)
        else:
            return Response(data={'error': 'Invalid username or password'}, status=400)


class LogoutUser(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        auth.logout(request)
        
        return Response(data={'detail': 'Вы успешно вышли',}, status=200)
