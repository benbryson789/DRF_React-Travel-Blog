from django.shortcuts import render
import requests
# Create your views here.
# def blogList(request):
#     context = {}
#     posts = requests.get('http://127.0.0.1:8000/api?format=json');
#     context['posts'] = posts.json()
#     return render(request,'blog/index.html',context)
from django.views import generic
from .models import Post

class PostList(generic.ListView):
    queryset = Post.objects.all()
    template_name = 'blog/index.html'

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