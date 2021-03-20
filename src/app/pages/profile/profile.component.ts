import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  public imgTemp: any;

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

      Swal.fire('Fine!', 'Changes uploaded correctly!', 'success');
    }, (err) => {
      Swal.fire('Ups!', err.error.msg, 'error');
    });
  }

  selectedImg(file: File) {
    this.imageToUpload = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage() {
    this.fileUploadService.uploadPhoto(this.imageToUpload, 'users', this.user.id).then(
      img => {
        this.user.img = img;
        Swal.fire('Fine!', 'Image changed correctly!', 'success');
      }).catch(err => {
        Swal.fire('Ups!', 'Image could not be changed', 'error');
      });
  }
}
