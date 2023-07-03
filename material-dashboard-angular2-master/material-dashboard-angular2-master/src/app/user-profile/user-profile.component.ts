import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  softDeleteUser(id: string) {
    this.userService.softDeleteUserById(id).subscribe(user => {
      // Update the user list after soft-deleting the user
      const index = this.users.findIndex(u => u.Id === user.Id);
      this.users.splice(index, 1);

      // Refresh the page after deleting the user
    });
  }
  
  

}
