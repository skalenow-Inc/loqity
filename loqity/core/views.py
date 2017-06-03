# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from rest_framework import status

from loqity.core.resources import get_login ,get_register
# Create your views here.
@api_view(['POST'])
@parser_classes((JSONParser,FormParser))
def login(request):
    resp = get_login(request.data) 
    return Response(resp)


@api_view(['POST'])
@parser_classes((JSONParser,FormParser))
def register(request):
    resp = get_register(request.data)
    return Response(resp)