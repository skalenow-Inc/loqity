from hashlib import sha1

from django.utils import timezone

from loqity.core.models import Beacon, Logs, Place, Token, User
from loqity.core.serializers import (BeaconSerializer, LoginSerializer,
                                     NewBeaconSerializer, PlaceSerializer,
                                     RegistrationSerializer)


def update_logs(user_id, event, description):
    Logs(user_id=user_id, event=event, description=description).save()


def authorize_user(token):
    t = Token.objects.is_valid(key=token)
    return t


def get_session_user(user_id):
    data = User.objects.filter(user_id=user_id).values(
        "user_id", "first_name", "display_picture").get()
    return data


def get_login(req_data):
    login_serializer = LoginSerializer(data=req_data)
    if login_serializer.is_valid():
        username = req_data['username']
        password = req_data['password']
        password = sha1(password).hexdigest()
        response = dict()
        data = User.objects.filter(
            email=username, password=password).values("user_id", "email")
        if len(data) > 0:
            id_ = data[len(data) - 1]['user_id']
            token = Token(logity_id=id_, user_type="user").save()
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
    if flag == 2:
        user_id = sha1(data['email']).hexdigest()
        data['user_id'] = user_id
        data['password'] = sha1(data['password']).hexdigest()
        SALT_STRING_CONF = "loqity" + str(timezone.now())
        data['confirmation_key'] = sha1(user_id + SALT_STRING_CONF).hexdigest()
    serializer = RegistrationSerializer(data=data)
    response = dict()
    if serializer.is_valid():
        serializer.save()
        desc = "registered into system"
        update_logs(data['user_id'], "Registration", desc)
        response['status'] = True
    else:
        response['status'] = False
        response['message'] = serializer.errors
    return response


def get_beacon(user_id, page, limit):
    if not page:
        page = 0
    if not limit:
        limit = 10
    beacons = Beacon.objects.filter(
        user=User.objects.filter(user_id=user_id).get()).order_by("-updated_at")[page:limit]
    s_data = BeaconSerializer(beacons, many=True)
    return s_data.data


def save_beacon(user, req_data):
    result = dict()
    req_data = req_data.copy()
    user = User.objects.filter(user_id=user).get()
    req_data['user'] = user.user_id
    serializer = NewBeaconSerializer(data=req_data)
    if serializer.is_valid():
        serializer.save()
        result['status'] = True
    else:
        result['status'] = False
        result['errors'] = serializer.errors
    return result


def get_place(user_id, page, limit):
    if not page:
        page = 0
    if not limit:
        limit = 10
    beacons = Place.objects.filter(
        user=User.objects.filter(user_id=user_id).get()).order_by("-updated_at")[page:limit]
    s_data = PlaceSerializer(beacons, many=True)
    return s_data.data


def save_place(user, req_data):
    result = dict()
    req_data = req_data.copy()
    req_data['user'] = user
    if "name" and "address" in req_data:
        place_id = sha1(sha1(req_data['name']).hexdigest(
        ) + sha1(req_data['address']).hexdigest()).hexdigest()
        req_data['id'] = place_id
    user = User.objects.filter(user_id=user).get()
    serializer = PlaceSerializer(data=req_data)
    if serializer.is_valid():
        serializer.save()
        result['status'] = True
    else:
        result['status'] = False
        result['errors'] = serializer.errors
    return result


def update_beacon(user, beacon, req_data):
    result = dict()
    req_data = req_data.copy()
    beacon = Beacon.objects.filter(id=beacon).get()
    if "battery" in req_data:
        try:
            battery = int(req_data['battery'])
            if battery <= 100 and battery >= 0:
                beacon.battery = req_data['battery']
                result['status'] = True
                beacon.save()
            else:
                result['error'] = "Invalid Params (0-100)"
        except ValueError:
            result['error'] = "Invalid Params required Int"
    elif "mode" in req_data:
        beacon.mode = req_data['mode']
        result['status'] = True
        beacon.updated_at = timezone.now()

        beacon.save()
    else:
        result['status'] = False
    return result


def get_logout(token):
    Token.objects.delete_session(key=token)
    return True
