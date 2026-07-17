package model

import (
	"time"

	"gorm.io/gorm"
)

type Feature struct {
	ID          uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Title       string         `gorm:"type:varchar(255)" json:"title"`
	Description string         `gorm:"type:text" json:"description"`
	IconURL     string         `gorm:"type:varchar(512)" json:"icon_url"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (f *Feature) TableName() string { return "features" }
