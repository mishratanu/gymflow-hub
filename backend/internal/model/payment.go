package model

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	MemberID  uint           `gorm:"index" json:"member_id"`
	Member    Member         `gorm:"foreignKey:MemberID" json:"member,omitempty"`
	Amount    float64        `gorm:"type:numeric(10,2)" json:"amount"`
	Date      time.Time      `gorm:"index" json:"date"`
	Method    string         `gorm:"type:varchar(100)" json:"method"`
	Status    string         `gorm:"type:varchar(50)" json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (p *Payment) TableName() string { return "payments" }
