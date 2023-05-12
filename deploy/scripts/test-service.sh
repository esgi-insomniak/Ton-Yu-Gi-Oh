#
# Test a service.
#
#
# Parameters:
#
#   1 - The service name to test.
#
# Usage:
#
#       .deploy/scripts/test-service.sh <service-name>
#
# Example command line usage:
#
#       .deploy/scripts/test-service.sh service
#
# This script will launch a container from the image for the service and run the test for the service.
# #################################################################################################

set -u # or set -o nounset
: "$1"

export SERVICE=$1
echo "Testing $SERVICE"

# launch a container from the image for the service
cp -f .env.dev.example .env.dev
docker-compose -f docker-compose.yml --env-file=.env.dev up -d $SERVICE-node

