from django import template

from ..loader import get_manifest, get_path

register = template.Library()


@register.tag("webpack_manifest")
def do_manifest(parser, token):
    return ManifestNode(token)


class ManifestNode(template.Node):
    def __init__(self, token):
        token = token.split_contents()

        if len(token) < 2:
            raise template.TemplateSyntaxError(f"'{token[0]}' takes a single argument")

        self.key = token[1]

    def render(self, context):
        manifest = get_manifest()
        manifest_key = get_path(self.key, context)

        manifest_value = manifest.get(manifest_key, manifest_key)
        return manifest_value
