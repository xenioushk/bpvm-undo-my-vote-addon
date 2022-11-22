<?php

/**
 * @package BpvmUmv
 */

namespace BpvmUmv\Inc;

use BpvmUmv\Inc\Base\PluginInfo;

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

  public static function displayPluginRequirementsNotice()
  {
    ob_start();

?>

<div class="updated">
  <p>You need to download and install <strong><a href="<?php echo PluginInfo::$parentPluginUrl ?>" target="_blank"
        title="<?php echo PluginInfo::$parentPlugin ?>"><?php echo PluginInfo::$parentPlugin ?>
        (<?php echo PluginInfo::$parentPluginReqVer ?>)</a></strong>
    to use <strong><?php echo PluginInfo::$pluginName ?></strong>.
  </p>
</div>

<?php

    echo ob_get_clean();
  }

  public static function registerServices()
  {

    if (PluginInfo::getRequiredPluginInstallationStatus() == 0)
      add_action('admin_notices', [self::class, 'displayPluginRequirementsNotice']);
    return false;

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