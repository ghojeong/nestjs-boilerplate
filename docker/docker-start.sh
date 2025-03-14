DOCKER_IMAGE=localdb:1.0;
DOCKER_CONTAINER=`docker ps -aq --filter ancestor=$DOCKER_IMAGE`;
CONTAINER_NAME=localdb;

docker stop $DOCKER_CONTAINER;
docker rm $DOCKER_CONTAINER;
docker rm $CONTAINER_NAME;
docker rmi $DOCKER_IMAGE;

docker build -t $DOCKER_IMAGE -f Dockerfile.localdb .;
docker run -d --name $CONTAINER_NAME -p 5432:5432 $DOCKER_IMAGE;
