from os import set_inheritable
from rest_framework import serializers

class InputText(serializers.Serializer):
    text = serializers.CharField(max_length=5000)
    site = serializers.CharField(max_length=20)

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class StringListField(serializers.ListField):
    child = serializers.CharField()

class ResumeText(serializers.Serializer):
    site = serializers.CharField(max_length=20)
    skills = serializers.ListSerializer(child=serializers.CharField())