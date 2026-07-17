package db

import (
	"fmt"
	"imagine_backend/config"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s search_path=%s sslmode=disable TimeZone=Asia/Kolkata",
		config.AppConfig.DBHost, config.AppConfig.DBUser, config.AppConfig.DBPassword, config.AppConfig.DBName, config.AppConfig.DBPort, config.AppConfig.DBSchema,
	)
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Release idle DB connections quickly so the service stops emitting outbound
	// traffic when idle. Railway's Serverless (scale-to-zero) only sleeps a
	// service after ~10 min with no outbound packets, and a long-lived pool would
	// otherwise keep it awake forever.
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Failed to get underlying sql.DB: %v", err)
	}
	sqlDB.SetMaxIdleConns(0)
	sqlDB.SetConnMaxIdleTime(30 * time.Second)
	sqlDB.SetConnMaxLifetime(5 * time.Minute)
	sqlDB.SetMaxOpenConns(10)
}
