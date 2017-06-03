from loqity.core.serializers import LoginSerializer ,RegistrationSerializer
from hashlib import sha1
from loqity.core.models import User ,Logs , Token
from django.utils import timezone

def update_logs(user_id,event,description):
    Logs(user_id=user_id,event=event,description=description).save()

def get_login(req_data):
    login_serializer = LoginSerializer(data=req_data) 
    if login_serializer.is_valid():
        username = req_data['username']
        password = req_data['password']
        password = sha1(password).hexdigest()
        response=dict()
        data = User.objects.filter(email=username,password=password).values("user_id","email")
        if len(data) > 0 :
            id_ = data[len(data)-1]['user_id']
            token = Token(logity_id=id_,user_type="user").save()
            response['status'] = True
            response['message'] = "Logged In"
            desc = "UserLogged into System"
            response['token'] = token
            response['id'] = id_
            update_logs(id_, "UserLogin", desc)
        else:
            response['status'] = False
            response['message'] = "Invalid Credentials"
    else:
        response = dict()
        response['data'] = login_serializer.errors
        response['status'] = False
    return response

def get_register(data):
    flag = 0
    if 'email' in data:
        flag = flag + 1
    if 'password' in data:
        flag = flag + 1 
    if flag == 2 :
        user_id = sha1(data['email']).hexdigest()
        data['user_id'] = user_id
        data['password'] = sha1(data['password']).hexdigest()
        SALT_STRING_CONF = "loqity"+ str(timezone.now())
        data['confirmation_key'] = sha1(user_id+SALT_STRING_CONF).hexdigest()
    serializer = RegistrationSerializer(data=data)
    response = dict()
    if serializer.is_valid():
        serializer.save()
        desc = "registered into system"
        update_logs(data['user_id'],"Registration",desc)
        response['status'] = True
    else :
        response['status'] = False
        response['message'] = serializer.errors
    return response