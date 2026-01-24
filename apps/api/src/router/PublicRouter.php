<?php

namespace router;

use router\Router;
use public\ArticlesController;
use public\BlacklistController;
use public\CategoriesController;
use public\CommentsController;
use public\CustomFieldsController;
use public\FilesController;
use public\MemberController;
use public\MembersController;
use public\MenuController;
use public\MenuItemsController;
use public\MessagesController;
use public\PagesController;
use public\RequestsController;
use public\SettingsController;
use public\TagsController;
use public\TranslationsController;
use public\UsersController;

class PublicRouter extends Router {

  public function dispatch(): array {
    $url = self::getParsedUrl();
    $data = self::getParsedData();

    $model = $url['model'];

    switch ($model) {

      case 'articles':
        $articles = new ArticlesController;
        return $articles -> resolve($url, $data);

      case 'blacklist':
        $blacklist = new BlacklistController;
        return $blacklist -> resolve($url, $data);

      case 'categories':
        $categories = new CategoriesController;
        return $categories -> resolve($url, $data);

      case 'comments':
        $comments = new CommentsController;
        return $comments -> resolve($url, $data);

      case 'custom-fields':
        $customFields = new CustomFieldsController;
        return $customFields -> resolve($url, $data);

      case 'files':
        $files = new FilesController;
        return $files -> resolve($url, $data);

      case 'member':
        $member = new MemberController;
        return $member -> resolve($url, $data);

      case 'members':
        $members = new MembersController;
        return $members -> resolve($url, $data);

      case 'menu':
        $menu = new MenuController;
        return $menu -> resolve($url, $data);

      case 'menu-items':
        $menu = new MenuItemsController;
        return $menu -> resolve($url, $data);

      case 'messages':
        $messages = new MessagesController;
        return $messages -> resolve($url, $data);

      case 'pages':
        $pages = new PagesController;
        return $pages -> resolve($url, $data);

      case 'requests':
        $requests = new RequestsController;
        return $requests -> resolve($url, $data);

      case 'settings':
        $settings = new SettingsController;
        return $settings -> resolve($url, $data);

      case 'tags':
        $tags = new TagsController;
        return $tags -> resolve($url, $data);

      case 'translations':
        $translations = new TranslationsController;
        return $translations -> resolve($url, $data);

      case 'users':
        $users = new UsersController;
        return $users -> resolve($url, $data);

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
