#!/bin/bash
#Stopping existing node servers
sudo chmod -R 777 /var/www/html/cloudschool-backend
echo "Stopping any existing node server"
pkill node