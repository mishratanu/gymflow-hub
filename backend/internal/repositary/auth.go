package repositary

import (
	"errors"
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
	"time"

	"gorm.io/gorm"
)

// CreateUser inserts a new user row.
func CreateUser(user *model.User) error {
	return db.DB.Create(user).Error
}

// FindUserByEmail returns the user with the given email, or gorm.ErrRecordNotFound.
func FindUserByEmail(email string) (*model.User, error) {
	var user model.User
	err := db.DB.Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, gorm.ErrRecordNotFound
	}
	return &user, err
}

// FindUserByID returns the user with the given primary key.
func FindUserByID(id uint) (*model.User, error) {
	var user model.User
	err := db.DB.First(&user, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, gorm.ErrRecordNotFound
	}
	return &user, err
}

// SetPasswordResetToken stores a hashed reset token and expiry on the user record.
func SetPasswordResetToken(userID uint, token string, expiry time.Time) error {
	return db.DB.Model(&model.User{}).Where("id = ?", userID).Updates(map[string]interface{}{
		"reset_token":        token,
		"reset_token_expiry": expiry,
	}).Error
}

// FindUserByResetToken looks up a user by their password reset token.
func FindUserByResetToken(token string) (*model.User, error) {
	var user model.User
	err := db.DB.Where("reset_token = ?", token).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, gorm.ErrRecordNotFound
	}
	return &user, err
}

// UpdatePasswordAndClearToken sets a new password hash and clears the reset token.
func UpdatePasswordAndClearToken(userID uint, passwordHash string) error {
	return db.DB.Model(&model.User{}).Where("id = ?", userID).Updates(map[string]interface{}{
		"password_hash":      passwordHash,
		"reset_token":        "",
		"reset_token_expiry": nil,
	}).Error
}

// UpdateLastLogin records the last login timestamp.
func UpdateLastLogin(userID uint) error {
	now := time.Now()
	return db.DB.Model(&model.User{}).Where("id = ?", userID).Update("last_login_at", now).Error
}
