import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { type } from 'src/app/shared/model/Type';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  constructor(private userService:UserService ,private loader :LoadingService , private title :Title) {
    this.title.setTitle('Add User')
   }
groups:type[]=[];
  ngOnInit(): void {
    this.loader.busy();
    this.userService.getUsersGroups().subscribe((res) => {
      console.log(res,"result")
      if (res.status == true) {
        this.groups=res.usersGroupList;
        this.loader.idle()
      }
    }); //end of subscribe
  }

}
