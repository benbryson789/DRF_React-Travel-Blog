from rest_framework import generics
from django.conf import settings
from blog.models import Post
from .serializers import PostSerializer
ALLOWED_HOSTS =  settings.ALLOWED_HOSTS
class PostList(generics.ListCreateAPIView):
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class Postcrud(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# from django.shortcuts import render
# from django.http import JsonResponse
# from blog.models import Post

# from rest_framework.decorators import blog_api_view
# from rest_framwork.response import Response

# @blog_api_view(['GET'])
# def apiOverview(request):
    
#     api_urls = {
#         'List': '/post-list',
#         'Detail View': '/post-detail/<str:pk>/',
#         'Create': '/post-create/',
#         'Update': '/post-update/<str:pk>/',
#         'Delete':'/post-delete/<str:pk>/'
#         }

#     return Response(api_urls)