# digital-wallet


## Tools used:

- Python 3.10.12
- Django 5.1.1
- Django REST Framework 3.15.2
- Git & Github

- React 18.3.1
- Bootstrap
- TypeScript
- Node 20.10.0
- NPM 10.8.1


## Setup & Configuration 

Get repo from either ```git``` or ```https``` protocol

```
$ clone git@github.com:mokgosi/digital-wallet.git
```

Run the following command to install the dependencies:

```
$ pip install -r requirements.txt
$ npm install
```

Run the following migrations commands:

```
$ python manage.py makemigrations
$ python manage.py migrate
```


Run the following command to run the server:

```
$ python manage.py runserver
$ npm start
```

Launch the front-end app http://127.0.0.1:3000/

Launch api browsable here:  http://127.0.0.1:8000/

API Endpoints:

http://127.0.0.1:8000/api/
http://127.0.0.1:8000/api/<username>
http://127.0.0.1:8000/api/accounts
http://127.0.0.1:8000/api/accounts/<account_number>
http://127.0.0.1:8000/api/transactions
http://127.0.0.1:8000/api/register



