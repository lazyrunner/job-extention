from nntplib import ArticleInfo
from django.urls import path
from .views import KeywordView, ResumeView

urlpatterns = [
    path('keywords/', KeywordView.as_view()),
    path('resume/', ResumeView.as_view()),
]
