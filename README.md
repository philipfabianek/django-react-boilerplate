# django-react-boilerplate (currently in development)
Boilerplate for applications with Django backend and React frontend

## Backend setup

1.  Create virtualenv

2.  Activate virtualenv

```
.\env\Scripts\activate
```

3.  Install required packages

```
pip install -r requirements.txt
```

4.  Setup your DB, create your localsettings.py based on example

```
# DB and email config /djangoreact/localsettings.py
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your db name',
        'USER': 'your db user',
        'PASSWORD': 'your db password',
        'HOST': '127.0.0.1',
        'PORT': 5432,
    }
}
```

5.  Initial migration

```
python manage.py migrate
```

6.  Develop

```
python manage.py runserver
```

## Frontend setup

1.  Install NPM modules

```
yarn
```

2.  Develop

```
yarn start
```

## Build

Create frontend bundle

```
yarn run build
```

Run server

```
python manage.py runserver
```
