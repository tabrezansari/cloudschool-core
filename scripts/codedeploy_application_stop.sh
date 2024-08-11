#!/bin/bash
#Stopping existing node servers
sudo chmod -R 777 /var/www/html/cloudschool-backend
echo "starting stop server"
echo "Stopping any existing node server"
pkill node