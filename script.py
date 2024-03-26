import requests
import time
import random
import json
from datetime import datetime

def send_heartbeat(mac):
    url = "http://89.116.236.217:8080/mibandbackend/addHeartbeatClient"
    current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    data = {
        "mac": mac,
        "data1": str(random.randint(49, 100)),#HEARTBEAT
        "data2": str(random.randint(35, 45)),#TEMPERATURE
        "data3": str(random.randint(80, 160)),
        "data4": "",




        
        "date_prelevement": current_datetime
    }

    print("Data being sent:", data)  # Print the data before sending the request

    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Heartbeat sent successfully")
    else:
        print(f"Failed to send heartbeat. Error: {response.text}")

while True:
    # Récupérer la liste des clients depuis votre API
    clients_url = "http://89.116.236.217:8080/mibandbackend/listClients"
    response = requests.get(clients_url)
    
    if response.status_code == 200:
        clients = response.json()
        
        for client in clients:
            mac = client["mac"]
            send_heartbeat(mac)
    else:
        print(f"Failed to retrieve client list. Error: {response.text}")
    
    time.sleep(5)