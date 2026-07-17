package model

import (
	"time"

	"gorm.io/gorm"
)

type Testimonial struct {
	ID          uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	OwnerName   string         `gorm:"type:varchar(255)" json:"owner_name"`
	GymName     string         `gorm:"type:varchar(255)" json:"gym_name"`
	Content     string         `gorm:"type:text" json:"content"`
	AvatarURL   string         `gorm:"type:varchar(512)" json:"avatar_url"`
	Rating      int            `gorm:"type:smallint" json:"rating"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (t *Testimonial) TableName() string { return "testimonials" }
