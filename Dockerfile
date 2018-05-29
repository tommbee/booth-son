FROM php:7.1-fpm

RUN mkdir -p /home/docker/www
WORKDIR /home/docker/www

EXPOSE 8001

RUN apt-get update && \
    apt-get install --no-install-recommends -y libicu-dev git zlib1g-dev zip nginx supervisor && \
    apt-get clean && \
    docker-php-ext-install zip pdo opcache intl && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY docker/site.conf /etc/nginx/nginx.conf

COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN composer self-update

COPY . /home/docker/www

RUN cd /home/docker/www \
    && composer install --working-dir=/home/docker/www --no-interaction --no-progress

RUN chown -R www-data:www-data .

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]