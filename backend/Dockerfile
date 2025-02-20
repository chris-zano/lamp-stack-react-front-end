# Pull an alpine image for php-8 from dockerhub
FROM php:8.1-apache

# Enable necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Initialise environment variables 
# (these will be overridden by docker-compose)
ENV DB_HOST=""
ENV DB_NAME=""
ENV DB_USER=""
ENV DB_PASS=""

# Enable Apache modules required for reverse proxy
RUN a2enmod proxy proxy_http rewrite

# Copy the PHP source code to the container
COPY . /var/www/html/

# Ensure that Apache has the right permissions to serve the PHP files
RUN chown -R www-data:www-data /var/www/html

# Copy Apache reverse proxy configuration
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Expose Apache ports
EXPOSE 80
EXPOSE 443

# Restart Apache to apply configurations
CMD ["apache2-foreground"]
