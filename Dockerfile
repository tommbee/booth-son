FROM php:7.0-fpm

WORKDIR /home/docker/www

# Install packages
RUN apt-get update \
	&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
	&& apt-get install --no-install-recommends --no-install-suggests -y \
        ca-certificates \
        nginx \
        apt-transport-https \
        apt-utils \
        libicu-dev \
        ant \
        git \
        zip \
        unzip \
        supervisor \
        nodejs \
    && npm install -g node-sass \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable docker extensions
RUN pecl install apcu apcu_bc-1.0.3 \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-enable apcu --ini-name 10-docker-php-ext-apcu.ini \
    && docker-php-ext-enable apc --ini-name 20-docker-php-ext-apcu-bc.ini \
    && docker-php-ext-enable opcache --ini-name 10-docker-php-ext-opcache.ini \
    && { \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=0'; \
		echo 'opcache.fast_shutdown=1'; \
		echo 'opcache.enable_cli=1'; \
        echo 'opcache.enable=1'; \
	} > /usr/local/etc/php/conf.d/10-opcache-custom.ini

# Copy CLI safe PHP configuration files before installing Xdebug and creates links to nginx logs
RUN mkdir /usr/local/etc/php/conf.d/cli \
    && cp -r /usr/local/etc/php/conf.d/*.ini /usr/local/etc/php/conf.d/cli \
    && cat /usr/local/etc/php/conf.d/cli/*.ini > /usr/local/etc/php/conf.d/cli/php.ini \
    && rm -rf /var/lib/apt/lists/* \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

COPY docker/supervisord.conf /etc/supervisord.conf
COPY composer.json composer.lock package.json /home/docker/www/

RUN composer self-update

# Install all composer dependencies
RUN cd /home/docker/www \
    && composer install --working-dir=/home/docker/www --no-autoloader --no-scripts --no-interaction --no-progress

COPY . /home/docker/www/

RUN cd /home/docker/www \
    && composer dump-autoload

# Set up Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug --ini-name 30-docker-php-ext-xdebug.ini \
    && touch /var/log/xdebug_remote.log \
    && { \
        echo 'error_reporting = E_ALL'; \
        echo 'display_startup_errors = On'; \
        echo 'display_errors = On'; \
        echo 'xdebug.remote_enable=1'; \
        echo 'xdebug.remote_connect_back=0'; \
        echo 'xdebug.remote_port=9001'; \
        echo 'xdebug.remote_handler=dbgp'; \
        echo 'xdebug.remote_autostart=true'; \
        echo 'xdebug.remote_mode=req'; \
        echo 'xdebug.remote_host=10.254.254.254'; \
        echo 'xdebug.remote_log=/var/log/xdebug_remote.log'; \
        echo 'xdebug.idekey=docker'; \
    } > /usr/local/etc/php/conf.d/30-xdebug-custom.ini

EXPOSE 8000

CMD ["supervisord", "-c", "/etc/supervisord.conf"]