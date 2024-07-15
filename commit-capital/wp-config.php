<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'i9967055_wdyl1' );

/** Database username */
define( 'DB_USER', 'i9967055_wdyl1' );

/** Database password */
define( 'DB_PASSWORD', 'H.R0Yb7RgpbOOjYStOi70' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'uzuHDbdt3NGGDOF9YacR91JQzUxeJZnrfVo4AuTnTSFqvgtgSnl0rsSFIpfgkAvJ');
define('SECURE_AUTH_KEY',  'rmXhtPHrnBn0n1GJux3jOhX80wxuJiICVuAVB441YiaTz5vCWVvERWc6wJ4EKonx');
define('LOGGED_IN_KEY',    'KIsxGl9jfNZehRyla6OZ2RpNhsUUpJBZ51ju4CjAqcRrJYTwJ27Pf6M7d9YuUJ0K');
define('NONCE_KEY',        'ww9wzTcY7KOsrA7vwdVykRaFaxlxxArFz2aBLldABOHSPnUGXgN0tMtUvsauRRib');
define('AUTH_SALT',        'IVoWD3hPQv1LzQ4CMczawv7E9aSeS3lzGKWdzzvyFIp4nvIKwfCdV8UDzWE5Ayg0');
define('SECURE_AUTH_SALT', 'DmHwFdtdrbCyOcuhiFc5iLrsJlMIG2XVIQbMv2EYSifkBlqXgNNTt5pq6AWh3ERl');
define('LOGGED_IN_SALT',   'VrwvWFR8dvmD4tbqTeH46nNhigybm1d3WSrmyOGTJ9PlkcyRS9BgEg6yDAgb3ds4');
define('NONCE_SALT',       'F2CiG7PtVdhLtoCVK4UdhnBdD4VuA1YHWIKYBVo6kf9aL4R0rGnLaWqPAe3FCpq1');

/**
 * Other customizations.
 */
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'qq0p_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
