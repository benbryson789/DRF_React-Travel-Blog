from django.db import models
# post assciated with user
from django.contrib.auth.models import User
# timestamp post
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100,default="0")
    
    #default string rep that idenditfies item  shown in datatbase which is name
    def  __str__(self):
        return self.name



class Post(models.Model):

    #post objects custom model manager that by default returns data from database and outputs data
    # default instead of running objects all on data when making a query can run  post objects which will  filter and  get
    #published posts
    # if post flagged as published will return published post
    class PostObjects(models.Manager):
        def get_queryset(self) :
            return super().get_queryset().filter(status="published")

    options = (
        ('draft', 'Draft'),
        ('published', "Published"),
        ('pending', "Pending"),
    )

    #usually if delete category delete all posts in category but with .Protect
    # .Protect/if delete category it has no effect on the post
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length = 250)
    excerpt = models.TextField(null=True)   
    content = models.TextField()
    #slug is url can be used to slugify the title to identify each post /used in lieu of id to collect data
    slug = models.SlugField(max_length=250, unique_for_date='published')
    #Image 
    image = models.ImageField(blank = True)
    #fire off each time a post is created/timezone
    published = models.DateTimeField(default=timezone.now)

    #if user made a new post then user connected to post
    #CASCADE means if user deleted a post  is deleted
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



