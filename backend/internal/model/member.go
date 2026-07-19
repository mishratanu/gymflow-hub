package model

import (
	"time"

	"gorm.io/gorm"
)

type Member struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Name      string         `gorm:"type:varchar(255)" json:"name"`
	Email     string         `gorm:"type:varchar(255);index" json:"email"`
	Phone     string         `gorm:"type:varchar(50)" json:"phone"`
	Plan      string         `gorm:"type:varchar(50);default:'Basic'" json:"plan"`
	JoinDate  time.Time      `json:"join_date"`
	Status    string         `gorm:"type:varchar(50);default:'Active'" json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (m *Member) TableName() string { return "members" }
