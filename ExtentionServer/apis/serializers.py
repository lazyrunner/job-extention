from rest_framework import serializers

class InputText(serializers.Serializer):
    text = serializers.CharField(max_length=5000)
    site = serializers.CharField(max_length=20)

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)