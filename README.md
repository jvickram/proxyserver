# Steps for creating and hosting the node-backend server with a load balancer with weighted Round-Robin method

# Step 1: Setup Nginx

# nginx setup guide for mac
https://medium.com/@rprprasath05/installing-nginx-in-macos-ventura-using-homebrew-12b87a900a03

# Step 2 : Setting up the virtual host
    1. Create a index.html file in /var/www/test.com/html
    2. Add it to the /etc/hosts like this
        127.0.0.1 test.com
    Note: Check this if having issues https://youtu.be/uWG8HygJHbw?feature=shared

# Step 3 : nginx.conf setup for proxy and loadbalancer
# Add the following to the nginx.conf file from /opt/homebrew/etc/nginx/nginx.conf if you are using a mac m1/m2
```
upstream node_backend {
	server localhost:3000 weight=3;  # Server 1 with bigger resources
        server localhost:3001;       # Server 2
        server localhost:4000;       # Server 3
	}
	server {
	    listen 80;
	    server_name test.com.com www.test.com;
	    location / {
		proxy_set_header   X-Real-IP $remote_addr;
		proxy_set_header   Host      $http_host;
		proxy_pass         http://node_backend;
	}
}
```

# Step 4 : App installation
    1. Clone the application, through terminal/ cmd
        git clone https://github.com/jvickram/proxyserver.git
    2. Navigate to "proxyserver"
        cd proxyserver
    3. Install the packages
        npm install

# Step 5: Testing the server
    1. Open first terminal and run
        PORT=3000 node server.js / node server.js -p 3000
    2. Open second terminal and run
        PORT=3001 node server.js / node server.js -p 3001
    3. Open third terminal and run
        PORT=4000 node server.js / node server.js -p 4000
    4. If on mac
        Open fourth terminal and run
        curl test.com/api  ---> Run this multple times and check on the other terminals which port is hit

       If on Windows
        Open Browser and run test.com/api ---> Refresh multple times and check on the other terminals which port is hit

        
