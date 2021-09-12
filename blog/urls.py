from django.urls import path
from django.views.generic import TemplateView
from . import views
from django.views.decorators.csrf import csrf_exempt
app_name = 'blog'

urlpatterns = [
    # path('', TemplateView.asview(template_name="blog/index.html")),
    #path('', TemplateView.as_view(template_name="blog/index.html"),name="home"),
    path('', views.postlist, name='home'),
    path("api-profile/<id>",views.handleApiProfile,name="handleApiProfile"),
    path("api-update-profile",csrf_exempt(views.apiUpdateProfile),name="apiUpdateProfile"),
    path("api-update-password",csrf_exempt(views.handleApiChangePassword),name="handleApiChangePassword"),
    path("api-add-blogs",csrf_exempt(views.addApiBlogPage),name="addApiBlogPage"),
    path("api-update-blogs",csrf_exempt(views.editApiBlogPage),name="editApiBlogPage"),
    path("api-delete-blogs/<id>",views.deleteApiBlogPage,name="deleteApiBlogPage"),
    path("api-manage-blogs/<id>",views.handleApiManageBlogs,name="handleApiManageBlogs"),
    path("api-single-blog/<id>",views.handleApiSingleManageBlogs,name="handleApiSingleManageBlogs"),
    path("login/", views.login_request, name="login"),
    path("sidebar/", views.sidebar, name="sidebar"),
    path("profile/", views.profilePage, name="profile"),
    path("change-password/", views.changePasswordPage, name="change-password"),
    path("manage-blogs/", views.myBlogPage, name="manage-blogs"),
    path("manage-blogs/add", views.addBlogPage, name="add-manage-blogs"),
    path("manage-blogs/edit/<id>", views.editBlogPage, name="edit-manage-blogs"),
    path("manage-blogs/delete/<id>", views.deleteBlogPage, name="delete-manage-blogs"),
    path("api-login", views.api_login_request, name="api_login_request"),
    path("api-register", views.api_register_request, name="api_register_request"),
    path('about',views.about, name= 'about'),
    path('policy',views.policy, name= 'policy'),
    path('contact',views.contact, name= 'contact'),
    path('map',views.map, name= 'map'),
    path('cdc',views.cdc, name= 'cdc'),
    path('nearest/',views.nearest_of_you, name= 'nearest'),
    path('google_api',views.google_api_callig, name= 'google_api_callig'),
    path('<slug:slug>/', views.postDetail, name='post_detail'),
    path("register", views.registration, name="register"),
    path("logout", views.logout_request, name= "logout"),
    
]