from django.shortcuts import render
import requests
from .models import Post,Maps
from django.views import generic
import json
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
        url += 'location='+request.POST.get('location')+"&"
        url += 'query='+request.POST.get('keyword')
        r = requests.get(url)
        result = r.json() 
        y = result['results']
        for i in range(len(y)):
            context['places'][y[i]['name']] = y[i]['name']
            print(context['places']) 
    return render(request,'blog/rearest.html',context)    