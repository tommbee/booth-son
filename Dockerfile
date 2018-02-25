FROM webdevops/php-nginx:7.1

env WEB_DOCUMENT_ROOT=/home/docker/www

RUN mkdir -p /home/docker/www

# Install packages
RUN apt-get update \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock package.json /home/docker/www/

# Install all composer dependencies
RUN cd /home/docker/www \
    && composer install --working-dir=/home/docker/www --no-autoloader --no-scripts --no-interaction --no-progress

COPY . /home/docker/www/

RUN cd /home/docker/www \
    && composer dump-autoload