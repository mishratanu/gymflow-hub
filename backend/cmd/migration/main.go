package main

import (
	"fmt"
	"log"

	"imagine_backend/config"
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func main() {
	config.LoadConfig()
	db.ConnectToDB()

	schema := config.AppConfig.DBSchema
	if schema == "" {
		log.Fatalf("DB_SCHEMA environment variable is required but empty — cannot run migration without a target schema")
	}
	if err := db.DB.Exec(fmt.Sprintf(`CREATE SCHEMA IF NOT EXISTS "%s"`, schema)).Error; err != nil {
		log.Fatalf("failed to create schema %q: %v", schema, err)
	}
	if err := db.DB.Exec(fmt.Sprintf(`SET search_path TO "%s"`, schema)).Error; err != nil {
		log.Fatalf("failed to set search_path to %q: %v", schema, err)
	}

	log.Printf("Running migrations in schema %q...", schema)
	if err := db.DB.AutoMigrate(
		&model.User{},
		&model.Member{},
		&model.Trainer{},
		&model.MembershipPlan{},
		&model.Attendance{},
		&model.Payment{},
		&model.Notification{},
		&model.Testimonial{},
		&model.Pricing{},
		&model.Feature{},
		&model.FAQ{},
	); err != nil {
		log.Fatalf("migration failed: %v", err)
	}
	log.Println("Migrations completed successfully.")
}
