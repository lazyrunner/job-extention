from nntplib import ArticleInfo
from django.urls import path
from .views import KeywordView

urlpatterns = [
    path('keywords/', KeywordView.as_view()),    
]
