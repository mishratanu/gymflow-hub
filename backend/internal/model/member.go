package model

import (
	"time"

	"gorm.io/gorm"
)

type Member struct {
	ID               uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Name             string         `gorm:"type:varchar(255)" json:"name"`
	Email            string         `gorm:"type:varchar(255);index" json:"email"`
	Phone            string         `gorm:"type:varchar(50)" json:"phone"`
	MembershipPlanID uint           `gorm:"index" json:"membership_plan_id"`
	MembershipPlan   MembershipPlan `gorm:"foreignKey:MembershipPlanID" json:"membership_plan,omitempty"`
	JoinDate         time.Time      `json:"join_date"`
	Status           string         `gorm:"type:varchar(50)" json:"status"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

func (m *Member) TableName() string { return "members" }
