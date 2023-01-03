#!/bin/bash
npm install

mkdir "./config"
mkdir "./config/jwt"
touch "./config/jwt/.gitignore"
echo "*" >"./config/jwt/.gitignore"
ssh-keygen -t rsa -f "./config/jwt/key"
