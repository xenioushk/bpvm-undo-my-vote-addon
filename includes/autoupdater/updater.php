<?php

$updaterBase = 'https://projects.bluewindlab.net/wpplugin/zipped/plugins/';
$pluginRemoteUpdater = $updaterBase . 'bpvm/notifier_umv.php';
new WpAutoUpdater(BPVMUMV_ADDON_CURRENT_VERSION, $pluginRemoteUpdater, BPVMUMV_UPDATER_SLUG);
