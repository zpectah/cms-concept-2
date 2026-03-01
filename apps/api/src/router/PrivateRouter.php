<?php

namespace router;

use router\Router;
use private\ArticlesController;
use private\BlacklistController;
use private\CategoriesController;
use private\CommentsController;
use private\CustomFieldsController;
use private\FilesController;
use private\MembersController;
use private\MenuController;
use private\MenuItemsController;
use private\MessagesController;
use private\PagesController;
use private\RequestsController;
use private\SettingsController;
use private\TagsController;
use private\TranslationsController;
use private\UserController;
use private\UsersController;

class PrivateRouter extends Router {

  private static ArticlesController $articles;
  private static BlacklistController $blacklist;
  private static CategoriesController $categories;
  private static CommentsController $comments;
  private static CustomFieldsController $customFields;
  private static FilesController $files;
  private static MembersController $members;
  private static MenuController $menu;
  private static MenuItemsController $menuItems;
  private static MessagesController $messages;
  private static PagesController $pages;
  private static RequestsController $requests;
  private static SettingsController $settings;
  private static TagsController $tags;
  private static TranslationsController $translations;
  private static UserController $user;
  private static UsersController $users;

  public function __construct() {
    self::$articles = new ArticlesController();
    self::$blacklist = new BlacklistController();
    self::$categories = new CategoriesController();
    self::$comments = new CommentsController();
    self::$customFields = new CustomFieldsController();
    self::$files = new FilesController();
    self::$members = new MembersController();
    self::$menu = new MenuController();
    self::$menuItems = new MenuItemsController();
    self::$messages = new MessagesController();
    self::$pages = new PagesController();
    self::$requests = new RequestsController();
    self::$settings = new SettingsController();
    self::$tags = new TagsController();
    self::$translations = new TranslationsController();
    self::$user = new UserController();
    self::$users = new UsersController();
  }

  public function dispatch(): array {
    $url = self::getParsedUrl();
    $data = self::getParsedData();
    $model = $url['model'];

    switch ($model) {
      case 'articles':
        return self::$articles -> resolve($url, $data);

      case 'blacklist':
        return self::$blacklist -> resolve($url, $data);

      case 'categories':
        return self::$categories -> resolve($url, $data);

      case 'comments':
        return self::$comments -> resolve($url, $data);

      case 'custom-fields':
        return self::$customFields -> resolve($url, $data);

      case 'files':
        return self::$files -> resolve($url, $data);

      case 'members':
        return self::$members -> resolve($url, $data);

      case 'menu':
        return self::$menu -> resolve($url, $data);

      case 'menu-items':
        return self::$menuItems -> resolve($url, $data);

      case 'messages':
        return self::$messages -> resolve($url, $data);

      case 'pages':
        return self::$pages -> resolve($url, $data);

      case 'requests':
        return self::$requests -> resolve($url, $data);

      case 'settings':
        return self::$settings -> resolve($url, $data);

      case 'tags':
        return self::$tags -> resolve($url, $data);

      case 'translations':
        return self::$translations -> resolve($url, $data);

      case 'user':
        return self::$user -> resolve($url, $data);

      case 'users':
        return self::$users -> resolve($url, $data);

      default:
        http_response_code(404);
        return [
          'message' => 'Response from PRIVATE api service',
          'url' => $url,
          'data' => $data,
        ];

    }
  }

}
