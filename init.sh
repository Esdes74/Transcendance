#!/bin/bash

ifconfig | grep -A 3 enp | grep 'inet' | grep -v "127.0.0.1" | awk '{print $2}' | head -n 1

sed 