#!/bin/bash
LOGFILE="/tmp/codedeploy_application_stop.log"
echo "Stopping any existing node server" > $LOGFILE
sudo pm2 stop all >> $LOGFILE 2>&1

if [ $? -ne 0 ]; then
  echo "Failed to stop node server" >> $LOGFILE
  exit 1
fi

echo "Node server stopped successfully" >> $LOGFILE
exit 0
