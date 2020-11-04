"""
core URL Configuration
https://docs.djangoproject.com/en/3.1/topics/http/urls/
"""
from django.conf import settings
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import include, path
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.settings import api_settings

# Admin settings
admin.site.site_header = "Home administration"
admin.site.site_title = "Home admin"
admin.site.index_title = "Administration"
admin.site.enable_nav_sidebar = False


class DRFAuthenticateGraphQLView(GraphQLView):
    def parse_body(self, request):
        if isinstance(request, Request):
            return request.data
        return super(DRFAuthenticateGraphQLView, self).parse_body(request)

    @classmethod
    def as_view(cls, *args, **kwargs):
        view = super(DRFAuthenticateGraphQLView, cls).as_view(*args, **kwargs)
        view = permission_classes((IsAuthenticated,))(view)
        view = authentication_classes(api_settings.DEFAULT_AUTHENTICATION_CLASSES)(view)
        view = api_view(["GET", "POST"])(view)
        return view


urlpatterns = [
    # admin site
    path("admin/doc/", include("django.contrib.admindocs.urls")),
    path("admin/", admin.site.urls),
    # user authentication
    path("users/", include("apps.users.urls")),
    # graphql endpoints
    path("graphql/", DRFAuthenticateGraphQLView.as_view(graphiql=True)),
    # rest api endpoints
    path("api/users/", include("apps.users.rest.urls")),
    # frontend template path
    path(
        "",
        login_required(TemplateView.as_view(template_name="frontend.html")),
        name="frontend",
    ),
]


# Enable media and static files in debug mode
if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
