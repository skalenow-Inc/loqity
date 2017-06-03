from rest_framework import serializers
from loqity.core.models import User

class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField(max_length=100)
    password = serializers.CharField()

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["user_id","first_name","last_name","email","password","confirmation_key"]