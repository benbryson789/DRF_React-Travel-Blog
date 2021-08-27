from django.urls import path
from .views import PostList, PostUpdate, Postcrud
from .views import PostDetail

app_name = 'blog_api'

urlpatterns = [
#     #path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
#     #path('<int:pk>/', PostUpdate.as_view(), name='update'),
    path('<int:pk>/', Postcrud.as_view(), name='update'),
    path('', PostList.as_view(), name="listcreate"),

]


# urlpatterns = [
#     #path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
#     #path('<int:pk>/', PostUpdate.as_view(), name='update'),
#     #commented out below aug 27 2021

#     path('<int:pk>/', Postcrud.as_view(), name='update'),
#     path('', PostList.as_view(), name="listcreate"),

# ]