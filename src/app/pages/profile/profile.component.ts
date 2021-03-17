import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public imageToUpload: File;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.initProfileForm();
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    this.userService.updateUserProfile(this.profileForm.value).subscribe(resp => {
      const {name, email} = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;
    });
  }

  selectedImg(file: File) {
    this.imageToUpload = file;
  }

  uploadImage() {
    this.fileUploadService.uploadPhoto(this.imageToUpload, 'users', this.user.id).then(
      img => this.user.img = img
    );
  }
}
