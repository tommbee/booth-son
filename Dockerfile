FROM php:7.1-fpm

RUN mkdir -p /home/docker/www
WORKDIR /home/docker/www

RUN apt-get update && \
    apt-get install --no-install-recommends -y libicu-dev git zlib1g-dev zip nginx supervisor && \
    apt-get clean && \
    docker-php-ext-install zip pdo opcache intl && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY docker/site.conf /etc/nginx/nginx.conf

RUN composer self-update

COPY . /home/docker/www

RUN cd /home/docker/www \
    && composer install --working-dir=/home/docker/www --no-autoloader --no-scripts --no-interaction --no-progress

RUN chown -R www-data:www-data .

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 8002

CMD service nginx start

#CMD php-fpm


#FROM webdevops/php-nginx:7.1
#
#env WEB_DOCUMENT_ROOT=/home/docker/www
#
#RUN mkdir -p /home/docker/www
#
## Install packages
#RUN apt-get update \
#    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#
#COPY composer.json composer.lock package.json /home/docker/www/
#
## Install all composer dependencies
#RUN cd /home/docker/www \
#    && composer install --working-dir=/home/docker/www --no-autoloader --no-scripts --no-interaction --no-progress
#
#COPY . /home/docker/www/
#
#RUN cd /home/docker/www \
#    && composer dump-autoload