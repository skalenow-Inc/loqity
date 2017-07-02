from rest_framework import serializers

from loqity.core.models import Beacon, User, Place


class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField(max_length=100)
    password = serializers.CharField()


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["user_id", "first_name", "last_name",
                  "email", "password", "confirmation_key"]


class BeaconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beacon
        fields = "__all__"


class NewBeaconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beacon
        fields = ["user", "place", "id"]


class PlaceSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super(PlaceSerializer, self).to_representation(instance)
        place_id = data['id']
        user = data['user']
        beacons = Beacon.objects.filter(place=place_id, user=user).values("id")
        data['beacon'] = beacons
        return data

    class Meta:
        model = Place
        fields = '__all__'
