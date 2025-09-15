import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService, CreateUserRequest, UpdateUserRequest, User } from '../user-management.service';

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss']
})
export class UserFormModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() user: User | null = null;
  @Input() isEdit = false;
  @Output() close = new EventEmitter<void>();
  @Output() userSaved = new EventEmitter<User>();

  userForm: FormGroup;
  loading = false;
  error: string | null = null;

  availableRoles: string[] = [];
  availableStatuses: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      status: ['Active', Validators.required],
      profilePicture: ['']
    });
  }

  ngOnInit() {
    // Initialize available options
    this.availableRoles = this.userService.getAvailableRoles();
    this.availableStatuses = this.userService.getAvailableStatuses();
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Handle changes to user data or edit mode
    if (changes['user'] || changes['isEdit']) {
      this.initializeForm();
    }
  }

  private initializeForm() {
    if (this.isEdit && this.user) {
      // Populate form with user data
      this.userForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        role: this.user.role,
        status: this.user.status,
        profilePicture: this.user.profilePicture || ''
      });
      
      // Disable username and email fields in edit mode
      this.userForm.get('username')?.disable();
      this.userForm.get('email')?.disable();
      
      // Remove password requirement for edit mode
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      // Reset form for create mode
      this.userForm.reset({
        role: 'Employee',
        status: 'Active',
        profilePicture: ''
      });
      
      // Enable username and email fields for create mode
      this.userForm.get('username')?.enable();
      this.userForm.get('email')?.enable();
      
      // Add password requirement for create mode
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  onClose() {
    this.userForm.reset();
    this.error = null;
    this.close.emit();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      this.error = null;

      const formData = this.userForm.value;

      if (this.isEdit && this.user) {
        // Update user - get disabled field values from raw form value
        const updateData: UpdateUserRequest = {
          username: this.userForm.getRawValue().username,
          email: this.userForm.getRawValue().email,
          role: formData.role,
          status: formData.status,
          profilePicture: formData.profilePicture || undefined
        };

        this.userService.updateUser(this.user.id, updateData).subscribe({
          next: (response) => {
            if (response.success && response.data) {
              this.userSaved.emit(response.data);
              this.onClose();
            } else {
              this.error = response.error?.message || 'Failed to update user';
            }
            this.loading = false;
          },
          error: (error) => {
            console.error('Error updating user:', error);
            this.error = 'Failed to update user. Please try again.';
            this.loading = false;
          }
        });
      } else {
        // Create user
        const createData: CreateUserRequest = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          profilePicture: formData.profilePicture || undefined
        };

        this.userService.createUser(createData).subscribe({
          next: (response) => {
            if (response.success && response.data) {
              this.userSaved.emit(response.data);
              this.onClose();
            } else {
              this.error = response.error?.message || 'Failed to create user';
            }
            this.loading = false;
          },
          error: (error) => {
            console.error('Error creating user:', error);
            this.error = 'Failed to create user. Please try again.';
            this.loading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      username: 'Username',
      email: 'Email',
      password: 'Password',
      role: 'Role',
      status: 'Status',
      profilePicture: 'Profile Picture'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}
