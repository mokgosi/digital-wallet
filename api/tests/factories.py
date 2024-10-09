import factory

from ..models import *

class PostFactoUserFactoryry(factory.django.DjangoModelFactory):    
    class Meta:
        model = User
    
    username = factory.Faker('username')  
    email = factory.LazyAttribute(lambda o: '%s@example.org' % o.username)
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')