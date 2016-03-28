-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 03 月 28 日 16:12
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `warehouse`
--
CREATE DATABASE IF NOT EXISTS `warehouse` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `warehouse`;

-- --------------------------------------------------------

--
-- 表的结构 `codes`
--

CREATE TABLE IF NOT EXISTS `codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code_number` varchar(12) NOT NULL COMMENT '二维码',
  `p_code` int(11) DEFAULT NULL COMMENT '上级编码',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='二维码表' AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `codes`
--

INSERT INTO `codes` (`id`, `code_number`, `p_code`, `status`) VALUES
(3, '5000000001', NULL, 1),
(4, '5000000002', NULL, 1),
(5, '5000000003', NULL, 1),
(6, '100000000001', 3, 1),
(7, '100000000002', 3, 1),
(8, '100000000003', 3, 1),
(9, '100000000004', 3, 1),
(10, '100000000005', 3, 1),
(11, '100000000006', 4, 1),
(12, '100000000007', 4, 1),
(13, '100000000008', 4, 1);

-- --------------------------------------------------------

--
-- 表的结构 `positions`
--

CREATE TABLE IF NOT EXISTS `positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `position_number` text NOT NULL COMMENT '仓位',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='仓位表' AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `positions`
--

INSERT INTO `positions` (`id`, `position_number`, `status`) VALUES
(1, '3A01', 1),
(2, '3A02', 1),
(3, '3A03', 1),
(4, '3A04', 1),
(5, '3B01', 1),
(6, '3B02', 1),
(7, '3B03', 0),
(8, '3B03', 1);

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_number` varchar(20) NOT NULL COMMENT '产品编号',
  `product_name` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '产品名称',
  `product_size` varchar(11) DEFAULT NULL COMMENT '产品规格',
  `capacity` int(11) NOT NULL COMMENT '最大容量',
  `picture` text COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='产品表' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`id`, `product_number`, `product_name`, `product_size`, `capacity`, `picture`) VALUES
(1, '731631811', 'TS-668', '668', 100, '731631811.jpg'),
(2, '7111474217', 'TS-629', '629', 100, '7111474217.jpg'),
(3, '8121542516', 'TS-600', '600', 100, '8121542516.jpg'),
(4, '721025318', 'TS656', '656', 75, '721025318.jpg'),
(5, '81215442511', 'TS622', '622', 75, '81215442511.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `receipts`
--

CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `receipt_number` int(11) NOT NULL COMMENT '入库单号',
  `receipt_date` date NOT NULL COMMENT '入库日期',
  `maker` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '制单人',
  `team` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '班组',
  `product_date` date NOT NULL COMMENT '生产日期',
  `product_number` varchar(11) NOT NULL COMMENT '产品编号',
  `shelf_number` varchar(11) NOT NULL COMMENT '货架编号',
  `counts` int(11) NOT NULL COMMENT '产品数量',
  `position_number` varchar(11) NOT NULL COMMENT '仓位编号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='入库单' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `shelfs`
--

CREATE TABLE IF NOT EXISTS `shelfs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `shelf_number` text NOT NULL COMMENT '货架编号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='货架' AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `shelfs`
--

INSERT INTO `shelfs` (`id`, `shelf_number`, `status`) VALUES
(1, '0001', 1),
(2, '0002', 1),
(3, '0003', 1),
(4, '0004', 1),
(5, '0005', 1),
(6, '0006', 1),
(7, '0007', 1),
(8, '0008', 1);

-- --------------------------------------------------------

--
-- 表的结构 `shelf_porduct`
--

CREATE TABLE IF NOT EXISTS `shelf_porduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `shelf_id` int(11) NOT NULL COMMENT '货架编号',
  `product_id` int(11) NOT NULL COMMENT '产品编号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='货架产品关联表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` text NOT NULL COMMENT '用户名',
  `password` text NOT NULL COMMENT '密码',
  `realname` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '真实姓名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='用户表' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `realname`) VALUES
(1, 'zhangsan', '123456', '张三'),
(2, 'lisi', '123', '李四'),
(3, 'wangwu', '123', '王五');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
