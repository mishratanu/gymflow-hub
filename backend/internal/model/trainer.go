package model

import (
	"time"

	"gorm.io/gorm"
)

type Trainer struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	FullName  string         `gorm:"type:varchar(255);index" json:"full_name"`
	Email     string         `gorm:"type:varchar(255)" json:"email"`
	Specialty string         `gorm:"type:varchar(255)" json:"specialty"`
	Phone     string         `gorm:"type:varchar(50)" json:"phone"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (t *Trainer) TableName() string { return "trainers" }
