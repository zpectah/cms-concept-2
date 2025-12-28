<?php

require PATH_ROOT . 'vendor/autoload.php';

require PATH_ROOT . 'env.php';
require PATH_ROOT . 'config/constants.php';

require_once PATH_ROOT . 'router/Router.php';
require_once PATH_ROOT . 'router/PrivateRouter.php';
require_once PATH_ROOT . 'router/PublicRouter.php';

require_once PATH_ROOT . 'model/Model.php';
require_once PATH_ROOT . 'model/Articles.php';
require_once PATH_ROOT . 'model/Blacklist.php';
require_once PATH_ROOT . 'model/Categories.php';
require_once PATH_ROOT . 'model/Comments.php';
require_once PATH_ROOT . 'model/CustomFields.php';
require_once PATH_ROOT . 'model/CustomFieldsItems.php';
require_once PATH_ROOT . 'model/Files.php';
require_once PATH_ROOT . 'model/Members.php';
require_once PATH_ROOT . 'model/Menu.php';
require_once PATH_ROOT . 'model/MenuItems.php';
require_once PATH_ROOT . 'model/Messages.php';
require_once PATH_ROOT . 'model/Pages.php';
require_once PATH_ROOT . 'model/Requests.php';
require_once PATH_ROOT . 'model/Settings.php';
require_once PATH_ROOT . 'model/Tags.php';
require_once PATH_ROOT . 'model/Translations.php';
require_once PATH_ROOT . 'model/Users.php';
