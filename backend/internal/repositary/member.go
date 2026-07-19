package repositary

import (
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

// ListMembers returns all non-deleted members ordered by name.
func ListMembers() ([]model.Member, error) {
	var members []model.Member
	err := db.DB.Order("name asc").Find(&members).Error
	return members, err
}

// GetMemberByID returns a single member by primary key.
func GetMemberByID(id uint) (*model.Member, error) {
	var m model.Member
	err := db.DB.First(&m, id).Error
	return &m, err
}

// CreateMember inserts a new member row.
func CreateMember(m *model.Member) error {
	return db.DB.Create(m).Error
}

// UpdateMember saves all changed fields on an existing member.
func UpdateMember(m *model.Member) error {
	return db.DB.Save(m).Error
}

// DeleteMember soft-deletes the member with the given ID.
func DeleteMember(id uint) error {
	return db.DB.Delete(&model.Member{}, id).Error
}
