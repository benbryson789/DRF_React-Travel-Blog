from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render,redirect
import requests
from .models import Post,Maps
from django.views import generic
import json
from .forms import NewUserForm
from django.contrib.auth import login,logout,authenticate
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
def blogList(request):
    context = {}
    posts = requests.get('http://127.0.0.1:8000/api?format=json');
    context['posts'] = posts.json()
    return render(request,'blog/index.html',context)

# from django.views import generic
# from .models import Post
# class PostList(generic.ListView):
#     queryset = Post.objects.all()
#     template_name = 'blog/index.html'

def postlist(request):
    post = Post.objects.all()
    context = {
        "post_list":post

    }
    return render(request,'blog/index.html',context)

class PostDetail(generic.DetailView):

    model = Post
    template_name = 'blog/post_detail.html'

def postDetail(request,slug):
    post = Post.objects.get(slug = slug)
    print(post)
    context = {
        "post": post
    }
    return render(request,'blog/post_detail.html', context)

def about(request):
    return render(request,"blog/about.html",{})

def policy(request):
    return render(request,"blog/policy.html",{})

def contact(request):
    return render(request,"blog/contact.html",{})

def map(request):
    mapsData = []
    mapObject = Maps.objects.all()
    for obj in mapObject:
        mapsData.append([obj.travel_advisory,obj.advisory_level,obj.latitute,obj.longtittude,obj.location_name])
    context = {}
    context['mapsData'] = json.dumps(mapsData)
    return render(request,"blog/map.html",context)

def cdc(request):
    return render(request,"blog/cdc.html",{})

def rearest_of_you(request):
    context={}
    context['places'] = {}
    #check for form submission with post aand then code will execute
    if request.method == 'POST':
        api_key = 'AIzaSyAInX0_Rk6nMsqubmBSAxqrm1BjemVP47E'
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key="+api_key+"&"
        url += 'type='+request.POST.get('type')+"&"
        url += 'radius='+request.POST.get('radius')+"&"
        # url += 'location='+request.POST.get('location')+"&"
        url += 'query='+request.POST.get('keyword') + ' in ' + +request.POST.get('location')
        r = requests.get(url)
        result = r.json() 
        y = result['results']
        for i in range(len(y)):
            context['places'][y[i]['name']] = y[i]['name']
            print(context['places']) 
    return render(request,'blog/rearest.html',context) 

def google_api_callig(request):
    # AIzaSyAInX0_Rk6nMsqubmBSAxqrm1BjemVP47E

    # AIzaSyD4GC-KQEnuxWa-QszhV5h4-4dodTG5nWg
        api_key = 'AIzaSyAInX0_Rk6nMsqubmBSAxqrm1BjemVP47E'
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key="+api_key+"&"
        url += 'type='+request.GET.get('type')+"&"
        url += 'radius='+request.GET.get('radius')+"&"
        url += 'location='+request.GET.get('location')+"&"
        url += 'query='+request.GET.get('keyword')
        r = requests.get(url)
        result = r.json() 
        print(result)
        return JsonResponse(result)

def registration(request):
    context = {}
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful." )
            return redirect("/")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    context['register_form'] = form
    return render(request,'blog/register.html',context)
def api_register_request(request):
    response = {"status":0}
    uname = request.GET.get("u")
    email=request.GET.get("e")
    passwd = request.GET.get("p")
    if User.objects.filter(username=uname).exists():
        return JsonResponse(response)
    if User.objects.filter(email=email).exists():
        return JsonResponse(response) 
    user = User.objects.create_user(username=uname,email=email,password=passwd)
    response ={"status":1}
    return JsonResponse(response)
def logout_request(request):
    logout(request)
    messages.info(request, "You have successfully logged out.") 
    return redirect("/login")
    
def login_request(request):
    if request.user.is_authenticated:
        return redirect("/")
    context = {}
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                return redirect("/")
            else:
                messages.error(request,"Invalid username or password.")
        else:
            messages.error(request,"Invalid username or password.")
    form = AuthenticationForm()
    context['login_form'] = form
    return render(request,'blog/login.html',context)

def api_login_request(request):
    # if response is 0/false username and password is incorrect
    #returns a response of 0
    response = {"status":0}
    username = request.GET.get("username")
    password = request.GET.get("password")
    # print(username)
    # print(password)
    # if username and password is correct rtns response1/true 
    # 
    user = authenticate(username=username,password=password)
    if user is not None:
        # print("kay commint")
        response = {"status":1}
    return JsonResponse(response)
def profilePage(request):
    if request.user.is_authenticated == False:
        return redirect("/login")
    context = {}
    print(request.user.id)
    if request.method == "POST":
        user = User.objects.get(pk=request.user.id)
        user.first_name = request.POST.get('name')
        user.last_name = request.POST.get("lastname")
        user.email = request.POST.get("email")
        user.save()
        return redirect("/profile")
    return render(request,"blog/profile.html",context)    
def changePasswordPage(request):
    if request.user.is_authenticated == False:
        return redirect("/login")   
    context = {}
    if request.method == "POST":
        passwd = request.POST.get("password")
        cpasswd = request.POST.get("cpassword")
        if passwd != cpasswd:
            messages.error(request,"Password should be same!")
            return redirect("/change-password")
        user = User.objects.get(pk=request.user.id)
        user.set_password(passwd)
        user.save()
        messages.success(request,"Successfully updated password")
        return redirect("/change-password")
    return render(request,"blog/changepassword.html",context)    
def myBlogPage(request):
    if request.user.is_authenticated == False:
        return redirect("/login") 
    context = {}
    return render(request,"blog/manage-blog.html",context) 
def addBlogPage(request):
    if request.user.is_authenticated == False:
        return redirect("/login") 
    context = {}
    return render(request,"blog/add-blog.html",context) 
def editBlogPage(request):
    if request.user.is_authenticated == False:
        return redirect("/login") 
    context = {}
    return render(request,"blog/edit-blog.html",context)   