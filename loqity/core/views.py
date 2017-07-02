# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from rest_framework import status
from loqity.core.resources import *

# Create your views here.


@api_view(['POST'])
@parser_classes((JSONParser, FormParser))
def login(request):
    resp = get_login(request.data)
    return Response(resp)


@api_view(['POST'])
@parser_classes((JSONParser, FormParser))
def register(request):
    resp = get_register(request.data)
    return Response(resp)


@api_view(['POST', 'GET'])
@parser_classes((JSONParser, FormParser))
def beacon(request):
    """
    List all beacon, or create a new beacon.
    """
    data = dict()
    token = request.META.get('HTTP_AUTHORIZATION')
    user = authorize_user(token)
    if user['status']:
        id_ = user['user']
        if request.method == "GET":
            page = request.GET.get("page")
            limit = request.GET.get("limit")
            data = get_beacon(id_, page, limit)
            return Response(data)

        if request.method == "POST":
            data = request.data
            data = save_beacon(id_, data)
            status_ = status.HTTP_201_CREATED
            if not data['status']:
                status_ = status.HTTP_200_OK
            return Response(data, status=status_)
    else:
        data = dict()
        data['status'] = False
        data['Message'] = "Unauthorized"
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST', 'GET'])
@parser_classes((JSONParser, FormParser))
def place(request):
    """
    List all places, or create a new place.
    """
    data = dict()
    token = request.META.get('HTTP_AUTHORIZATION')
    user = authorize_user(token)
    if user['status']:
        id_ = user['user']
        if request.method == "GET":
            page = request.GET.get("page")
            limit = request.GET.get("limit")
            data = get_place(id_, page, limit)
            return Response(data)

        if request.method == "POST":
            data = request.data
            data = save_place(id_, data)
            status_ = status.HTTP_201_CREATED
            if not data['status']:
                status_ = status.HTTP_200_OK
            return Response(data, status=status_)
    else:
        data = dict()
        data['status'] = False
        data['Message'] = "Unauthorized"
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@parser_classes((JSONParser, FormParser))
def beacon_update(request, beacon):
    data = dict()
    token = request.META.get('HTTP_AUTHORIZATION')
    user = authorize_user(token)
    if user['status']:
        id_ = user['user']
        data = update_beacon(id_, beacon, request.data)
        return Response(data)
    else:
        data = dict()
        data['status'] = False
        data['Message'] = "Unauthorized"
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def logout(request):
    token = request.META.get('HTTP_AUTHORIZATION')
    result = dict()
    result['status'] = get_logout(token)
    return Response(result)


@api_view(['GET'])
def profile(request):
    data = dict()
    token = request.META.get('HTTP_AUTHORIZATION')
    user = authorize_user(token)
    if user['status']:
        id_ = user['user']
        data = get_session_user(id_)
        data['status'] = True
        return Response(data, status=status.HTTP_200_OK)
    else:
        data = dict()
        data['status'] = False
        data['Message'] = "Unauthorized"
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)
