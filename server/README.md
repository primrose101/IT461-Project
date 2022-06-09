# techmart 

# IM - Django setup

1. make virtual environment named env
2. turn on virtual environment
3. pip install -r requirements.txt
4. python manage.py migrate
5. python manage.py createsuperuser
6. python manage.py runserver

other prerequisites:
- run XAMPP and start APACHE and SQL
   - go to http://localhost/phpmyadmin/sql
- if updated models: 
    - python manage.py make migrations
    - python manage.py migrate

# Update for Advanced web:
- no need to run XAMPP
- additional requirements:
    - pip intstall -r requirements.txt
- implemented url endpoints
    - customer/v1/customers and customer/v1/customers/<id>
        - Methods: GET,POST,PUT, PATCH, DELETE
    - dashboard/v1/products and dashboard/v1/products/<id>
        - Methods: GET,POST,PUT, PATCH, DELETE
    - dashboard/v1/orders and dashboard/v1/orders/<id>
        - Methods: GET,POST,DELETE
- Notes
    - Delete Example for multiple deletions :
    [
        {
            "id": "1"
        },
        {
            "id": "2"
        },
    ]
- Token is integrated for every method
    - place token in request header
    - see [customer.http](MySample/MySample/customer/customer.http) and [dashboard.http](MySample/MySample/dashboard/dashboard.http) for examples

## Filtering and Searching with URL
- Filtering Example (http://127.0.0.1:8000/customer/v1/customers/?lastname=Cruz&address=Cebu City&username__contains=123)
- Searching Example (http://127.0.0.1:8000/customer/v1/customers/?search=a)
- Specific Fields Example (http://127.0.0.1:8000/customer/v1/customers/?fields=username,contact)
- Combination Example (can be in any order) (http://127.0.0.1:8000/accounts/v1/customers/?fields=username,contact&username=a&address=Cebu City&search=a)

## Requesting and Verifying Tokens
   - see [auth.http](MySample/MySample/jwt_auth/auth.http) for example
   ### host/v1/auth/token (Request Token Responses)
   - { "token": "eyJ0..." }
   - { "error": "Invalid username or password." }
   ### host/v1/auth/verify (Verify Token Responses)
   - { "detail": "Token is valid." }
   - { "detail": "Token has expired." }
   - { "detail": "Token is invalid." }
