from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'blog'

urlpatterns = [
    # path('', TemplateView.asview(template_name="blog/index.html")),
    #path('', TemplateView.as_view(template_name="blog/index.html"),name="home"),
    path('', views.PostList.as_view(), name='home'),
    path('<slug:slug>/', views.PostDetail.as_view(), name='post_detail'),
]