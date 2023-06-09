@ECHO
SET mypath=%~dp0
echo %mypath:~0,-1%
cd %mypath:~0,-1%
ECHO Start building ms-account.
cd ../../
docker build -t localhost:5000/ms-account .
ECHO Start pushing ms-account.
docker push localhost:5000/ms-account
cd .\deploy\ms-account-deploy
ECHO Create sidecar components.
kubectl apply  -f .
@REM kubectl replace  -f .
PAUSE