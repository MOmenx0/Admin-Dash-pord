import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  public searchQuery: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredUsers = this.users.filter((user: User) => {
      const fullName = `${user. FirstName} ${user.LastName}`.toLowerCase();
      return fullName.startsWith(this.searchQuery.toLowerCase());
      console.log(this.filteredUsers);
    });
  }
}