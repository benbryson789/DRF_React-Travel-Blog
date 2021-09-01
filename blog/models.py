from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100,default="0")
    
    #string rep that idenditfies data item returned from datatbase which is name
    def  __str__(self):
        return self.name

#if delete category delete all posts in category
#Protect used if anyone tries to delete any category it will have no effect on the posts
#will not allow you to delete category with .Protect
class Post(models.Model):

    #custom model manager that by default filters data  by post  that are publiished
    #instead of running objects all on datat when making a query can run  post objects which will use filter and  get
    #published posts
    class PostObjects(models.Manager):
        def get_queryset(self) :
            return super().get_queryset().filter(status="published")

    options = (
        ('draft', 'Draft'),
        ('published', "Published"),
        ('pending', "Pending"),
    )


    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length = 250)
    excerpt = models.TextField(null=True)
    content = models.TextField()
    #slug is url can be used to slugigy the title to identify each post /used in lieu of id
    slug = models.SlugField(max_length=250, unique_for_date='published')
    #Image 
    image = models.ImageField(blank = True)
    #fire off each time a post is createe
    published = models.DateTimeField(default=timezone.now)

    #if user made a new post then user connected to post
    #CASCADE means if user deleted then post deleted
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(
        max_length=10,  choices=options,  default='published')
    objects = models.Manager() #default manager
    postobjects = PostObjects()  #custom manager

    #display data in ascending/descending order by published 
    class Meta:
        ordering = ('-published' ,)
        #returns title by defualt for any data returned
        def __str__(self):
            return self.title    

class Maps(models.Model):
    travel_advisory = models.CharField(max_length=255)
    advisory_level = models.CharField(max_length=255)
    date = models.DateTimeField(default=timezone.now)
    latitute = models.CharField(max_length=50)
    location_name = models.CharField(max_length=255,default="")
    longtittude  = models.CharField(max_length=50)



