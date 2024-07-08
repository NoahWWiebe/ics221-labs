from rest_framework import generics
from .models import Msg
from .serializers import MsgSerializer

# Create your views here.
class MsgAPIController(generics.ListCreateAPIView):
    queryset = Msg.objects.all()
    serializer_class = MsgSerializer