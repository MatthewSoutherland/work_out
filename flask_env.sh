#!/bin/bash

output_file="flask_environment.txt"

declare -a vars=(
  "FLASK_APP"
  "FLASK_ENV"
  "FLASK_DEBUG"
  "FLASK_RUN_HOST"
  "FLASK_RUN_PORT"
  "FLASK_RUN_CERT"
  "FLASK_RUN_KEY"
  "DATABASE_URL"
  "SQLALCHEMY_DATABASE_URI"
  "MAIL_SERVER"
  "MAIL_PORT"
  "MAIL_USE_TLS"
  "MAIL_USE_SSL"
  "MAIL_USERNAME"
  "MAIL_PASSWORD"
  "MAIL_DEFAULT_SENDER"
  "SECRET_KEY"
  "SECURITY_PASSWORD_SALT"
  "SESSION_TYPE"
  "SESSION_PERMANENT"
  "SESSION_FILE_DIR"
  "SESSION_FILE_THRESHOLD"
  "LANGUAGES"
  "LOGGING_CONFIG"
  "APPLICATION_ROOT"
)

echo "Flask Environment Variables:" > $output_file
echo "----------------------------" >> $output_file

for var in "${vars[@]}"
do
  value=$(printenv $var)
  if [ ! -z "$value" ]; then
    echo "$var=$value" >> $output_file
  else
    echo "$var is not set" >> $output_file
  fi
done

echo "Data written to $output_file"
