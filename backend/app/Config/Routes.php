<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (is_file(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('HomeController');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
// $routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
//$routes->setAutoRoute(false);
$routes->options('(.*)', static function () {
    return '';
});

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.

$routes->group("api", function ($routes) {
    $routes->post("login", "UserController::login"); // login user
    $routes->post("admin/login", "AdminController::login"); // login admin
    $routes->post("register", "UserController::register"); // user regist
    $routes->put("user", "UserController::update", ["filter" => 'authUserFilter']); // update user
    $routes->get("user", "UserController::index", ["filter" => 'authAdminFilter']); // get all user
    $routes->get("user/queue", "QueueController::userQueue", ["filter" => "authUserFilter"]); // get user queue

    $routes->get("poly", "PolyController::index"); // get all poly
    $routes->get("poly/counter", "PolyController::counter"); // get all poly counter number
    $routes->get("poly/(:num)/queue", "QueueController::polyQueue/$1", ["filter" => 'authAdminFilter']); // get queue on specific poly
    $routes->post("poly/(:num)/status", "PolyController::changeStatus/$1", ["filter" => 'authAdminFilter']); // update poly status, open or close

    $routes->post("queue", "QueueController::store", ["filter" => "authUserFilter"]); // create queue or regist queue
    $routes->post("queue/reset", "QueueController::reset", ["filter" => 'authAdminFilter']); // reset queue on specific poly
    $routes->post("queue/notify", "QueueController::setCheckNotification",["filter" => 'authAdminFilter']); // set check notification to current queue
    $routes->post("queue/next", "QueueController::setNextQueue", ["filter" => 'authAdminFilter']); // set current queue to completed 
    $routes->get("queue/(:num)", "QueueController::show/$1"); // get queue by id
    $routes->get("queue/(:num)/confirm-arrival", "QueueController::confirmArrival/$1", ["filter" => "authUserFilter"]); // confirm user arrival
    $routes->get("queue/(:num)/confirm-check", "QueueController::confirmCheck/$1", ["filter" => "authUserFilter"]); // confirm user checking
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
