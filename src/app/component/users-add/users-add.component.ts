import { Component, OnInit } from '@angular/core';
import { type } from 'src/app/shared/model/Type';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  constructor(private userService:UserService) { }
groups:type[]=[];
  ngOnInit(): void {
    this.userService.getUsersGroups().subscribe((res) => {
      console.log(res,"result")
      if (res.status == true) {
        this.groups=res.usersGroupList;
      } 
    }); //end of subscribe
  }

}
