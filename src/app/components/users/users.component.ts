import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnixBackService } from 'app/services/onix-back.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listuser:any={};
  addUser:any=[];
  hidenTable:boolean= true;
  hidenForm:boolean= false;
  username:string ="";
  password:string="";
  name:string="";
  mail:string="";
  usuario: any = {};
  constructor(private userService:OnixBackService) { }

  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(){
    const idUser = this.addUser.id;
    if(idUser == undefined ){
      this.addUserDb(this.addUser); 
    }else{
      this.updateUserDb(idUser,this.addUser);
      console.log(this.addUser.id);      
    }
  }

  clearItem(){
    this.username ="";
    this.password="";
    this.name="";
    this.mail="";
    this.addUser={};
  }

  async addUserDb(addUser){
    await this.userService.addUser(addUser).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa')
        this.clearItem();
        this.getUser();
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  }

  async updateUserDb(addUser,listUser){
    await this.userService.updateUser(addUser, listUser).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa')
        this.clearItem();
        this.getUser();
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  }


  async deleteUserDb(idUser){
    await this.userService.deleteUser(idUser).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa');
        this.getUser();
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  }

  async getUser(){
    await this.userService.getUser().subscribe
      (
        (res) => {
          this.listuser = res;
        }
        ,
      (error) => {
        console.error(error);
      });
  }

  async updateUserById(idUser){
    await this.userService.getUserById(idUser).subscribe
      (
        (res) => {
          this.addUser = res;
          console.log(this.addUser)
        },
      (error) => {
        console.error(error);
      });
  }

  ocultarItem(value:number,idUser){

    switch (value) {
      case 0:
        this.clearItem();
        this.hidenTable = false;
        this.hidenForm = true;
        break;      
      case 1:
        this.clearItem();
        this.hidenTable = true;
        this.hidenForm = false;
        this.getUser();
        break;
      case 2:
        this.clearItem();
        this.hidenTable = false;
        this.hidenForm = true;
        this.updateUserById(idUser);
        break;
      default:
        this.hidenTable= true;
        break;
    }  
  }

}
