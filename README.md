# autoscout24
none

###  Step 1 : Install dependencies using 
``` npm i ```


### Step 2: Install the required infra using 

``` docker-compose up ```


### Step 3: Check if kafka and redis got installed 

``` docker ps ```


### Step 4: Run tests 

``` npm run test ```


### Step 5: Build and serve 

``` npm run serve ```

### Step 6: Check the endpoints 

#### 6.1 File upload 
http://localhost:8000/

#### 6.2 Load the listings file 

#### 6.3 To get the ui 
http://localhost:8000/reports/average/price/by_seller_type

#### 6.4 To get the api 
http://localhost:8000/average/price/by_seller_type
