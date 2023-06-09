@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
ECHO Start building ms-task.
cd ../../
docker build -t localhost:5000/ms-task .
ECHO Start pushing ms-task.
docker push localhost:5000/ms-task
cd .\deploy\ms-task-deploy
ECHO Create sidecar components.
kubectl apply  -f .
@REM kubectl replace  -f .
PAUSE