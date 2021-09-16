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
from django.core.files.storage import FileSystemStorage

# django home page function
def blogList(request):
    context = {}
    posts = requests.get('http://127.0.0.1:8000/api?format=json')
    context['posts'] = posts.json()
    return render(request,'blog/index.html',context)

# from django.views import generic
# from .models import Post
# class PostList(generic.ListView):
#     queryset = Post.objects.all()
#     template_name = 'blog/index.html'

# rendering data of postlist of all blogs
# displays all of post
def postlist(request):
    post = Post.objects.all()
    context = {
        "post_list":post

    }
    # home url
    return render(request,'blog/index.html',context)

# class PostDetail(generic.DetailView):

#     model = Post
#     template_name = 'blog/post_detail.html'

# post detail from blog model/click on read more button
# read data from the databse, filter, and order it
def postDetail(request,slug):
    post = Post.objects.get(id=slug)
    print(post)
    context = {
        "post": post
    }
    # post detail url
    return render(request,'blog/post_detail.html', context)

def about(request):
    return render(request,"blog/about.html",{})

def policy(request):
    return render(request,"blog/policy.html",{})

def contact(request):
    return render(request,"blog/contact.html",{})

def cdc(request):
    return render(request,"blog/cdc.html",{})

def sidebar(request):
    return render(request,"blog/sidebar.html",{})
    
def map(request):
    return render(request,"blog/map.html",{})

# def map(request):
#     mapsData = []
#     mapObject = Maps.objects.all()
#     for obj in mapObject:
#         mapsData.append([obj.travel_advisory,obj.advisory_level,obj.latitute,obj.longtittude,obj.location_name])
#     context = {}
#     context['mapsData'] = json.dumps(mapsData)
#     return render(request,"blog/map.html",context)

# django nearest
def nearest_of_you(request):
    context={}
    context['places'] = {}
    #check for form submission with post aand then code will execute
    if request.method == 'POST':
        api_key = 'AIzaSyAInX0_Rk6nMsqubmBSAxqrm1BjemVP47E'
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key="+api_key+"&"
        url += 'type='+request.POST.get('type')+"&"
        url += 'radius='+request.POST.get('radius')+"&"
        url += 'location='+request.POST.get('location')+"&"
        url += 'query='+request.POST.get('keyword') 
        r = requests.get(url)
        result = r.json() 
        y = result['results']
        for i in range(len(y)):
            context['places'][y[i]['name']] = y[i]['name']
            print(context['places']) 
    return render(request,'blog/nearest.html',context) 
# api nearest search for react
def google_api_callig(request):
    # AIzaSyAInX0_Rk6nMsqubmBSAxqrm1BjemVP47E

    # AIzaSyD4GC-KQEnuxWa-QszhV5h4-4dodTG5nWg
        api_key = 'AIzaSyAInX0_Rk6nMsqubmBSAxqrm1BjemVP47E'
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key="+api_key+"&"
        url += 'type='+request.GET.get('type')+"&"
        url += 'radius='+request.GET.get('radius')+"&"
        url += 'location='+request.GET.get('location')+"&"
        url += 'query='+request.GET.get('keyword')
        # get method of request module
        # return response object
        r = requests.get(url)
        # json method of response object convert
        #  json format data into python format data
        result = r.json() 
        print(result)
        return JsonResponse(result)

# django registration
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
    # forms.py
    context['register_form'] = form
    return render(request,'blog/register.html',context)

# register new user in react/api react
def api_register_request(request):
    response = {"status":0}
    # passed variables in register.js of username(u), email(e), password(p)
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
    
# django logout
def logout_request(request):
    logout(request)
    messages.info(request, "You have successfully logged out.") 
    return redirect("/login")

# django login page
def login_request(request):
    if request.user.is_authenticated:
        return redirect("/")
    context = {}
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # clearing the data for html page//clean data<t>USername</t>
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                return redirect("/")
            else:
                messages.warning(request,"Invalid username or password.")
        else:
            messages.warning(request,"Invalid username or password.")
    form = AuthenticationForm()
    context['login_form'] = form
    return render(request,'blog/login.html',context)

# django api for react for login
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
        #  if response status is 1 successful login and return user id
        # refers to local storage in login.js for user id
        response = {"status":1,"id":user.id}
    return JsonResponse(response)
    
# update profile page in django/Your Profile section
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
        messages.success(request,"Successfully updated profile information")
        return redirect("/profile")
    return render(request,"blog/profile.html",context)    

# django change password in profile
def changePasswordPage(request):
    if request.user.is_authenticated == False:
        return redirect("/login")   
    context = {}
    if request.method == "POST":
        passwd = request.POST.get("password")
        cpasswd = request.POST.get("cpassword")
        if passwd != cpasswd:
            messages.warning(request,"Password should be same!")
            return redirect("/change-password")
        user = User.objects.get(pk=request.user.id)
        user.set_password(passwd)
        user.save()
        messages.success(request,"Successfully updated password")
        return redirect("/change-password")
    return render(request,"blog/changepassword.html",context)    

# My Blog Secton
def myBlogPage(request):
    if request.user.is_authenticated == False:
        return redirect("/login") 
    context = {}
    # gets current user  that is logged in
    user = User.objects.get(pk=request.user.id)
    # get blog created by current user  an
    context['blogs'] = Post.objects.filter(author=user).all()
    return render(request,"blog/manage-blog.html",context) 

# django addnew blog
def addBlogPage(request):
    if request.user.is_authenticated == False:
        return redirect("/login") 
    # after submit button is clicked lines 215-223 will activate
    if request.method == "POST":
        data = request.POST
        # myfile returns all data of image
        myfile = request.FILES['file']
        # then call django method FileSystemStorage() to upload files
        fs = FileSystemStorage()
        # saved fs file in fileName by calling fs.save method//name is the name picture displayed on blog output
        fileName = fs.save(myfile.name,myfile)
        # created a new blog using Post.objects and passing all parameters
        Post.objects.create(title=data.get("title"),content=data.get("content"),excerpt=data.get("excerpt"),author=request.user,image=fileName)
        messages.success(request,"Successfully created a new blog")
        return redirect("/manage-blogs")
    context = {}
    # rendering the new blog form
    return render(request,"blog/add-blog.html",context) 

# edit blog page in django
def editBlogPage(request,id):
    # if user not logged in/authenticated rediret login page
    if request.user.is_authenticated == False:
        return redirect("/login")
    if request.method == "POST":
        data = request.POST
        # myfile returns all data of image
        fileName =""
        # if new image chosen code will render/if no image chosen code will goto obj=post.objects.get(id=id) and will all data except images
        if request.FILES:
            myfile = request.FILES['file']
            # then call django method FileSystemStorage() to upload files
            fs = FileSystemStorage()
            # saved fs file in fileName by calling fs.save method//name is the name picture displayed on blog output
            fileName = fs.save(myfile.name,myfile)
        obj = Post.objects.get(id=id)
        # if file name is blank no image chosen
        # if file name is not blank  then obj.image will not update
        # all other data will be updated if image is chosen
        if fileName != "":
            obj.image = fileName
        obj.title = data.get("title")
        obj.content = data.get("content")
        obj.excerpt = data.get("excerpt")
        obj.save()

        messages.success(request,"Succesfully updated your blog")
        return redirect("/manage-blogs")
    context = {}
    # if user is logged in  get blog list by id  and then store list in context variable
    # and then return render blog edit page
    context['blog'] = Post.objects.get(id=id)
    return render(request,"blog/edit-blog.html",context) 

# django delete blog
def deleteBlogPage(request,id):
    # delect blog by id
    obj = Post.objects.get(id=id)
    obj.delete()
    # return messages on status bar
    messages.warning(request,"Succesffully deleted!")
    return redirect("/manage-blogs")
    
# Your Profile
def handleApiProfile(request,id):
    userData ={}
    user = User.objects.get(pk=id)
    userData={"fName":user.first_name,'lName':user.last_name,"email":user.email}
    return JsonResponse(userData) 

# button update profile
def apiUpdateProfile(request):
    data = request.POST
    id = data.get("id")
    userObj = User.objects.get(pk=id)
    userObj.first_name=data.get("fName")
    userObj.last_name=data.get("lName")
    userObj.email=data.get("email")
    userObj.save()
    user = User.objects.get(pk=id)
    userData={"fName":user.first_name,'lName':user.last_name,"email":user.email}
    return JsonResponse(userData)

# change password
def handleApiChangePassword(request):
    statusData ={"status":1}
    data = request.POST
    id = data.get("id")
    user = User.objects.get(pk=id)
    user.set_password(data.get("password"))
    user.save()  
    return JsonResponse(statusData)

# MyBlogs for react
def handleApiManageBlogs(request,id):
    user = User.objects.get(pk=id)
    # get blog created by current user  an
    statusData = {}
    blogs = Post.objects.filter(author=user).all()
    for blog in blogs:
        image = blog.image
        
        statusData[blog.id] = {"title":blog.title,"id":blog.id,"excerpt":blog.excerpt,"media":str(image)}
    return JsonResponse(statusData)

# add new blog
def addApiBlogPage(request):
    data = request.POST
    # myfile returns all data of image
    myfile = request.FILES['file']
    # then call django method FileSystemStorage() to upload files
    fs = FileSystemStorage()
    # saved fs file in fileName by calling fs.save method//name is the name picture displayed on blog output
    fileName = fs.save(myfile.name,myfile)
    user = User.objects.get(pk=data.get("id"))
    # created a new blog using Post.objects and passing all parameters
    Post.objects.create(title=data.get("title"),content=data.get("content"),excerpt=data.get("excerpt"),author=user,image=fileName)
    return JsonResponse({"status":1})

# edit blog for react
def editApiBlogPage(request):
    data = request.POST
    # myfile returns all data of image
    fileName =""
    id = data.get("id")
    # if new image chosen code will render/if no image chosen code will goto obj=post.objects.get(id=id) and will all data except images
    if request.FILES:
        myfile = request.FILES['file']
        # then call django method FileSystemStorage() to upload files
        fs = FileSystemStorage()
        # saved fs file in fileName by calling fs.save method//name is the name picture displayed on blog output
        fileName = fs.save(myfile.name,myfile)
    obj = Post.objects.get(id=id)
    # if file name is blank no image chosen
    # if file name is not blank  then obj.image will not update
    # all other data will be updated if image is chosen
    if fileName != "":
        obj.image = fileName
    obj.title = data.get("title")
    obj.content = data.get("content")
    obj.excerpt = data.get("excerpt")
    obj.save()
    return JsonResponse({"status":1})
def deleteApiBlogPage(request,id):
    # delect blog by id
    obj = Post.objects.get(id=id)
    obj.delete()
    return JsonResponse({"status":1})
# get objects by id and store im statusData and rtn json

# getting prepopulated value for the edit blog of titltle, content,excerprt, image
def handleApiSingleManageBlogs(request,id):
    statusData = {}
    blog = Post.objects.get(id=id)
    image = blog.image
    statusData = {"title":blog.title,"id":blog.id,"excerpt":blog.excerpt,"content":blog.content,"media":str(image)}
    return JsonResponse(statusData)