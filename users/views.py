from django.contrib.auth.models import User
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.shortcuts import render, redirect

from .tokens import account_activation_token


def send_confirmation_email(user, current_site):
    subject = 'Activate your Posts account'
    message = render_to_string('account_activation_email.html', {
        'user': user,
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(),
        'token': account_activation_token.make_token(user),
    })

    user.email_user(subject, message)


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user_profile = user.user_profile

        user.is_active = True
        user_profile.email_confirmed = True
        user.save()
        user_profile.save()

        return redirect('/login')
    else:
        return redirect('/confirmation-failed')
