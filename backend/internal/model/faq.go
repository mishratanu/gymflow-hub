package model

import (
	"time"

	"gorm.io/gorm"
)

type FAQ struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Question  string         `gorm:"type:text" json:"question"`
	Answer    string         `gorm:"type:text" json:"answer"`
	SortOrder int            `gorm:"default:0" json:"sort_order"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (f *FAQ) TableName() string { return "faqs" }
