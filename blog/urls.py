from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'blog'

urlpatterns = [
    # path('', TemplateView.asview(template_name="blog/index.html")),
    #path('', TemplateView.as_view(template_name="blog/index.html"),name="home"),
    path('', views.postlist, name='home'),
    path('about',views.about, name= 'about'),
    path('policy',views.policy, name= 'policy'),
    path('contact',views.contact, name= 'contact'),
    path('map',views.map, name= 'map'),
    path('cdc',views.cdc, name= 'cdc'),
    path('nearest-places',views.rearest_of_you, name= 'rearest'),
    path('google_api',views.google_api_callig, name= 'google_api_callig'),
    path('<slug:slug>/', views.postDetail, name='post_detail'),
]