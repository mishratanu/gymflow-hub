package model

import (
	"time"

	"gorm.io/gorm"
)

type Pricing struct {
	ID           uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	TierName     string         `gorm:"type:varchar(100)" json:"tier_name"`
	Description  string         `gorm:"type:text" json:"description"`
	MonthlyPrice float64        `gorm:"type:numeric(10,2)" json:"monthly_price"`
	Features     string         `gorm:"type:text" json:"features"`
	IsPopular    bool           `gorm:"default:false" json:"is_popular"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

func (p *Pricing) TableName() string { return "pricings" }
