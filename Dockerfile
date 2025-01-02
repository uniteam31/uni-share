FROM node

# INSTALL PACKAGES
RUN apt -yqq update \
    && apt -yqq install git curl nginx \
    && apt clean

# NGINX CONFIGURE
RUN rm /etc/nginx/sites-enabled/default
COPY nginx/default /etc/nginx/sites-enabled

# INSTALL YARN
RUN corepack enable
RUN yarn init -2

# SETUP .NMPRC
COPY --from=npmrc-context .npmrc /root/.npmrc

# CHECKOUT
ARG BRANCH=dev
RUN git clone https://github.com/uniteam31/unishare-frontend.git
WORKDIR /unishare-frontend
RUN git fetch --all
RUN git pull
RUN git checkout ${BRANCH}

# INSTALL DEPS
RUN yarn install
RUN yarn build

RUN rm -rf /var/www/html
RUN mv build /var/www/

# EXPOSE PORT AND START NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
