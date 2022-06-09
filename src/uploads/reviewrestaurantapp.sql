-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2021 at 02:54 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reviewrestaurantapp`
--
CREATE DATABASE IF NOT EXISTS `reviewrestaurantapp`

USE `reviewrestaurantapp`
-- --------------------------------------------------------

--
-- Table structure for table `reply`
--

CREATE TABLE `reply` (
  `id` int(11) NOT NULL,
  `reply` varchar(500) NOT NULL,
  `review_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reply`
--

INSERT INTO `reply` (`id`, `reply`, `review_id`, `restaurant_id`, `is_active`, `created_at`) VALUES
(17, 'Thanks so much for sharing your experience with us. We hope to see you again soon.', 25, 12, 1, '2021-08-11 03:48:07'),
(18, 'We really appreciate you taking the time to share your rating with us. We look forward to seeing you again soon.', 16, 5, 1, '2021-08-11 04:53:42'),
(19, 'Thank you so much for taking the time to leave an excellent rating. We really appreciate your business. Please let us know what we can do for you in the future.', 13, 5, 1, '2021-08-11 04:53:46'),
(20, 'Thank you so much for taking the time to leave us a rating.', 12, 3, 1, '2021-08-11 04:53:54'),
(21, 'Thank you so much for your 5-star review! We will share this with the store team to let them know to keep up the amazing work.', 18, 6, 1, '2021-08-11 04:54:10'),
(22, 'Thank you so much for taking the time to leave us a 5 star rating - it''s much appreciated!', 15, 6, 1, '2021-08-11 06:05:11');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `image` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `owner_id`, `image`, `is_active`) VALUES
(1, 'Trikuharri Taberna Jatetxea', 31, '1.jpg', 1),
(2, 'Eme Be Garrote', 33, '1.jpg', 1),
(3, 'Old Town Coffee', 31, '8.jpg', 1),
(4, 'Misura', 31, '1.jpg', 1),
(5, 'Gure Txoko', 31, '10.jpg', 1),
(6, 'Tedone Jatetxea', 31, '4.jpg', 1),
(7, 'Mendaur Berria', 31, '1.jpg', 1),
(8, 'Txulotxo', 33, '1.jpg', 1),
(9, 'Mugaritz', 31, '9.jpg', 1),
(10, 'La Rampa', 33, '1.jpg', 1),
(11, 'Arzak', 33, '7.jpg', 1),
(12, 'Akelarre', 31, '9.jpg', 1),
(13, 'Martin Berasategui', 31, '7.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `visit_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `restaurant_id`, `rating`, `comment`, `is_active`, `created_at`, `visit_at`) VALUES
(1, 26, 3, 5, 'I’ll just say that we had to come back every night of our stay in San Sebastian. I agree with the very positive reviews. Service is kind and professional. Amane was amazing ! Food is just perfect. The salmorejo, solomillo and txistorra are truly remarkable. Not to miss in case you are near Ondarreta beach and, if somewhere else in San Sebastián, go at least once. You won’t be disappointed!, excellent', 1, '2021-08-07 04:23:00', '2021-08-06'),
(2, 26, 4, 5, 'delicious, excellent', 1, '2021-08-07 04:23:37', '2021-08-06'),
(4, 30, 7, 5, 'This place is part of the hotel Arima and located in the cellar / ground floor of the hotel. I was a bit disappointed because we visited Misura on a Friday evening, prime time and there was only one other table occupied. The tables give you a grand view on the glass paneled kitchen. Impressive you see all the works. We started with tuna which was good, but lacked the smoothness as you might expect. I took the pork roast which a bit too difficult to cut. Coffee, espresso was fine. Not a cheap option, you dine in an fine ambience but the empty chairs around you makes you wonder.', 1, '2021-08-07 07:00:18', '2021-08-07'),
(5, 30, 6, 5, 'Small local but quality very good. Menu with a lot of Basque product, you can choose different type of dishes, from tapas to main. Suggested', 1, '2021-08-07 07:00:25', '2021-08-07'),
(7, 30, 4, 3, 'We were surprised that this is the number one place in trip advisor, since it is very casual, maybe is good value for money, since the food is good but nothing really stands out. The ambiance is not great at all (decor, lights and noise level).
At first we got a sort of rude waiter, but we think it was just a busy moment because later he was only behind the bar. We had an awkward moment with the owner, we were asking for wine and he offered to try one, which we didn''t like, so he came with a full glass of another wine, and we were sort of forced to take it even if it was the same or at least very similar. After that the service was actually good.
Now the food, we had the roasted tomato, the squid pintxo and one with pulled meat. It was overall good but we felt the tomato was below par, and the others good but not great. So, after all, we don''t see really what''s the rage about this place.', 1, '2021-08-07 07:00:25', '2021-08-07'),
(8, 24, 6, 3, 'The coffee was quite good and served with a glass of water. The juice was fresh and nice as well, but the food was pretty awful.
I decided to have Eggs Benedict and the eggwhite was still clear, the taste of vinegar dominated everything. So I chose a piece of carrot cake as I used to believe you can never go wrong with that. Fail.
The icing was super sour due to the amount of limes in it and I decided to skip breakfast. Very disappointing, but I‘d go back for the coffee.', 1, '2021-08-07 07:00:25', '2021-08-07'),
(9, 21, 6, 5, 'It’s not a meal or even food, rather a series of experiences that are sometimes rather challenging.

Cutlery is not introduced onto the table until very late in the process, demanding some dexterity and finger licking throughout.

There was nothing here delicious, which is an odd thing to say about a two Michelin star restaurant, this was more about the experience of texture and process that was more important than the scrumptious delicious you might expect from a meal.

Our table of two foodies were not agreed on if the experience was one we would recount with affection or affliction, we both thought it would be memorable for maybe the wrong reasons.

Maybe, something to try if you wonder what food might taste like if you focus on process not flavours, but we both were thinking of the scrumptious bar food we had the night before over the meal we were having.', 1, '2021-08-09 23:16:01', '2021-08-09'),
(10, 23, 4, 4, 'Ordered eggs benedict. Tasted great. Also had the yogurt parfait, also a winner with some toast. Coffee a winner with a good selection to choose from. I was pleased with the overall experience and would d it all again.', 1, '2021-08-09 23:23:34', '2021-08-09'),
(11, 23, 7, 5, 'Exquisit courses with amazing wine pairing. Especially the pigeon we were served was a wonderful surprise.
It is a highlight of every vacation to San Sebastián and knowing that the food was created by one of the best female chefs in the world makes it even better!', 1, '2021-08-09 23:27:44', '2021-08-09'),
(12, 23, 3, 5, 'It''s a 3 star Michelin restaurant, so you expect amazing food. and yes you definitely get it.
What you do get in addition is the great atmosphere supported by the friendly staff which make sure that you are supported just as you need them to. I loved the fact that the restaurant did not feel too formal, and you could really enjoy (also felt free to sharing with others ordering different menus).
We sat down for 9PM dinner in July, and saw an amazing sun set. Basque tends to be cloudy and this day it was too, but we were lucky as there were a gap of clouds just above the horizon.', 1, '2021-08-09 23:29:00', '2021-08-09'),
(13, 23, 5, 5, 'If you are in the area of San Sebastian and like gastronomy, this restaurant is an absolute must. The food is exquisite, at the level of the best of the best 3 star restaurants. Moreover, the staff is extremely nice and very, very flexible regarding dietary requirements. They accepted to tailor the menu to specific needs in a very nice way. All dishes were absolutely incredible, beautiful, and new. The service was perfect, everyone being nice and helpful and making this experience absolutely incredible.', 1, '2021-08-09 23:31:17', '2021-08-09'),
(14, 23, 1, 3, 'Overpriced and overrated. Had a very expensive breakfast here and everything was only okay. Could easily get just as good elsewhere and for cheaper.', 1, '2021-08-09 23:32:18', '2021-08-09'),
(15, 23, 6, 5, 'Loved this coffee shop. The food and drinks were amazing. My husband I both had work to do, so we sat here for several hours. Great work environment, with such a beautiful view outside!', 1, '2021-08-10 00:58:41', '2021-08-09'),
(16, 32, 5, 5, 'Usually, we would try to find a stand-up bar for our coffee and croissant. But we happened upon this place across the river and weren''t disappointed. The cafe latte was delicious, the fresh-squeezed oj was sweet, the croissant was buttery and flaky, and there were plenty of tables to sit and enjoy our breakfast. Modern, but simple. We''d definitely recommend it.', 1, '2021-08-10 01:02:39', '2021-08-09'),
(17, 32, 7, 4, 'A good stop for the Aussies who are missing their full cafe breakfasts - as was evidenced by the clientele who were almost all Aussie on the morning we were there. A limited menu (but delicious) and great juice and coffee. Many comments have suggested the wait staff were either rude or unenthused.... for the most part I’d have to say that ours was a little of both, but would still come back for the food.', 1, '2021-08-10 01:06:17', '2021-08-09'),
(18, 32, 6, 5, 'Highly recommended place for breakfast. A must try the super juicy and the Avocado with egg toast. Very friendly staff but you usually queue to get seated but its worse the wait', 1, '2021-08-10 01:15:35', '2021-08-09'),
(19, 32, 4, 5, 'Very good coffee. Well know be about town and the region. Efficient and friendly service. Highly recommend. Old town coffee also good.', 1, '2021-08-10 01:19:09', '2021-08-09'),
(20, 26, 9, 4, 'Had a delicious avo toast breakfast here with an egg and great coffee. Well worth a stop, convenient location. The tomato toast had by my friend was one of the best we’ve tried anywhere', 1, '2021-08-10 01:21:42', '2021-08-09'),
(21, 32, 1, 5, 'Great breakfast, coffee is great, selection of sandwiches, eggs and yogurt is awesome! Nice place to eat, staff is so cool and they make sure you are having a good time', 1, '2021-08-10 12:43:01', '2021-08-10'),
(22, 32, 9, 5, 'Lovely vibes with great coffee and modern food. It’s a brunch place and it’s quite hipster so expect the prices to match.', 1, '2021-08-10 12:45:46', '2021-08-10'),
(23, 23, 11, 5, 'My wife who loves her coffee found this place, close to our pensione so off we went.
Flat white and a croissant with apricot jam and a fresh squeeze OJ for her and I tried the SD toast with shredded tomato, oil, herb and salt.
Topped off with a ginger and carrot juice.
What can I say...superb start to the day!!!
We will be back on our few remaining days.
Excellent staff n service. Well priced but the food....!!!!', 1, '2021-08-10 22:45:25', '2021-08-10'),
(24, 32, 13, 5, 'We had coffee here and it was fantastic. Very much like what we''d expect in metropolitan Melbourne, a coffee mecca.
We didn''t have food but the menu looked fantastic. We''ll be back to try it.
It''s not the cheapest place for coffee but you get what you pay for :)', 1, '2021-08-10 22:57:18', '2021-08-10'),
(25, 32, 12, 5, 'Recommended by our pension to come here for breakfast. We came early and were lucky enough to just squeeze into a corner table. Simple menu but the options were so fresh. The sous vide eggs are an absolute must as well as the fresh orange juice. They have a wonderful range of fresh cakes on display so we tried a slice of the carrot cake (generous huge portion!) for the road. Never tried anything so perfect and the frosting was salty and tangy and complemented the cake so well. Gets busy so try and come early.', 1, '2021-08-11 03:39:46', '2021-08-11'),
(26, 32, 11, 4, 'We''ve been here a few times since arriving in San Sebastian. It''s the best, consistent coffee we''ve found. I guess we fit the ''Melbourne coffee snob'' category, so locating good coffee is a must! Breakfast is tasty and their cheesecake.... Yum! Highly recommended.', 1, '2021-08-11 03:44:00', '2021-08-11'),
(27, 34, 13, 4, 'A welcome break from a downpour. Good coffee. Smashed avocado and sous vide egg. Egg a little underdone - I think poaching may have been better option, but otherwise great.', 1, '2021-08-11 03:45:52', '2021-08-11'),
(28, 34, 12, 4, 'Quite expensive for what you have, but it''s delicious and healthy! So you just have to seat, don''t think about money, and enjoy you breakfast and your coffee! Lovely staff! I recommend, then for the next time, I''ll go again!', 1, '2021-08-11 03:50:58', '2021-08-11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `hash`, `role`, `is_active`) VALUES
(21, 'admin', 'admin', 'admin', '$2a$10$PEq.FfwgHYM7BOY15Vzh..ljpz3ipRoItFV9NfZ9Ahh3LRlCCvpsG', 'admin', 1),
(23, 'Jason', 'Watmore', 'Jason', '$2a$10$CKQDmFoNh6UyKM8w72bV3.EXgVw1.7MEIzeATuPCNF87fJDleB.VS', 'user', 1),
(24, 'Adam', 'Small', 'Adam', '$2a$10$PEq.FfwgHYM7BOY15Vzh..ljpz3ipRoItFV9NfZ9Ahh3LRlCCvpsG', 'user', 1),
(26, 'Greg', 'White', 'Greg', '$2a$10$PEq.FfwgHYM7BOY15Vzh..ljpz3ipRoItFV9NfZ9Ahh3LRlCCvpsG', 'user', 1),
(30, 'Joanne', 'Reynolds', 'Joanne', '$2a$10$jxJIHD2j9k9crMt4DUWS5O.G/4ag6KElYpeinTaC3ykZlXs60Iv8a', 'user', 1),
(31, 'Ricky', 'Smith', 'Ricky', '$2a$10$HyrBga2GruJF7A4.Yak2keij7Xj9TutwwhJ7PAc9WEtFN7MuPQgz6', 'owner', 1),
(32, 'Anne', 'Mert', 'Anne', '$2a$10$XIxc5t/Zh2EoUIXVIJaRP.ieIJJEOSy2TtPWekvcvBr7Iq.eHx626', 'user', 1),
(33, 'John', 'Trent', 'John', '$2a$10$o/oHY5rxCTxyNGnBJ5ikDuA3GKMC.MVpZ3d9FIOkmRFhvgfknsIlC', 'owner', 1),
(34, 'Fionne', 'Merivale', 'Fionne', '$2a$10$pJF3Z9gtfmuRyRdJE/U/f.VEnCNOWEtr2SCk5EdEc.L/jvkkkjtri', 'user', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reply`
--
ALTER TABLE `reply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reply`
--
ALTER TABLE `reply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
