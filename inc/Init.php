<?php

/**
 * @package BpvmPlugin
 */

namespace BpvmUmv\Inc;

class Init
{

  public static function getServices()
  {

    return [
      // Pages\PmApi::class,
      Base\Enqueue::class,
      Base\Language::class,
      // Base\QuerySupport::class,
      // Pages\CustomColumns::class,
      // Pages\CustomTheme::class
      // Pages\CaseStudyCpt::class,
      Shortcodes\Shortcodes::class,
    ];
  }

  public static function registerServices()
  {

    foreach (self::getServices() as $service) {

      $service = self::instantiate($service);

      if (method_exists($service, 'register')) {
        $service->register();
      }
    }
  }

  private static function instantiate($class)
  {

    return new $class();
  }
}