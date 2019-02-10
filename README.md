# django-react-boilerplate
Boilerplate for applications with Django backend and React frontend

## Download and requirements

* Download or clone this repository

* Install Python (3.7), Node (I've used 9.11.2), PostgreSQL and Yarn

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

## P.S.

If you plan to regularly use this, I would suggest you to create a few python scripts and also adjust the main frontend logic to your needs.

If you found an issue or a bug, feel free to create an issue.
