package model

import (
	"time"

	"gorm.io/gorm"
)

type Notification struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID    uint           `gorm:"index" json:"user_id"`
	User      User           `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Type      string         `gorm:"type:varchar(100)" json:"type"`
	Message   string         `gorm:"type:text" json:"message"`
	IsRead    bool           `gorm:"index;default:false" json:"is_read"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (n *Notification) TableName() string { return "notifications" }
