#!/bin/sh

SERVER=$1
PORT=$2
ROUTE=$3
PARAM=$4
SLEEP_TIME=$5

curl -X POST "$SERVER:$PORT/$ROUTE?$PARAM=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fproduct%2FB00SMBFZNG"
sleep $SLEEP_TIME
