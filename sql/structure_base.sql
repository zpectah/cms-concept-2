

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `categories` varchar(32) NOT NULL,
  `tags` varchar(32) NOT NULL,
  `files` varchar(32) NOT NULL,
  `event_address_street` text NOT NULL,
  `event_address_street_no` text NOT NULL,
  `event_address_district` text NOT NULL,
  `event_address_city` text NOT NULL,
  `event_address_country` text NOT NULL,
  `event_address_zip` text NOT NULL,
  `event_location` text NOT NULL,
  `event_start` varchar(32) NOT NULL,
  `event_end` varchar(32) NOT NULL,
  `author` int(11) NOT NULL,
  `editor` varchar(32) NOT NULL,  
  `approved` int(11) NOT NULL,
  `explicit` int(11) NOT NULL,  
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `articles` ADD PRIMARY KEY (`id`);
ALTER TABLE `articles` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `articles_en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `articles_en` ADD PRIMARY KEY (`id`);
ALTER TABLE `articles_en` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `parent_id` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `categories` ADD PRIMARY KEY (`id`);
ALTER TABLE `categories` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `categories_en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `categories_en` ADD PRIMARY KEY (`id`);
ALTER TABLE `categories_en` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `color` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `tags` ADD PRIMARY KEY (`id`);
ALTER TABLE `tags` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `file_type` text NOT NULL,
  `file_ext` varchar(32) NOT NULL,
  `file_size` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `files` ADD PRIMARY KEY (`id`);
ALTER TABLE `files` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `format` varchar(32) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `settings` ADD PRIMARY KEY (`id`);
ALTER TABLE `settings` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `address_street` text NOT NULL,
  `address_street_no` text NOT NULL,
  `address_district` text NOT NULL,
  `address_city` text NOT NULL,
  `address_country` text NOT NULL,
  `address_zip` text NOT NULL,
  `flat_no` varchar(32) NOT NULL,
  `sex` varchar(32) NOT NULL,  
  `birthdate` text NOT NULL,
  `description` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `members` ADD PRIMARY KEY (`id`);
ALTER TABLE `members` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `menu` ADD PRIMARY KEY (`id`);
ALTER TABLE `menu` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `menuitems` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `parent_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `link_page` int(11) NOT NULL,
  `link_url` varchar(32) NOT NULL,
  `link_order` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `menuitems` ADD PRIMARY KEY (`id`);
ALTER TABLE `menuitems` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `menuitems_en` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `menuitems_en` ADD PRIMARY KEY (`id`);
ALTER TABLE `menuitems_en` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `sender` varchar(32) NOT NULL,
  `subject` text NOT NULL,
  `content` text NOT NULL,
  `read` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `messages` ADD PRIMARY KEY (`id`);
ALTER TABLE `messages` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `meta_robots` varchar(32) NOT NULL,  
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `pages` ADD PRIMARY KEY (`id`);
ALTER TABLE `pages` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `pages_en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `pages_en` ADD PRIMARY KEY (`id`);
ALTER TABLE `pages_en` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `translations` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `translations` ADD PRIMARY KEY (`id`);
ALTER TABLE `translations` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `translations_en` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `translations_en` ADD PRIMARY KEY (`id`);
ALTER TABLE `translations_en` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;  



CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `access_rights` int(11) NOT NULL,
  `avatar_image` text NOT NULL,
  `avatar_hash` varchar(16) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `blacklist` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `ipaddress` text NOT NULL,
  `email` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `blacklist` ADD PRIMARY KEY (`id`);
ALTER TABLE `blacklist` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `token` text NOT NULL,
  `applicant` varchar(32) NOT NULL,
  `status` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `requests` ADD PRIMARY KEY (`id`);
ALTER TABLE `requests` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `customfields` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `customfields` ADD PRIMARY KEY (`id`);
ALTER TABLE `customfields` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `customfields_en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `customfields_en` ADD PRIMARY KEY (`id`);
ALTER TABLE `customfields_en` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `customfields_items` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `customfields_items` ADD PRIMARY KEY (`id`);
ALTER TABLE `customfields_items` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;













