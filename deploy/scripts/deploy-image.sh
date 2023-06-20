#
# Deploy a Docker image.
#
# Environment variables:
#
#   CONTAINER_REGISTRY - The hostname of your container registry.
#
# Parameters:
#
#   1 - The path to the code for the image and the name of the image.
#
# Usage:
#
#       .deploy/scripts/deploy-image.sh <image-name>
#
# Example command line usage:
#
#       .deploy/scripts/deploy-image.sh service
#
# #################################################################################################

set -u # or set -o nounset
: "$1"
: "$CONTAINER_REGISTRY"

export DIR=$1
echo "Deploying $CONTAINER_REGISTRY/ton-yugi-$DIR:$VERSION"
sed -i "s|image: $CONTAINER_REGISTRY/ton-yugi-$DIR:{{VERSION}}|image: $CONTAINER_REGISTRY/ton-yugi-$DIR:$VERSION|g" ./deploy/k8s/$DIR/$DIR.yml