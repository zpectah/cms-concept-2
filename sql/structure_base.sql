

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

ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

CREATE TABLE `articles_en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;










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

ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

CREATE TABLE `categories_en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;










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

ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;










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

ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;





