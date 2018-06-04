# INIT BEGIN

import os
import platform
import paho.mqtt.client as mqtt
import configparser
import psutil
import time
import socket

config = configparser.ConfigParser()
config.sections()
config.read("config.cfg")
sIP = config["DEFAULT"]["ServerIP"]
sPort = config["DEFAULT"]["ServerPort"]
UID = "Computer2"
deviceTopic = "devices/"+UID

def on_connect(client, userdata, flags, rc):
    client.subscribe("devices/#")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(sIP, int(sPort), 60)

# INIT FINISHED

hostname = socket.gethostname()
IP = socket.gethostbyname(hostname)

while True:
    CPU = str(psutil.cpu_percent())
    RAM = str(psutil.virtual_memory().percent)
    client.publish(deviceTopic, UID+","+CPU+","+RAM+","+IP)
    time.sleep(0.1)
