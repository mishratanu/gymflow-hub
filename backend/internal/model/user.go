package model

import (
	"time"

	"gorm.io/gorm"
)

// Role constants for role-based access control
const (
	RoleSuperAdmin  = "super_admin"
	RoleGymOwner    = "gym_owner"
	RoleTrainer     = "trainer"
	RoleReceptionist = "receptionist"
	RoleMember      = "member"
)

type User struct {
	ID               uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Email            string         `gorm:"type:varchar(255);uniqueIndex" json:"email"`
	PasswordHash     string         `gorm:"type:varchar(255)" json:"-"`
	FullName         string         `gorm:"type:varchar(255)" json:"full_name"`
	Role             string         `gorm:"type:varchar(50);default:'gym_owner'" json:"role"`
	GymName          string         `gorm:"type:varchar(255)" json:"gym_name"`
	Plan             string         `gorm:"type:varchar(50);default:'Pro'" json:"plan"`
	IsActive         bool           `gorm:"default:true" json:"is_active"`
	AvatarURL        string         `gorm:"type:varchar(500)" json:"avatar_url"`
	ResetToken       string         `gorm:"type:varchar(128);index" json:"-"`
	ResetTokenExpiry *time.Time     `json:"-"`
	LastLoginAt      *time.Time     `json:"last_login_at"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

func (u *User) TableName() string { return "users" }
