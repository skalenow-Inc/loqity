# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from datetime import timedelta
from hashlib import sha1
# Create your models here.
class User(models.Model):
    user_id = models.CharField(max_length=40, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True,null=False)
    password = models.CharField(max_length=60)
    plan = models.CharField(max_length=100, blank=True, null=True)
    user_since = models.DateTimeField(auto_now_add=True)
    organization_id = models.CharField(max_length=40, blank=True, null=True)
    confirmation_key = models.CharField(max_length=40)

    class Meta:
        db_table = 'user'


class Logs(models.Model):
    log_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=50)
    event = models.CharField(max_length=30, blank=True, null=True)
    description = models.CharField(max_length=300, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = 'logs'
        db_tablespace = 'default'

class TokenManager(models.Manager):
    def delete_session(self,*args,**kwargs):
        if "key" in kwargs:
            tokent_str = kwargs['key']
            tokens= Token.objects.filter(key=tokent_str).delete()
        return True
        
    def is_valid(self,*args,**kwargs):
        result = dict()
        result['status'] = False
        result['user'] = None
        if "key" in kwargs:
            tokent_str = kwargs['key']
            tokens= Token.objects.filter(key=tokent_str,expires_at__gte=timezone.now()).values("logity_id")
            Token.objects.filter(key=tokent_str,expires_at__lte=timezone.now()).delete()
            result['status'] = False
            result['user'] = None
            for token in tokens:
                result['user'] = token['logity_id']
                result['status'] = True
        return result
   
class Token(models.Model):
    logity_id = models.CharField(max_length=60,blank=False)
    key = models.CharField(primary_key=True, max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=False)
    user_type = models.CharField(max_length=10)
    objects = TokenManager()
    class Meta:
        db_table = 'access_tokens'
        db_tablespace = 'default'
    def save(self, *args, **kwargs):
        logity_id_str = self.logity_id
        exists ,self.key = self.generate_key(logity_id_str)
        self.expires_at = timezone.now() + timedelta(days=30)
        if not exists:
            super(Token, self).save(*args, **kwargs)
        return self.key

   
    def generate_key(self,id_):
        existing_token = None
        exists = True
        tokens = Token.objects.filter(logity_id=id_,expires_at__gte=timezone.now()).values("key")
        for token in tokens:
            existing_token = token['key']
            token = existing_token
        if existing_token is None:
            exists = False
            token = sha1(id_+ str(timezone.now())).hexdigest()
            Token.objects.filter(logity_id=id_,expires_at__lte=timezone.now()).delete()
        return exists, token

