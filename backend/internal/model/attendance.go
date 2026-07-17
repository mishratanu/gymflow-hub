package model

import (
	"time"

	"gorm.io/gorm"
)

type Attendance struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Date      time.Time      `gorm:"type:date;index" json:"date"`
	MemberID  uint           `gorm:"index" json:"member_id"`
	Member    Member         `gorm:"foreignKey:MemberID" json:"member,omitempty"`
	Status    string         `gorm:"type:varchar(50)" json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (a *Attendance) TableName() string { return "attendances" }
