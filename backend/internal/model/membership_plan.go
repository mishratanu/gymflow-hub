package model

import (
	"time"

	"gorm.io/gorm"
)

type MembershipPlan struct {
	ID           uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string         `gorm:"type:varchar(255);index" json:"name"`
	Description  string         `gorm:"type:text" json:"description"`
	MonthlyPrice float64        `gorm:"type:numeric(10,2)" json:"monthly_price"`
	Benefits     string         `gorm:"type:text" json:"benefits"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

func (m *MembershipPlan) TableName() string { return "membership_plans" }
