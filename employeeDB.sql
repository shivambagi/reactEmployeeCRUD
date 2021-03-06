USE [master]
GO

/****** Object:  Database [ProjectEmployee]    Script Date: 29/10/2021 3:33:57 PM ******/
CREATE DATABASE [ProjectEmployee]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProjectEmployee', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ProjectEmployee.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProjectEmployee_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ProjectEmployee_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProjectEmployee].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [ProjectEmployee] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [ProjectEmployee] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [ProjectEmployee] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [ProjectEmployee] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [ProjectEmployee] SET ARITHABORT OFF 
GO

ALTER DATABASE [ProjectEmployee] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [ProjectEmployee] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [ProjectEmployee] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [ProjectEmployee] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [ProjectEmployee] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [ProjectEmployee] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [ProjectEmployee] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [ProjectEmployee] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [ProjectEmployee] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [ProjectEmployee] SET  DISABLE_BROKER 
GO

ALTER DATABASE [ProjectEmployee] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [ProjectEmployee] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [ProjectEmployee] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [ProjectEmployee] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [ProjectEmployee] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [ProjectEmployee] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [ProjectEmployee] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [ProjectEmployee] SET RECOVERY FULL 
GO

ALTER DATABASE [ProjectEmployee] SET  MULTI_USER 
GO

ALTER DATABASE [ProjectEmployee] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [ProjectEmployee] SET DB_CHAINING OFF 
GO

ALTER DATABASE [ProjectEmployee] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [ProjectEmployee] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [ProjectEmployee] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [ProjectEmployee] SET QUERY_STORE = OFF
GO

ALTER DATABASE [ProjectEmployee] SET  READ_WRITE 
GO

