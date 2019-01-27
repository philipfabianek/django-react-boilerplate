from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def default_context_processor(request):
    context = {
        'bundle_css_path': 'bundle.css',
        'bundle_js_path': 'bundle.js',
    }

    return context
